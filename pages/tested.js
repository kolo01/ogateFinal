import Message from "@/components/Messages";
import { app, requestForToken } from "@/utils/firebase";
import { Text } from "@chakra-ui/react";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";



export default function Tested(){
const [token,setToken]= useState("")
const [notification, setNotification] = useState({title: '', body: ''});
  const notify = () =>  toast(<ToastDisplay/>);


  const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(getMessaging(app), (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });


  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };


  const requestForToken = () => {
    const permission = Notification.requestPermission();
    if (permission== "granted") {
      return getToken(getMessaging(app), { vapidKey: "BFRmFZ3CsyZ2EF8rO78MDYieqCookk1exTmOL3u4OuvQyYhamK30HN9VqwTO3DN6q01l20Koxh49F5-YCi1PoTE" })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
          setToken(currentToken)
          localStorage.setItem("item",currentToken)
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          setToken("Okay")
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    }else{
      // alert("SVP merci de bien vouloir activer les notifications");
      const permission = Notification.requestPermission();
      return getToken(getMessaging(app), { vapidKey: "BFRmFZ3CsyZ2EF8rO78MDYieqCookk1exTmOL3u4OuvQyYhamK30HN9VqwTO3DN6q01l20Koxh49F5-YCi1PoTE" })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
          setToken(currentToken)
          localStorage.setItem("item",currentToken)
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          setToken("Okay")
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });



    }
   
  };

  onMessageListener()
  .then((payload) => {
    setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
  })
  .catch((err) => console.log('failed: ', err));



  useEffect(()=>{
    requestForToken()
    if (notification?.title ){
      notify()
     }
  })

  return (
    <>
    <Text>{token}</Text>
      <Toaster/>
      
    </>
  );
}

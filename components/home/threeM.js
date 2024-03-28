import { Avatar, Box, Button, Center, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { MdHome } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io"; 
import { MdMessage } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { useRouter } from "next/router";
export default function ThreeSecM(){
    const [nom,setNom] = useState("")
    const router = useRouter()
    const all=[
        {
        image:"./all/Home.png",
        text:"Accueil", l:2},
       
        {
            image:"./all/partenaire.png",
            text:"Mes relations", l:5},
            {
                image:"./all/notifications.png",
                text:"Notifications", l:10},,
                {
                    image:"./all/mesasge.png",
                    text:"Messagerie", l:10},
    ]

        const Logout= ()=>{
            localStorage.removeItem("local")
            router.push("/")
        }

    
    useEffect(()=>{
        try{
            if(JSON.parse(localStorage.getItem("local")).data.nom == "NON DEFINI"){
                setNom("NON DEFINI")
               }else{
                setNom(JSON.parse(localStorage.getItem("local")).data.nom)
               }
        }catch (error){
            
            router.push("/")
        }
      
    },[nom,router])


    return(
        <Flex display={"grid"}   fontSize={'16px'} fontFamily={"-apple-system"} >
            <Box _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }}  display={"flex"} mt={2} onClick={()=>router.push("/")} cursor={"pointer"}>
                   <Box>
                    <MdHome width={"30px"}  height={"30px"} fontSize={"30px"}/>
                   </Box>
               
                <Text fontSize={"16px"} lineHeight={"16px"} mt={2} ml={2}>{"Accueil"}</Text>
                </Box>
                <Box _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }} display={"flex"} py={2}    onClick={()=>router.push("/relation")} cursor={"pointer"}>
                  <Center mb={-1}>
                   <Box width={"30px"} height={"30px"} borderRadius={"50%"}>
                    <PiUsers   fontSize={"30px"}/>
                   </Box>
                   </Center>
                <Text fontSize={"16px"} mt={2} ml={2} lineHeight={"16px"} >{"Mes relations"}</Text>
                </Box>
                <Box  _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }} display={"flex"}  onClick={()=>router.push("/notifications")} cursor={"pointer"}>
                   <Box >
                    <IoIosNotifications  width={"30px"}  height={"30px"} fontSize={"30px"}/>
                   </Box>
               
                <Text fontSize={"16px"}  mt={2} ml={2} lineHeight={"16px"} >{"Notifications"}</Text>
                </Box>
                <Box  _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }} display={"flex"} mt={2} mr={5} maxW={"107px"} maxH={"56px"} textAlign={"center"}  onClick={()=>router.push("/Posts")} cursor={"pointer"}>
                   <Box >
                    <Image src={"./all/Sell.png"} alt="" width={"30px"}  height={"30px"} fontSize={"30px"}/>
                   </Box>
               
                <Text fontSize={"16px"}  mt={2} ml={2} lineHeight={"16px"} >{"Postes"}</Text>
                </Box>
                <Box _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }} display={"flex"}  mt={2} mr={5}  onClick={()=>router.push("/messages")} cursor={"pointer"}>
                   <Box >
                    <MdMessage  width={"30px"}  height={"30px"} fontSize={"30px"}/>
                   </Box>
               
                <Text fontSize={"16px"}  mt={1} ml={2} lineHeight={"16px"} >{"Message"}</Text>
                </Box>
                <Box>
                    <Button bgColor={"transparent"} _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }}>Mon Profils</Button>
                    <Button bgColor={"transparent"}  _hover={{
                        bgColor:"transparent",
                        textAlign:"center",
                        fontWeight:700,
                        fontSize:"20px"

                    }} color={"red"} onClick={()=>{Logout()}}>Deconnexion de {nom=="NON DEFINI"? "New user" : nom}</Button>
                </Box>
                  

            
        </Flex>
    )
}
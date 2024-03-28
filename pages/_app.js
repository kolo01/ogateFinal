import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from '@chakra-ui/react'
import { getToken } from '@firebase/messaging';
import { messaging } from '@/utils/firebase';


export default function App({ Component, pageProps }) {



  return (<ChakraProvider><Component {...pageProps} /></ChakraProvider>)
}

import Navbar from "@/components/home/Navbar";
import { Box, Button, Center, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { useState } from "react";
import {FcGoogle} from "react-icons/fc"
import secureLocalStorage from "react-secure-storage";
export default function Box2(){
    const av = " l'aventure"
    const insc = " S'incrivant"
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [clicked,setClicked] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const handleConnect = async () =>{
        setClicked(true)
        // toast({
        //     status:"success",duration: 9000,description:"Merci pour votre confiance",title:"Connexion Approuvé!"
        // })
        // router.push("/home")
        await axios.post("http://185.98.139.246:9090/ogatemanagement-api/signin",{
            username : email,
            password : password
        }).then( (response)=>{
            console.log(JSON.stringify(response))
            localStorage.setItem("local",JSON.stringify(response))
            toast({
                status:"success",duration: 3000,description:"Merci pour votre confiance",title:"Connexion Approuvé!"
            })
            router.push("/home")

        }).catch((error)=>{
            // console.log(error.response)
            setClicked(false)
            toast({  
                status:"error",duration: 9000,description:"Merci de bien vouloir reesayer",title:"Mot de passe/Numéro incorrect"
            })
        })
    }


    return(
        <>
        <Navbar/>
        <Center  display={{base:"none",lg:"block"}} fontFamily={"-apple-system"} >
        <Box  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} p={5} borderRadius={"25px"} my={10}>
        <Text color={" #7a1317"} fontWeight={700} fontSize={"48px"}>
            Connexion
        </Text>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} fontFamily={"-apple-system"} lineHeight={"19.5px"}> 
           Téléphone
        </Text>
        <Input borderRadius={"16px"} onChange={(e)=>{setEmail(e.target.value)}} width={"408px"} height={"55px"}  border={"1px solid black"}/>
        </Box>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
            Mot de passe
        </Text>
        <Input borderRadius={"16px"} onChange={(e)=>{setPassword(e.target.value)}} width={"408px"}  type={"password"}height={"55px"} border={"1px solid black"}/>
        </Box>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} mt={5}> Mot de passe oublié ?</Text>
        <Box display={"grid"}>
        <Button mt={5}fontWeight={700} onClick={()=>handleConnect()}isDisabled={email.length<7 || password.length<3} fontSize={"16px"} lineHeight={"19.5px"} borderRadius={"16px"} width={"408px"} height={"55px"} bgColor={"#7a1317"} color={"white"} _hover={{
            bgColor:"#7a1317"
        }} isLoading={clicked}> Se connecter</Button>
        <Button mt={5}  bgColor="transparent" border="1px solid black"fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}borderRadius={"16px"} width={"408px"} height={"55px"} leftIcon={<FcGoogle/>} _hover={{
            bgColor:"transparent"
        }}> Continuer avec Google</Button>
        </Box>
        <Center>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} mt={5}>Ou</Text>
        </Center>
        <Button mt={5} bgColor="transparent" border="1px solid black" fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}borderRadius={"16px"} width={"408px"} height={"55px"} _hover={{
            bgColor:"transparent"
        }}> Démarrer{av} en <Text ml={2} color="#7a1317" as={Link} href={"/Inscription"} _hover={{textDecoration:"none",color:"#7a1317"}}>{insc}</Text> </Button>
        </Box>
        </Center>



        <Box   display={{base:"block",lg:"none"}} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} fontFamily={"-apple-system"} p={5} borderRadius={"25px"} my={10}>
        <Text color={" #7a1317"} fontWeight={700} fontSize={"48px"}>
            Connexion
        </Text>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} fontFamily={"-apple-system"} lineHeight={"19.5px"}> 
           Téléphone
        </Text>
        <Input borderRadius={"16px"} onChange={(e)=>{setEmail(e.target.value)}} width={"full"} height={"55px"}  border={"1px solid black"}/>
        </Box>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
            Mot de passe
        </Text>
        <Input borderRadius={"16px"} onChange={(e)=>{setPassword(e.target.value)}} width={"full"}  type={"password"}height={"55px"} border={"1px solid black"}/>
        </Box>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} mt={5}> Mot de passe oublié ?</Text>
        <Box display={"grid"}>
        <Button mt={5}fontWeight={700} onClick={()=>handleConnect()}isDisabled={email.length<7 || password.length<3} fontSize={"16px"} lineHeight={"19.5px"} borderRadius={"16px"} width={"full"} height={"55px"} bgColor={"#7a1317"} color={"white"} _hover={{
            bgColor:"#7a1317"
        }} isLoading={clicked}> Se connecter</Button>
        <Button mt={5}  bgColor="transparent" border="1px solid black"fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}borderRadius={"16px"} width={"full"} height={"55px"} leftIcon={<FcGoogle/>} _hover={{
            bgColor:"transparent"
        }}> Continuer avec Google</Button>
        </Box>
        <Center>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} mt={5}>Ou</Text>
        </Center>
        <Button mt={5} bgColor="transparent" border="1px solid black" fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}borderRadius={"16px"} width={"full"} height={"55px"} _hover={{
            bgColor:"transparent"
        }}> Démarrer{av} en <Text ml={2} color="#7a1317" as={Link} href={"/Inscription"} _hover={{textDecoration:"none",color:"#7a1317"}}>{insc}</Text> </Button>
        </Box>
        </>
    )
}
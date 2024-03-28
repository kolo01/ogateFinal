import Navbar from "@/components/home/Navbar";
import { Box, Button, Center, Divider, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Insc1() {
    const router = useRouter()
    const [nom,setNom] = useState("")
    const [prenom,setPrenom] = useState("")
    const [birthday,setBirthday] = useState("")
  
    const Next = ()=>{
      sessionStorage.setItem("nom",nom)
  sessionStorage.setItem("prenom",prenom)
  sessionStorage.setItem("birthday",birthday)
  }

  return (
    <>
      <Navbar />
      <Center display={"grid"} fontFamily={"-apple-system"} my={10}>
        <Flex>
            <Box fontSize={40}   w={"66px"} color={"white"} bgColor={"#219EF9"}height={"66px"} textAlign={"center"} borderRadius={"50%"}>1</Box>
            <Image src="./trait.png" alt="divider" height={1} width={"98px"} mt={"30px"}/>
            <Box fontSize={40} border={"1px solid black"} w={"66px"} height={"66px"} textAlign={"center"} borderRadius={"50%"}>2</Box>
            <Image src="./trait.png" alt="divider" height={1} width={"98px"} mt={"30px"}/>
            <Box fontSize={40}  border={"1px solid black"} w={"66px"} height={"66px"} textAlign={"center"} borderRadius={"50%"}>3</Box>
        </Flex>
        <Box  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} p={5} borderRadius={"25px"} mt={5}>
            {/* <Center display={"grid"}>
                <Box w={"139px"} height={"139px"} alignContent={"center"} alignItems={"center"} borderRadius={"50%"} bgColor={"gray"}>
                    <Input type="file" w={"full"} height={"full"} borderRadius={"50%"}/>
                </Box>
                <Text>Ajouter une photo</Text>
            </Center> */}
            <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}> 
            Nom  
        </Text>
        <Input borderRadius={"16px"} type={"text"} onChange={(e)=>{setNom(e.target.value)}} value={nom} width={"408px"} height={"55px"}  border={"1px solid black"}/>
        </Box>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}> 
        Prénom  
        </Text>
        <Input borderRadius={"16px"} width={"408px"} height={"55px"}  type={"text"} value={prenom} onChange={(e)=>{setPrenom(e.target.value)}} border={"1px solid black"}/>
        </Box>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
            Date de naissance
        </Text>
        <Input borderRadius={"16px"} width={"408px"} onChange={(e)=>{setBirthday(e.target.value)}} value={birthday} type={"date"}height={"55px"} border={"1px solid black"}/>
        </Box>
        <Box display={"grid"}>
        <Button mt={5}fontWeight={700} fontSize={"16px"} onClick={()=>{router.push("/inscriptionN2"),Next()}}lineHeight={"19.5px"} borderRadius={"16px"} width={"408px"} height={"55px"} bgColor={"#219EF9"} color={"white"} _hover={{
            bgColor:"#219EF9"
        }}> Suivant</Button>
        <Button mt={5}fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} borderRadius={"16px"} width={"408px"} height={"55px"} onClick={()=>router.back()} > Retour</Button>
        </Box>
        </Box>
      </Center>
    </>
  );
}

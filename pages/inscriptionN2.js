

import Navbar from "@/components/home/Navbar";
import { Box, Button, Center, Divider, Flex, Image, Input, Select, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Insc2() {
    const router = useRouter()
    const  ci = "Côte d'Ivoire"
    const [pays,setPays] = useState("Burkina Faso")
    const [adress,setAdress] = useState("")
   
    const Next = ()=>{
        sessionStorage.setItem("pays",pays)
    sessionStorage.setItem("adress",adress)
    }
  return (
    <>
      <Navbar />
      <Center display={"grid"} fontFamily={"-apple-system"} mt={10}>
        <Flex>
            <Box fontSize={40} border={"1px solid black"} w={"66px"} height={"66px"} textAlign={"center"} borderRadius={"50%"}>1</Box>
            <Image src="./trait.png" alt="divider" height={1} width={"98px"} mt={"30px"}/>
            <Box fontSize={40}   w={"66px"} color={"white"} bgColor={"#219EF9"}height={"66px"} textAlign={"center"} borderRadius={"50%"} >2</Box>
            <Image src="./trait.png" alt="divider" height={1} width={"98px"} mt={"30px"}/>
            <Box fontSize={40} border={"1px solid black"} w={"66px"} height={"66px"} textAlign={"center"} borderRadius={"50%"}>3</Box>
        </Flex>
        <Box  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} p={5} borderRadius={"25px"} mt={5}>
           
            <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}> 
             Adresse
        </Text>
        <Input   borderRadius={"16px"} type="text" onChange={(e)=>{setAdress(e.target.value)}}width={"408px"} height={"55px"}  border={"1px solid black"}/>
        </Box>
        <Box mt={5}>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}> 
        Pays
        </Text>
        <Select onChange={(e)=>setPays(e.target.value)}>
            <option>
                Burkina Faso
            </option>
            <option>
                Mali
            </option>
            <option>
                Ghana
            </option>
            <option>
                {ci}
            </option>
        </Select>
        </Box>
        
        <Box display={"grid"}>
        <Button mt={5}fontWeight={700} fontSize={"16px"} onClick={()=>{router.push("/inscriptionN3"),Next()}}lineHeight={"19.5px"} borderRadius={"16px"} width={"408px"} height={"55px"} bgColor={"#219EF9"} color={"white"} _hover={{
            bgColor:"#219EF9"
        }}> Suivant</Button>
        <Button mt={5}fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} borderRadius={"16px"} width={"408px"} height={"55px"} onClick={()=>router.back()}> Retour</Button>
        </Box>
        </Box>
      </Center>
    </>
  );
}

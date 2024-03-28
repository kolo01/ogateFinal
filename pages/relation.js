import Navbar from "@/components/home/Navbar";
import NavbarCo from "@/components/home/NavbarCo";
import Suggestion from "@/components/src/AfterCo/suggestion";
import Logo from "@/components/src/Logo";
import { Search2Icon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Center, Flex, Image, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Relation(){
    const texted="Térrain de 500m2 disponible à cocody angré Contactez moi en inbox pour plus d’informations" 
    const [nom,setNom] = useState("")
  const all=[
      {
        image:"./house.png",
        text:"Accueil", l:2,link:"/home"},
     
      {
          image:"./all/partenaire.png",
          text:"Mes relations", l:5,link:"/relation"},
          {
              image:"./all/notifications.png",
              text:"Notifications", l:10,link:"/notifications"},,
              {
                  image:"./all/mesasge.png",
                  text:"Messagerie", l:10,link:"/messages"},
  ]
  const router = useRouter()

  useEffect(()=>{
      // setNom(JSON.parse(localStorage.getItem("local")).data.nom)
      setNom("Default user")
  },[nom])
    return(
    <Box fontFamily={"-apple-system"} bgColor={"#F6F6F6"} pb={10} h={"45em"} color={"black"}>
     <NavbarCo/>
    
    <Center display={"flex"}>
        <Flex>
        <Box   width={{base:"100%",lg:"788px"}} ml={{base:"5%",lg:"0"}} pt={5} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} height={"fit-content"} pb={10} mt={10}  borderRadius={"25px"} bgColor={"white"}>
            <Flex ml={{base:5,lg:10}} mb={5} px={5}>
                <Flex  border={"1px solid #F1F1F1"} w={"fit-content"} p={2} mr={20}>
                <Image src="./sort.png" alt="sort" />
                <Text color={"#CDCDCD"} fontSize={"16px"} fontWeight={700}>Trier par</Text>
                </Flex>
               
                    <InputGroup  width={{base:"100%",lg:"335px"}}  height={"34px"}>
                    <InputRightElement>
                    <Search2Icon/>  
                    </InputRightElement> 
                    <Input type="text" />
                    </InputGroup>
               
            </Flex>
            <Box width={"full"} height={"1px"} bgColor={"#CDCDCD"}/>
 
            <Flex ml={10} justifyContent={"space-between"} width={"90%"} my={5}>
                <Box ml={2}>
                    
                    <Flex>
                        <Avatar w={"85px"} h={"85px"} mr={2}/>
                        
                            <Text mt={5} fontWeight={700} fontSize={"25px"}  fontFamily={"-apple-system"}>Onomo franck</Text>
                           
                        
                    </Flex>
                </Box>
                <Button mt={5} border={"1px solid #219EF9"} color={"#219EF9"} width={"400px"} bgColor={"transparent"} w={"fit-content"} p={5} _hover={{bgColor:"transparent"}}>Message</Button>
            </Flex>
          
            <Box width={"full"} height={"1px"} bgColor={"#CDCDCD"}/>
        </Box>
        <Box mt={10} ml={5}>
        <Suggestion/>
        </Box>
        </Flex>
        </Center>
      
        
    </Box>)
}
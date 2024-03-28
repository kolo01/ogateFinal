import { Avatar, Box, Button, Center, Flex, Image, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { MdHome } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io"; 
import { MdMessage } from "react-icons/md";
import { PiUsers, PiUsersBold } from "react-icons/pi";
import { useRouter } from "next/router";
import PrincipalePopup from "../popupPosts/popupPrincipale";
export default function ThreeSec(){
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
                image:"https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/external-public-relation-advertisement-tanah-basah-glyph-tanah-basah.png",
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
        <SimpleGrid columns={4}  mt={5}  fontSize={'12px'} fontFamily={"-apple-system"} >
            <Box  onClick={()=>router.push("/")} cursor={"pointer"} w={"fit-content"}>
                <Center>
                   
                    <MdHome className="Home"  fontSize={"24px"}/>
                   
                   </Center>
                <Text fontSize={"20px"} lineHeight={"16px"} >{"Accueil"}</Text>
                </Box>
                {/* <Box mt={5} mr={5}  onClick={()=>router.push("/relation")} cursor={"pointer"} textAlign={"center"}>
                  <Center >
                     <PiUsersBold  className="Users"  width={"24px"} height={"24px"} fontSize={"24px"}/> 
                    <img width="24" height="24" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/external-public-relation-advertisement-tanah-basah-glyph-tanah-basah.png" alt="external-public-relation-advertisement-tanah-basah-glyph-tanah-basah"/>
                   </Center>
                <Text fontSize={"12px"} lineHeight={"16px"} minW={"95px"}     width={"95px"}>{"Mes relations"}</Text>
                </Box> */}
                <Box    onClick={()=>router.push("/notifications")} cursor={"pointer"}>
                    <Center>
                   <Box >
                    <IoIosNotifications className="Notif" width={"24px"} height={"24px"} fontSize={"24px"} />
                   </Box>
                   </Center>
               
                <Text fontSize={"20px"} lineHeight={"16px"} >{"Notifications"}</Text>
                </Box>
                <PrincipalePopup/>
                {/* <Box mt={5} mr={5}  onClick={()=>router.push("/messages")} cursor={"pointer"}>
                   <Box ml={2}>
                    <MdMessage className="Message"   width={"24px"} height={"24px"} fontSize={"24px"}/>
                   </Box>
               
                <Text fontSize={"12px"} lineHeight={"16px"} >{"Message"}</Text>    
                </Box> */}
                
                  
                
           
            <Menu >
  <MenuButton >
    <Box >
        <Center>
  <Avatar  width={"24px"} height={"24px"} fontSize={"24px"}/>
  </Center>
  <Text fontSize={'20px'}  lineHeight={"16px"} fontFamily={'-apple-system'}>{nom=="NON DEFINI"? "New user" : nom} </Text>
 
  </Box>
  </MenuButton>
  <MenuList borderRadius={"25px"}>
    <MenuItem  borderRadius={"25px"} fontSize={"20px"} _hover={{
        bgColor:'gray',
        textDecoration:"none"
    }}>Mon profils</MenuItem>
    <MenuItem  borderRadius={"25px"} fontSize={"20px"} _hover={{
        bgColor:'white',
        textDecoration:"none"
    }} onClick={()=>{Logout()}}>Deconnexion de {nom=="NON DEFINI"? "New user" : nom}</MenuItem>
   {/* <Text mx={5}> {nom=="NON DEFINI"? "Veuillez mettre à jour votre profil" : nom}</Text> */}
  </MenuList>
</Menu>
            
        </SimpleGrid>
    )
}
import Navbar from "@/components/home/Navbar";
import NavbarCo from "@/components/home/NavbarCo";
import Profilers from "@/components/src/AfterCo/profilsEtCo";
import Logo from "@/components/src/Logo";
import { Search2Icon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Center, Flex, Image, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Offers(){
    const texted="Térrain de 500m2 disponible à cocody angré Contactez moi en inbox pour plus d’informations"
    const [nom,setNom] = useState("")
    const [token,setToken] = useState("")
    const router = useRouter()
    const [page,setPage] = useState(1)
    const [pageTotal,setPageTotal] = useState(0)
    const [dernier,setDernier] = useState(false)
    const [nbNotif,setNbNotif] = useState(0)
    const [taille,setTaille] = useState(100)

  useEffect(()=>{
    try{
        setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);

        let config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(`http://185.98.139.246:9090/ogatemanagement-api/client/recherchernotifications?page=${page}&taille=${taille} `,config).then((res)=>{
           console.log(res,"resultat")
           setNbNotif(res.data.donnee.totalElements)
           setPageTotal(res.data.donnee.totalPages)
           setDernier(res.data.donnee.isLast)
        }).catch((err)=>{console.log("erreur",err)})

        if(JSON.parse(localStorage.getItem("local")).data.nom == "NON DEFINI"){
            setNom("NON DEFINI")
           }else{
            setNom(JSON.parse(localStorage.getItem("local")).data.nom)
           }
    }catch (error){
    
        router.push("/")
    }
  },[nom])
    return(<Box bgColor={"#F6F6F6"} fontFamily={"-apple-system"} pb={10} h={"45em"}>
     <NavbarCo/>
    <Center mt={10}>
        <Profilers/>
        <Box ml={10} width={"788px"} pt={10} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} height={"fit-content"}  borderRadius={"25px"} bgColor={"white"}>
        <Flex pl={10} mb={2} height={"fit-content"} >
            <Flex border={"1px solid #F1F1F1"} p={2}>
                <Image src="./sort.png" alt="sort" />
                <Text color={"#CDCDCD"} fontSize={"16px"} cursor={"pointer"} fontWeight={700}>Filtre</Text></Flex>
                <Text mt={2} ml={5}>{nbNotif} Notifications</Text>
            </Flex>
            <Box width={"full"}  height={"1px"} bgColor={"gray"}/>

            <Box py={2} borderBottom={"1px solid gray"} mb={2}>
            <Text  ml={5} color={"#1E0303"} mb={5} fontWeight={700}>Il y a 2 jours</Text>
            <Flex ml={10} justifyContent={"space-between"} width={"90%"} >
                <Box ml={2}>
                    
                    <Flex>
                        <Avatar w={"42px"} h={"42px"} mr={2}/>
                        <Box>
                        <Text w={"400px"} ml={5} mb={5} color={"#121F14"}>{texted}</Text>
                        </Box>
                    </Flex>
                </Box>
                <Text ></Text>
            </Flex>
            </Box>
            <Box width={"full"} height={"20px"} bgColor={"#121F14"}  borderBottomRadius={"25px"} />
        </Box>
        </Center>
    </Box>)
}
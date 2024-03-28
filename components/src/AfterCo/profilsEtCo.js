import { Avatar, Box, Center, Flex, Image, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Profilers(){
    const [nom,setNom] = useState("")
    const [interet,setInteret] = useState(0)
    const [favoris,setFavoris] = useState(0)
    const [publication,setPublication] = useState(0)
    const [token,setToken] = useState("")
    const router = useRouter()
    useEffect( ()=>{
      
       

        try{
            setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);
    
            let config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            axios.get("http://185.98.139.246:9090/ogatemanagement-api/client/rechercherquantitepublicationsparclient",config).then((res)=>{
                setFavoris(res.data.donnee.nombreFavoris),
                setInteret(res.data.donnee.nombreInteresse),
                setPublication(res.data.donnee.nombrePublication)
            }).catch((err)=>{console.log("erreur",err)})
    
            if(JSON.parse(localStorage.getItem("local")).data.nom == "NON DEFINI"){
                setNom("NON DEFINI")
               }else{
                setNom(JSON.parse(localStorage.getItem("local")).data.nom)
               }
        }catch (error){
        
            router.push("/")
        }
      
    },[nom,router,token])
    return(
    <Box pb={5}  display={{base:"none",lg:"grid"}} width={"250px"} fontFamily={"-apple-system"} bgColor={"white"}  borderBottomRadius={"xl"}  borderTopRadius={"xl"}   boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}>
        <Box bgColor={"#7a1317"} width={"full"} borderTopRadius={"xl"} height={"50px"} ></Box>
    <Box borderBottomRadius={"xl"} mt={-5} width={"full"} height={"fit-content"}  >
        <Center><Avatar/></Center>
        <Text textAlign={"center"} fontSize={"15px"}  fontWeight={600}>Bonjour  {nom}</Text>
        <Flex textAlign={"center"} fontSize={"15px"} fontWeight={700}>
            
           {/* <Center mx={"30%"} display={"flex"}> <Box  w={4} h={4} bg= 'green.300' border= '2px solid white' rounded='full'/><Text >Actif</Text></Center> */}
        </Flex>

        {/* Debut 2eme elements */}
        <Flex borderTop={"1px solid gray"} my={5} pt={5} >
        {/* <Image ml={2}  src="./Stats.png" alt="stats" w={"24px"} h={"24px"}/> */}
        <img width="24" height="24" src="https://img.icons8.com/external-wanicon-flat-wanicon/64/external-stats-online-shopping-wanicon-flat-wanicon.png" alt="external-stats-online-shopping-wanicon-flat-wanicon"/>

    
        <Text fontWeight={600}  fontSize={"20px"} >Statistiques globales</Text>
       </Flex>
       <Box mx={2} mb={2} fontSize={"15px"} fontWeight={600} mt={2} >
       <Flex as={Link} href="/Favoris" _hover={{
        textDecoration:"none"
       }} display={"flex"} justifyContent={"space-between"} pb={2}>
        <Flex>
        <img width="24" height="24" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-publication-resume-flaticons-flat-flat-icons.png" alt="external-publication-resume-flaticons-flat-flat-icons"/>
        <Text>Publications favoris : </Text>
        </Flex>
        
        <Text>{favoris}</Text>
       </Flex>
       <Flex as={Link} href="/Interet" _hover={{
        textDecoration:"none"
       }} display={"flex"} justifyContent={"space-between"} pb={2}>
        <Flex>
        <img width="24" height="24" src="https://img.icons8.com/color/48/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1"/>
        <Text>Interessés par :</Text>
        </Flex>
      
        <Text>{interet}</Text>
       </Flex>
       <Flex  as={Link} href="/MesPublications" _hover={{
        textDecoration:"none"
       }} display={"flex"} justifyContent={"space-between"} pb={2}>
        <Flex>
        <img width="24" height="24" src="https://img.icons8.com/nolan/64/us-news.png" alt="us-news"/>
        <Text>Mes publications:</Text>
        </Flex>
       
        <Text>{publication}</Text>
       </Flex>
       {/* <Flex as={Link} href="/Followers" _hover={{
        textDecoration:"none"
       }}   display={"flex"} justifyContent={"space-between"} pb={2}>
       <Text>Suivis par :</Text>
        <Text>55</Text>
       </Flex> */}
       </Box>
    </Box>
    {/* <Text textAlign={"center"}  fontWeight={400}> {nom=="NON DEFINI"? "Veuillez mettre à jour votre profil" : nom}</Text> */}
    </Box>)
}
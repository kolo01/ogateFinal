import Navbar from "@/components/home/Navbar";
import NavbarCo from "@/components/home/NavbarCo";
import Profilers from "@/components/src/AfterCo/profilsEtCo";
import Logo from "@/components/src/Logo";
import { Search2Icon } from "@chakra-ui/icons";
import { Avatar, Box, Center, Flex, Image, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Message() {
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
  
  return (
    <Box bgColor={"#F6F6F6"} pb={10} fontFamily={"-apple-system"}>
      <NavbarCo/>
      <Center>
      <Flex mt={10}   display={{base:"grid",lg:"flex"}}>
        <Box  mx={20} width={"300px"}>
          <Profilers />
          <Box
         
            bgColor={"white"}
            mt={5}
            mb={5}
            width=  {{base:"100%",lg:"240px"}}
          
            height={"144px"}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            borderRadius={"10px"}
          >
            <Text fontWeight={700}  fontSize={'16px'} fontFamily={"-apple-system"} p={2}>
              {" "}
              Relations actives{" "}
            </Text>
            <Box width={"full"} height={"1px"} bgColor={"#CDCDCD"} />
            <Flex p={2} fontSize={'14px'} fontFamily={"-apple-system"}>
              <Avatar w={"42px"} h={"42px"} mr={2} />
              <Box>
                <Text fontWeight={700} fontSize={'16px'} fontFamily={"-apple-system"}>Onomo franck</Text>
                <Flex>
                  <Box
                    w={4}
                    h={4}
                    bg="green.300"
                    border="2px solid white"
                    rounded="full"
                  />
                  <Text fontWeight={700} fontSize={'14px'} fontFamily={"-apple-system"}>
                    Actif
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box bgColor={"white"}    width={{base:"90%",lg:"600px"}}  ml={{base:"5%",lg:"0"}}   borderRadius={"20px"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}>
          <Flex p={2} ml={10}>
            <Avatar w={"42px"} h={"42px"} mr={2} />
            <Box>
              <Text fontWeight={700} fontSize={'16px'} fontFamily={"-apple-system"}>Onomo franck</Text>
              <Flex>
                <Box
                  w={4}
                  h={4}
                  bg="green.300"
                  border="2px solid white"
                  rounded="full"
                />
                <Text fontWeight={700} fontSize={"15px"}>
                  Actif
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Box width={"full"} height={"1px"} bgColor={"#CDCDCD"} />
          <Box ml={10}>
            <Text color={"#D9D9D9"} fontWeight={700} fontSize={"15px"}>
              Envoyé le 12/10/2013
            </Text>
            <Box mt={2}>
              <Flex w={"full"}>
                <Avatar w={"42px"} h={"42px"} mr={2} />
                <Flex justifyContent={"space-between"} w={"80%"}>
                  <Text fontWeight={700}  fontSize={'15px'} fontFamily={"-apple-system"}>
                    {" "}
                    Kouakou Serge
                  </Text>
                  <Text fontWeight={300} fontSize={'14px'} fontFamily={"-apple-system"}>
                    11h34
                  </Text>
                </Flex>
              </Flex>
              <Text ml={"50px"} w={["300px","300px","300px","494px","494px"]} fontSize={'14px'} fontFamily={"-apple-system"} fontWeight={400} mt={-2}>Bonjour Mr Onomo, Je suis très intéressé par votre offre.</Text>
            </Box>
            <Box mt={2}>
              <Flex w={"full"}>
                <Avatar w={"42px"} h={"42px"} mr={2} />
                <Flex justifyContent={"space-between"} w={"80%"}>
                  <Text fontWeight={700}  fontSize={'15px'} fontFamily={"-apple-system"}>
                    {" "}
                    Onomo Franck
                  </Text>
                  <Text fontWeight={300}  fontSize={'14px'} fontFamily={"-apple-system"}>
                  15h45
                  </Text>
                </Flex>
              </Flex>
              <Text ml={"50px"} w={["300px","300px","300px","494px","494px"]}  fontSize={'14px'} fontFamily={"-apple-system"} fontWeight={400} mt={-2}>Bonsoir Mr Kouakou. Vous pouvez me contacter au 0584515492 pour plus d’informations</Text>
            </Box>
          </Box>
          <Center mt={20} mb={10} w={["400px","400px","400px","494px","494px"]} display={"grid"}>
          <Textarea w={["350px","350px","350px","494px","494px"]} ml={[0,0,0,10,10]}h={"106px"} type="text" placeholder="Entrez votre message" borderRadius={"15px"} bgColor={"#F1F1F1"} />
          <Flex justifyContent={"space-between"} mt={5}>
            <Flex ml={[0,0,0,12,12]}>
                <Image src="./imaged.png" w={"36px"} h={"36px"} alt="imaged"/>
                <Image src="./join.png" w={"36px"} h={"36px"} alt="join"/>
                <Image src="./emoji.png" w={"36px"} h={"36px"} alt="emoji"/>
                <Image src="./gif.png" w={"36px"} h={"36px"} alt="gif"/>
            </Flex>
            <Image src="./sender.png" w={"36px"} h={"36px"} alt="send"/>
          </Flex>
          </Center>
        </Box>
      </Flex>
      </Center>
    </Box>
  );
}

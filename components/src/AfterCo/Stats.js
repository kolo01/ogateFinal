import { Avatar, Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Stats(){
   
    return(<>
    <Box fontFamily={"-apple-system"} borderRadius={"25px"} display={"none"} py={5} width={"240px"} px={2} height={"144px"} mt={10} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} >
       <Flex >
        <Image src="./Stats.png" alt="stats" w={"24px"} h={"24px"}/>
        <Text fontWeight={700} width={"163px"} fontSize={"16px"} >Statistiques globales</Text>
       </Flex>
       <Box color={"#A3A2A2"} fontSize={"12px"} mt={2}>
       <Flex display={"flex"} justifyContent={"space-between"}>
        <Text>Likes</Text>
        <Text>12</Text>
       </Flex>
       <Flex display={"flex"} justifyContent={"space-between"}>
       <Text>Commentaires</Text>
        <Text>5</Text>
       </Flex>
       <Flex display={"flex"} justifyContent={"space-between"}>
       <Text>Partages</Text>
        <Text>55</Text>
       </Flex>
       </Box>
    </Box>
  
    </>)
}
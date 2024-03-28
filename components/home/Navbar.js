import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Logo from "../src/Logo";

import Last from "../src/LastSec";

export default function Navbar(){
    const logo ="O'Gate"
    const all=[
        {
        image:"./all/Post add.png",
        text:"Post", l:2},
       
        {
            image:"./all/Member.png",
            text:"Membres", l:5},
            {
                image:"./all/Sell.png",
                text:"Offres immobilières", l:10},
    ]
    const insc = "S’incrire"
    return(
        <Box display={"flex"} width={{base:"100%",lg:"100%"}} justifyContent={"space-between"}  bgColor={"#ffffff"} pb={2}>
          <Logo/>
       
          <Box >
           <Last/>
           </Box>
        </Box>
    )
}
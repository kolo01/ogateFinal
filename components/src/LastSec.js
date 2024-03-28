import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";

export default function Last(){
    const insc = "S’incrire"
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <Box   fontSize={'16px'} fontFamily={"-apple-system"}>
        <Flex  marginTop={"20px"} display={{base:"none",lg:"flex"}}>
        <Button width={"126px"} height={"48px"} borderRadius={"16px"}
        fontSize={"16px"}
        fontWeight={700} bgColor={"white"}
        color={"#7a1317"}
        _hover={{
            bgColor:"white",
            color:"#7a1317",
            border:"2px solid #7a1317",
            borderRadius:"16px",
            textDecoration:"none"
        }} border={"2px solid #7a1317"} as={Link} href={"/Inscription"}>
        {insc}
        </Button>
        <Button ml={5} width={"126px"} height={"48px"} borderRadius={"16px"}
        fontSize={"16px"}
        fontWeight={700} bgColor={"#7a1317"}
        color={"#FDFDFD"}
        _hover={{
            bgColor:"#7a1317",
            color:"#FDFDFD",
            border:"2px solid #7a1317",
            borderRadius:"16px",
            textDecoration:"none"
        }} border={"2px solid #7a1317"}  as={Link} href={"/Connexion"}>
        Connexion
        </Button>
        </Flex>
        <Box display={{base:"grid",lg:"none"}} onClick={onOpen} cursor={"pointer"}>
            <Flex>
                <HamburgerIcon mt={3} fontSize={"20px"} mr={2}/>
                <Button variant={"unstyled"} >
        Menu
      </Button>
            </Flex>
        
      <Drawer  onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody >
            <Box display={"grid"} ml={"20%"}>
          <Button width={"126px"} height={"48px"} borderRadius={"16px"}
        fontSize={"16px"}
        fontWeight={700} bgColor={"white"}
        
        mt={5}
        _hover={{
            bgColor:"white",
      
            textDecoration:"none"
        }}  as={Link} href={"/"}>Accueil</Button>
        
            <Button width={"126px"} height={"48px"} borderRadius={"16px"}
        fontSize={"16px"}
        fontWeight={700} bgColor={"white"}
        color={"#219EF9"}
        mt={5}
        _hover={{
            bgColor:"white",
            color:"#219EF9",
            border:"2px solid #219EF9",
            borderRadius:"16px",
            textDecoration:"none"
        }} border={"2px solid #219EF9"} as={Link} href={"/Inscription"}>
        {insc}
        </Button>
        <Button width={"126px"} height={"48px"} borderRadius={"16px"}
        fontSize={"16px"}
        fontWeight={700} bgColor={"#7a1317"}
        color={"#FDFDFD"}
        mt={5}
        _hover={{
            bgColor:"#7a1317",
            color:"#FDFDFD",
            border:"2px solid #7a1317",
            borderRadius:"16px",
            textDecoration:"none"
        }} border={"2px solid #7a1317"}  as={Link} href={"/Connexion"}>
        Se Connecter
        </Button>

           
        </Box>  
          </DrawerBody>
        </DrawerContent>
      </Drawer>

        </Box>
        
        </Box>
    )
}
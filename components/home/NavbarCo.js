import { Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, InputGroup, InputLeftElement, InputRightElement, useDisclosure } from "@chakra-ui/react";
import { FcSearch } from "react-icons/fc";
import Logo from "../src/Logo";
import ThreeSec from "./three";
import { Search2Icon } from "@chakra-ui/icons";
import ThreeSecM from "./threeM";

export default function NavbarCo(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
        
        <Flex display={{base:"none", lg: "flex"}} justifyContent={"space-around"} bgColor={"whiteAlpha.700"} pb={5}>
        <Center>
          <Flex>
         <Logo/>
         <InputGroup width={"335px"} height={"34px"} mt={5}  
         >
         <Input  
           _focus={{
            border: "2px solid #ad1328"
           }} placeholder="Rechercher" type="search"border={"none"} 
         />
         <InputLeftElement  width={"15px"} ml={2}  as={Search2Icon}/>
         </InputGroup>
         </Flex>
         </Center>
         <ThreeSec/>
        </Flex>
       
        <Flex   justifyContent={"space-between"} px={20}>
            <Logo/>
            <InputGroup border={"1px solid black"} width={["205px","205px","205px","335px","335px"]} mr={[2,2,2,0,0]} height={"34px"} mt={5} >
         <Input type="search" placeholder="Rechercher" border={"none"}  />
         <InputRightElement  width={"25px"} mr={2}  as={Search2Icon}/>
         </InputGroup>
             <Button  mt={5} colorScheme='blue' onClick={onOpen}>
        Menu
      </Button>
      <Drawer placement={"left"}  onClose={onClose} isOpen={isOpen}>
      
        {/* <DrawerOverlay /> */}
        
        <DrawerContent >
        <DrawerCloseButton/>
          <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
          <DrawerBody>
            <ThreeSecM/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </Flex>
       
        
        </>
    )
}
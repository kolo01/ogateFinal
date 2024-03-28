import { Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Logo(){
    const logo ="O'Gate"
    const router = useRouter()
    return(
        <>
          <Box  width={"fit-content"} height={"41px"} ml={"12%"} cursor={"pointer"} onClick={()=>router.push("/")}  mr={2} marginTop={"20px"} >
            <Image src="./logo.jpg.png"  alt={logo} height={"41px"}/>
        </Box>
        </>
    )
}
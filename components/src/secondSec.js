import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function SecondSec(){
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
    return(
        <Flex   fontSize={'16px'} fontFamily={"-apple-system"}>
            {all.map((data,index)=>(
                <Box key={index} maxW={"107px"} maxH={"56px"} mt={"12px"} mr={"20px"}  textAlign={"center"}>
                    <Image ml={data.l}alt={data.text} src={data.image}/>
                    <Text fontSize={"16px"} lineHeight={"16px"}
                   >{data.text}</Text>
                </Box>
            ))}
        </Flex>
    )
}
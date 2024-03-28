import { Box, Text } from "@chakra-ui/react";

export default function Box1(){
    const text = "Réalisez l'acquisition de vos rêves où vendez facilement grâce à notre grand réseau de vendeurs/acheteurs de biens immobiliers."
    return(
        <Box   width={"535px"} fontFamily={"-apple-system"}>
            <Text fontWeight={700} fontSize={"48px"} color={" #7a1317"}  >Nous connectons les 
acteurs du monde 
immobilier</Text>
<Text fontWeight={500} fontSize={"24px"} color={"black"}>{text}</Text>

        </Box>
    )
}
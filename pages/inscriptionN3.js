import Navbar from "@/components/home/Navbar";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Insc3() {
  const router = useRouter();
  const [compte, setCompte] = useState("Particulier");
  const toast = useToast()

  const Validate = async () => {
   
    await axios.post("http://185.98.139.246:9090/ogatemanagement-api/signup", {
      nom: sessionStorage.getItem("nom"),
      username: sessionStorage.getItem("tel"),
      password: sessionStorage.getItem("mdp"),
      typeCompte: compte,
      localisation: sessionStorage.getItem("adress"),
    }).then((response)=>{
      toast({
        description:"Merci pour votre confiance",title:"Inscription validée",duration:9000,status:"success"
      }),
      sessionStorage.clear()
    }).catch((error)=>{
      toast({
        description:"Si le probleme persiste merci de bien vouloir contacter notre",title:"Merci de bien vouloir reesayer plus tard ",duration:9000,status:"error"
      })
    });
  };
  return (
    <>
      <Navbar />
      <Center fontFamily={"-apple-system"} display={"grid"} mt={10}>
        <Flex>
          <Box
            fontSize={40}
            border={"1px solid black"}
            w={"66px"}
            height={"66px"}
            textAlign={"center"}
            borderRadius={"50%"}
          >
            1
          </Box>
          <Image
            src="./trait.png"
            alt="divider"
            height={1}
            width={"98px"}
            mt={"30px"}
          />
          <Box
            fontSize={40}
            border={"1px solid black"}
            w={"66px"}
            height={"66px"}
            textAlign={"center"}
            borderRadius={"50%"}
          >
            2
          </Box>
          <Image
            src="./trait.png"
            alt="divider"
            height={1}
            width={"98px"}
            mt={"30px"}
          />
          <Box
            fontSize={40}
            w={"66px"}
            color={"white"}
            bgColor={"#219EF9"}
            height={"66px"}
            textAlign={"center"}
            borderRadius={"50%"}
          >
            3
          </Box>
        </Flex>
        <Box
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
          p={5}
          borderRadius={"25px"}
          mt={5}
        >
          <Box mt={5}>
            <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
              Type de Compte
            </Text>
            <Select onChange={(e) => setCompte(e.target.value)}>
              <option>PARTICULIER</option>
              <option>ENTREPRISE</option>
            </Select>
          </Box>
          <Box display={"grid"}>
            <Button
              mt={5}
              fontWeight={700}
              fontSize={"16px"}
              onClick={() => {
                Validate();
              }}
              lineHeight={"19.5px"}
              borderRadius={"16px"}
              width={"408px"}
              height={"55px"}
              bgColor={"#219EF9"}
              color={"white"}
              _hover={{
                bgColor: "#219EF9",
              }}
            >
              {" "}
              Terminer
            </Button>
            <Button
              mt={5}
              fontWeight={700}
              fontSize={"16px"}
              lineHeight={"19.5px"}
              borderRadius={"16px"}
              width={"408px"}
              height={"55px"}
              onClick={() => router.back()}
            >
              {" "}
              Retour
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}

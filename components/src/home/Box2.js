import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";

export default function Box2() {
  const av = " l'aventure";
  const insc = " S'incrivant";
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();
  const handleConnect = async () => {
    setClicked(true);
    // toast({
    //     status:"success",duration: 9000,description:"Merci pour votre confiance",title:"Connexion Approuvé!"
    // })
    // router.push("/home")
    await axios
      .post("http://185.98.139.246:9090/ogatemanagement-api/signin", {
        username: email,
        password: password,
      })
      .then(async (response) => {
        // console.log(JSON.stringify(response))
        await localStorage.setItem("local", JSON.stringify(response));
        toast({
          status: "success",
          duration: 3000,
          description: "Merci pour votre confiance",
          title: "Connexion Approuvé!",
        });
        router.push("/home");
      })
      .catch((error) => {
        // console.log(error.response)
        setClicked(false);
        toast({
          status: "error",
          duration: 9000,
          description: "Merci de bien vouloir reesayer",
          title: "Mot de passe/Numéro incorrect",
        });
      });
  };
  return (
    <>
     
     
        <Box  width={"100%"}
      mx={"5%"}
      fontFamily={"-apple-system"}
       display={{base:"block",lg:"none"}}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
          p={5}
          borderRadius={"25px"}
          my={10}>
          <Text color={" #7a1317"} fontWeight={700} fontSize={"48px"}>
            Connexion
          </Text>
          <Box mt={5}>
            <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
              Téléphone
            </Text>
            <Input
              borderRadius={"16px"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
             
              height={"55px"}
              border={"1px solid black"}
            />
          </Box>
          <Box mt={5}>
            <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
              Mot de passe
            </Text>
            <Input
              borderRadius={"16px"}
             
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={"password"}
              height={"55px"}
              border={"1px solid black"}
            />
          </Box>
          <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} mt={5}>
            {" "}
            Mot de passe oublié ?
          </Text>
          <Button
            mt={5}
            fontWeight={700}
            onClick={() => handleConnect()}
            isDisabled={email.length < 8 || password.length < 3}
            fontSize={"16px"}
            lineHeight={"19.5px"}
            borderRadius={"16px"}
            width={"full"}
            height={"55px"}
            bgColor={"#7a1317"}
            color={"white"}
            _hover={{
              bgColor: "#7a1317",
            }}
            isLoading={clicked}
          >
            {" "}
            Se connecter
          </Button>
          <Button
            mt={5}
            bgColor="transparent"
            border="1px solid black"
            fontWeight={700}
            fontSize={"16px"}
            lineHeight={"19.5px"}
            borderRadius={"16px"}
           width={"full"}
            height={"55px"}
            leftIcon={<FcGoogle />}
            _hover={{
              bgColor: "transparent",
            }}
          >
            {" "}
            Continuer avec Google
          </Button>
          <Box position='relative' py={10} width={{base:"100%",lg:"80%"}}>
  <Divider color={"black"} bgColor={"black"} border={"1px solid black"}/>
  <AbsoluteCenter bg='white' px='4'>
    Ou
  </AbsoluteCenter>
</Box>
          <Button
            mt={5}
            bgColor="transparent"
            border="1px solid black"
            fontWeight={700}
            fontSize={"16px"}
            lineHeight={"19.5px"}
            borderRadius={"16px"}
            width={"full"}
            height={"55px"}
            _hover={{
              bgColor: "transparent",
            }}
          >
            {" "}
            Démarrer{av} en{" "}
            <Text
              ml={2}
              color="#219EF9"
              as={Link}
              href={"/Inscription"}
              _hover={{ textDecoration: "none", color: "#219EF9" }}
            >
              {insc}
            </Text>{" "}
          </Button>
        </Box>
     
     




     {/* Affichage pc */}
      <Box display={{ base: "none", lg: "block" }} fontFamily={"-apple-system"}>
        <Text color={" #7a1317"} fontWeight={700} fontSize={"48px"}>
          Connexion
        </Text>
        <Box mt={5}>
          <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
            Téléphone
          </Text>
          <Input
            borderRadius={"16px"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            width={"408px"}
            height={"55px"}
            border={"1px solid black"}
          />
        </Box>
        <Box mt={5}>
          <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"}>
            Mot de passe
          </Text>
          <Input
            borderRadius={"16px"}
            width={"408px"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={"password"}
            height={"55px"}
            border={"1px solid black"}
          />
        </Box>
        <Text fontWeight={700} fontSize={"16px"} lineHeight={"19.5px"} mt={5}>
          {" "}
          Mot de passe oublié ?
        </Text>
        <Button
          mt={5}
          fontWeight={700}
          onClick={() => handleConnect()}
          isDisabled={email.length < 8 || password.length < 5}
          fontSize={"16px"}
          lineHeight={"19.5px"}
          borderRadius={"16px"}
          width={"408px"}
          height={"55px"}
          bgColor={"#7a1317"}
          color={"white"}
          _hover={{
            bgColor: "#7a1317",
          }}
          isLoading={clicked}
        >
          {" "}
          Se connecter
        </Button>
        <Box>
          <Button
            mt={5}
            bgColor="transparent"
            border="1px solid black"
            fontWeight={700}
            fontSize={"16px"}
            lineHeight={"19.5px"}
            borderRadius={"16px"}
            width={"408px"}
            height={"55px"}
            leftIcon={<FcGoogle />}
            _hover={{
              bgColor: "transparent",
            }}
          >
            {" "}
            Continuer avec Google
          </Button>
        </Box>
        <Box position="relative" padding="10">
          <Divider
            color={"black"}
            bgColor={"black"}
            border={"1px solid black"}
          />
          <AbsoluteCenter bg="white" px="4">
            Ou
          </AbsoluteCenter>
        </Box>

        <Box>
          <Button
            mt={5}
            bgColor="transparent"
            border="1px solid black"
            fontWeight={700}
            fontSize={"16px"}
            lineHeight={"19.5px"}
            borderRadius={"16px"}
            width={"408px"}
            height={"55px"}
            _hover={{
              bgColor: "transparent",
            }}
          >
            {" "}
            Démarrer{av} en{" "}
            <Text
              ml={2}
              color="#7a1317"
              as={Link}
              href={"/Inscription"}
              _hover={{ textDecoration: "none", color: "#7a1317" }}
            >
              {insc}
            </Text>{" "}
          </Button>
        </Box>
      </Box>
    </>
  );
}

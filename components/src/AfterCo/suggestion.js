import { ArrowRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Suggestion() {
  const [nom, setNom] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
   
    try {
      setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);
    
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
      .get(
        "http://185.98.139.246:9090/ogatemanagement-api/client/rechercherpublicationparpage?page=0&taille=3",
        config
      )
      .then((response) => {setSuggest(response.data.donnee.publications)})
      .catch((error) => {});
      if (JSON.parse(localStorage.getItem("local")).data.nom == "NON DEFINI") {
        setNom("NON DEFINI");
      } else {
        setNom(JSON.parse(localStorage.getItem("local")).data.nom);
      }
    } catch (error) {
      router.push("/");
    }
  }, [nom, router,token]);
  return (
    <Box
  
    bgColor={"white"}
    fontFamily={"-apple-system"}
      borderRadius={"5%"}
      py={5}
      width={"300px"}
      height={"fit-content"}
      display={{ base: "none", lg: "grid" }}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
    >
      <Box>
        <Text fontWeight={700} fontSize={"20px"} ml={2} mb={5} width={"fit-content"} fontFamily={"sans-serif"}>
          Vous pourriez être interessé
        </Text>
        <Box width={"220px"} ml={5}>
          {
            suggest.map((data,index)=>{
              return (
<Flex key={index}>


<Flex  fontSize={"15px"} display={"grid"} mb={2} fontFamily={"sans-serif"} justifyContent={"space-between"}>
                <Flex>
                  <Text noOfLines={2} ml={2} fontWeight={600}>{data.description}</Text>
                </Flex>
                <Text ml={2} fontWeight={500}>{data.prix}</Text>
                <Button color={"#219EF9"} as={Link} href={`/Publication?id=${data.id}`} _hover={{
                  textDecoration:'none'
                }}>Voir publication</Button>
              </Flex>
</Flex>
               
              )
            })
          }
        
         
        </Box>
      </Box>
    
    </Box>
  );
}

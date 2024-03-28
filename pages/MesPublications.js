import InteretP from "@/components/home/InteretP";
import Mespub from "@/components/home/MesPubs";
import NavbarCo from "@/components/home/NavbarCo";
import Profilers from "@/components/src/AfterCo/profilsEtCo";
import { Box, Center, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function MesPub() {
  const [pub, setPub] = useState([]);
  const [token, setToken] = useState("");
  const [length, setLength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);

      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(
          "http://185.98.139.246:9090/ogatemanagement-api/client/recherchermespublicationparpage?page=0&taille=10",
          config
        )
        .then((response) => {
          setPub(response.data.donnee.publications),
          setLength(response.data.donnee.totalElements)
        })
        .catch((error) => {});
    } catch (error) {
      router.push("/");
    }
  }, [router, token]);
  return (
    <>
      <NavbarCo />
      <Flex mt={5} pb={10} fontSize={"16px"} fontFamily={"-apple-system"}>
        <Box
          ml={80}
          display={["none", "none", "none", "block", "block"]}
          height={"fit-content"}
        >
          <Profilers />
        </Box>
        <Box ml={5} width={"full"}>
          <Box mb={5} borderTop={"1px solid black"} width={"full"}>
            <Text
              width={"fit-content"}
              bgColor={"black"}
              color={"white"}
              px={4}
              py={2}
            >
              VOS PUBLICATIONS
            </Text>
          </Box>
          {length>0 ?   <SimpleGrid columns={[1, 1, 1, 2,2,2, 3]} spacingX={10}>
            {pub.map((data, index) => {
              return (
                <Box key={index}>
                  <Mespub
                    like={data.nombrelike}
                    isliked={data.isLiked}
                    isInteressed={data.isInteresse}
                    isFav={data.isFavoris}
                    comment={data.nombrecommentaire}
                    favoris={data.nombrefavoris}
                    idM={data.id}
                    propio={data.Client}
                    date={data.datePublication}
                    image={data.fichiers}
                    message={data.description}
                    appart={data.typeBien}
                    doc={data.typeDocuments}
                    init={data.apportInitial}
                    prix={data.prix}
                    periodicite={data.periodicite}
                    ville={data.localisation}
                    piece={data.nombrePieces}
                    chambre={data.nombreChambres}
                    salon={data.nombreSalon}
                    dispo={data.disponibilite}
                  />
                </Box>
              );
            })}
          </SimpleGrid> : <Center>
            <Text>Aucune Publication pour le moment</Text>
          </Center>}
        
        </Box>
      </Flex>
    </>
  );
}

export default MesPub;

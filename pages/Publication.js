import NavbarCo from "@/components/home/NavbarCo";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Carousel from "better-react-carousel";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ScrollMode, SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
export default function Publication() {
  const router = useRouter();
  const [id, setId] = useState();
  const [token, setToken] = useState();
  const [hided, setHided] = useState(false);
  const [plength, setPLength] = useState(0);
  const [ilength, setILength] = useState(0);
  const [type, setType] = useState("IMAGE");
  const [pub, setPub] = useState([]);

  useEffect(() => {
    try {
      setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);

      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(
          `http://185.98.139.246:9090/ogatemanagement-api/client/rechercherdetailpublication/${router.query.id}`,
          config
        )
        .then((response) => {
          console.log(response.data.donnee);
          setPub(response.data.donnee),
            setPLength(Object.keys(response.data.donnee).length);
          setType(response.data.donnee.fichiers[0].typeFichier ?? "");

          if (response.data.donnee.fichiers.length > 5) {
            setILength(5);
          } else {
            setILength(response.data.donnee.fichiers.length);
            setHided(true);
          }
        })
        .catch((error) => {});
    } catch (error) {
      console.log(error);
      // router.push("/");
    }
  }, [router, id, token]);




  const renderPage = (props) => (
    <>
        {props.canvasLayer.children}
        {props.textLayer.children}
        <div style={{ height: '100px' }}>
        {props.height = 200}
            </div>
       
        {props.annotationLayer.children}
       
    </>
);



  return (
    <>
     {plength > 5 ? (
        <Box fontFamily={"-apple-system"}>
          <NavbarCo />
          <Box bgColor={"black"} width={"full"} height={"fit-content"} p={5}>
            {type == "IMAGE" ? (
              <Carousel
                cols={ilength}
                rows={1}
                gap={10}
                loop
                dot={true}
                hideArrow={hided}
              >
                {pub.fichiers.map((data, index) => {
                  return (
                    // console.log("data.id",data.id)
                    <Carousel.Item key={index}>
                      <Image
                        alt={data.nom}
                        width={"100%"}
                        height={"450px"}
                        src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${data.id}`}
                      />
                    </Carousel.Item>
                  );
                })}

                {/* ... */}
              </Carousel>
            ) : type == "VIDEO" ? (
              <Carousel
                cols={ilength}
                rows={1}
                gap={10}
                loop
                dot={true}
                hideArrow={hided}
              >
                {pub.fichiers.map((data, index) => {
                  return (
                    // console.log("data.id",data.id)
                    <Carousel.Item key={index}>
                      <Center>
                        <video
                          controls
                          alt={data.nom}
                          width={"50%"}
                          height={"300px"}
                          src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${data.id}`}
                        />
                      </Center>
                    </Carousel.Item>
                  );
                })}

                {/* ... */}
              </Carousel>
            ) : type == "DOCUMENT" ? (
              <Carousel cols={1} rows={1} gap={10} loop dot={true}>
                {pub.fichiers.map((data, index) => {
                  return (
                    // console.log("data.id",data.id)
                    <Carousel.Item key={index}>
                      <Text noOfLines={1} textAlign={"center"} color={"white"}>
                        {data.nom}
                      </Text>
                      <Center width={"full"} height={"400px"}>
                        {/* <Box
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          datatype="application/pdf"
                          type="application/pdf"
                          src={
                            "http://185.98.139.246:9090/ogatemanagement-api/fichier/52"
                          }
                        ></Box> */}

                       
                          {/* Main viewer */}
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer
                            scrollMode={ScrollMode.Page}
                              renderPage={renderPage}
                              
                              // defaultScale={SpecialZoomLevel.ActualSize}
                              fileUrl="http://185.98.139.246:9090/ogatemanagement-api/fichier/52"
                            />
                          </Worker>
                      
                      </Center>
                    </Carousel.Item>
                  );
                })}

                {/* ... */}
              </Carousel>
            ) : (
              <Box width={"full"} bgColor={"white"} height={"50px"}></Box>
            )}
            <Center>
              <SimpleGrid
                mt={5}
                columns={[2, 2, 2, 5, 5]}
                spacing={5}
                color={"white"}
              >
                {pub.nombrePieces ? (
                  <Box>
                    <Text>
                      <b>Nombre de piéces : </b>
                      {pub.nombrePieces}{" "}
                    </Text>
                  </Box>
                ) : (
                  <></>
                )}

                {pub.localisation ? (
                  <Flex>
                    <Text>
                      <b>Situé à :</b> {pub.localisation}{" "}
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}

                {pub.periodicite ? (
                  <Flex>
                    <Text>
                      <b>Periodicité :</b> {pub.periodicite}{" "}
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}

                {pub.prix ? (
                  <Flex>
                    <Text>
                      <b>Prix :</b> {pub.prix} FCFA
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}

                {pub.typeAppartement ? (
                  <Flex>
                    <Text>
                      <b>Meublé :</b>{" "}
                      {pub.typeAppartement == "MEUBLE" ? "OUI" : "NON"}{" "}
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
              </SimpleGrid>
            </Center>
          </Box>
          <Center>
            <Flex
              mt={10}
              mb={20}
              boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
              display={["grid", "grid", "grid", "flex", "flex"]}
              borderRadius={"15px"}
            >
              <Box p={5} width={"400px"} bgColor={"whitesmoke"}>
                <Heading fontSize={"25px"}>Description</Heading>
                <Text mt={2}>{pub.description} </Text>
              </Box>
              <Box p={5} width={"400px"} bgColor={"teal.600"}>
                <Heading fontSize={"25px"}>
                  Informations supplémentaires
                </Heading>
                <Text>
                  <b>Apport initial : </b> {pub.apportInitial}
                </Text>
                <Text>
                  <b>Nombre de salon: </b> {pub.nombreSalon}
                </Text>
                <Text>
                  <b>Nombre de Chambre : </b> {pub.nombreChambres}
                </Text>
                <Text>
                  <b>Apport initial : </b> {pub.apportInitial}
                </Text>
                <Text>
                  <b>Avantages : </b>{" "}
                  {pub.informationsadditionnelles.map((dat, ind) => {
                    return (
                      <Text key={ind} ml={20}>
                        {dat.designation}
                      </Text>
                    );
                  })}
                </Text>
              </Box>
            </Flex>
          </Center>
        </Box>
      ) : (
        <Box fontFamily={"-apple-system"}>
          <NavbarCo />
          <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, teal.400, teal.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              Publication Inexistante
            </Text>
            <Text color={"gray.500"} mb={6}>
              La publication que vous essayez de consulter est inexistante.
            </Text>
         
            <Button
              as={Link}
              href="/"
              colorScheme="teal"
              bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
              color="white"
              variant="solid"
            >
              Accueil
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

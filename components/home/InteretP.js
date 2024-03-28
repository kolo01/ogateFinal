import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Img,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MdMessage, MdSaveAlt } from "react-icons/md";
import { PiShareBold } from "react-icons/pi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import secureLocalStorage from "react-secure-storage";

export default function InteretP(
  {
  idM,
  propio,
  date,
  message,
  image,
  appart,
  doc,
  init,
  prix,
  periodicite,
  ville,
  piece,
  chambre,
  salon,
  like,
  comment,
  isliked,
  isInteressed,
  isFav,
  favoris,
}
) {
  const Imaged = [
    "./images/P1.jpeg",
    "./images/P2.jpeg",
    "./images/P3.jpeg",
    "./images/p4.jpeg",
  ];
  const [commented, setCommented] = useState("");
  const [commentaire, setCommentaire] = useState(0);
  const [likes, setLikes] = useState(isliked);
  const [share, setShare] = useState();
  const [interessed, setInteressed] = useState(isInteressed);
  const [follow, setFollow] = useState(isFav);
  const toast = useToast();

  const [token, setToken] = useState("");
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  //fin des declarations

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `http://185.98.139.246:9090/ogatemanagement-api/client/recherchercommentairesparpublication/${idM}`,
        { page: 0, taille: 10, publicationId: idM },
        config
      )
      .then((response) => {
        console.log("responseeee", response.data.donnee.publications);
      })
      .catch((error) => {});

    setLikes(isliked);
    setInteressed(isInteressed);
    setFollow(isFav);
  }, [token, idM, like, follow, interessed, isliked, isInteressed, isFav]);

  const liked = async (id) => {
    axios
      .post(
        `http://185.98.139.246:9090/ogatemanagement-api/client/likerpublication/${id}`,
        { "publicationId ": id },
        config
      )
      .then((response) => {
        // toast({title:"Succès",duration:9000,status:"success",description:response.data.donnee})
      })
      .catch((error) => {});
  };

  const Favoris = async (id) => {
    axios
      .post(
        `http://185.98.139.246:9090/ogatemanagement-api/client/enregistrerfavoris/${id}`,
        { "publicationId ": id },
        config
      )
      .then((response) => {
        // toast({title:"Succès, favoris ajouté",duration:9000,status:"success",description:response.data.donnee})
        // ,
        setFollow(isFav);
      })
      .catch((error) => {});
  };

  const Interesse = async (id) => {
    axios
      .post(
        `http://185.98.139.246:9090/ogatemanagement-api/client/interesse/${id}`,
        { "publicationId ": id },
        config
      )
      .then((response) => {
        toast({
          title: "Succès, favoris ajouté",
          duration: 9000,
          status: "success",
          description: response.data.donnee,
        }),
          setInteressed(isInteressed);
      })
      .catch((error) => {});
  };

  const Comment = async (id) => {
    axios
      .post(
        `http://185.98.139.246:9090/ogatemanagement-api/client/enregistrercommentaire`,
        { "publicationId ": id, message: commented },
        config
      )
      .then((response) => {
        toast({
          title: "Succès",
          duration: 9000,
          status: "success",
          description: response.data.donnee,
        }),
          setCommented(""),
          onClose(),
          setCommentaire(commentaire + 1);
      })
      .catch((error) => {});
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const HandleDrawner = () => {
    onOpen();
  };
  return (
    <>
      <Box
      fontSize={"16px"} fontFamily={"-apple-system"}
        width={{ base: "full", lg: "342px" }}
        height={"fit-content"}
        py={5}
        position={'relative'}
        mb={5}
        color={"black"}
        bgColor={"white"}
        borderRadius={"2%"}
        overflow={"visible"}
        transition={"all 83ms"}
        boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
        p={2}
      >
        <Box
          width={"full"}
          // bgImage={image}
          // bgColor={"gray"}
          height={{ base: "400", lg: "342px" }}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
        >
          <Carousel
            interval={5000}
            showThumbs={false}
            showIndicators={false}
            autoPlay
            infiniteLoop
          >
            {image.map((images, index) => (
             
              <Image  key={index} width={'full'} height={{ base: "400", lg: "342px" }} src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${images.id}`} alt={images.id}/>
            ))}
          </Carousel>
        </Box>
        <Flex justifyContent={"space-between"}>
          <Flex mt={2} mb={2}>
            <Avatar />
            <Box ml={2} mt={2}>
              <Text fontWeight={700} noOfLines={1}  fontSize={'16px'} fontFamily={"-apple-system"}>
                {propio}
              </Text>

              <Text fontWeight={"hairline"} noOfLines={1}  fontSize={'14px'} fontFamily={"-apple-system"}>
                {date}
              </Text>
              {/* <Text fontWeight={"hairline"} color={"#D9D9D9"} fontSize={"12px"}>
                {"date"}
              </Text> */}
            </Box>
          </Flex>
          {interessed ? (
            <Button
              onClick={() => {
                Interesse(idM);
              }}
              bgColor={"white"}
              color={"#219EF9"}
              _hover={{
                bgColor: "white",
              }}
            >
              Désintéresser
            </Button>
          ) : (
            <Button
              onClick={() => {
                Interesse(idM);
              }}
              bgColor={"white"}
              color={"#219EF9"}
              _hover={{
                bgColor: "white",
              }}
            >
              intéresser
            </Button>
          )}
        </Flex>
        <Flex>
          <Box>
            <Text   noOfLines={1} fontSize={'16px'} fontFamily={"-apple-system"}>
              {appart.designation},{ville}
            </Text>
            {message.length > 5 ? (
              <Text noOfLines={1} fontSize={'16px'} fontFamily={"-apple-system"} mb={5}>
                {message}
              </Text>
            ) : (
              <></>
            )}

           
          </Box>
        </Flex>

        {/* LES BUTTONS SOUS LA PUB */}
        <Flex
          width={"full"}
          height={"36px"}
          mt={2}
          pb={5}
          justifyContent={"space-between"}
          borderTop={"1px solid black"}
        >
          <Flex cursor={"pointer"} mr={2} mt={3} onClick={() => liked(idM)}>
            {like}
            {likes ? (
              <Image
                alt="like"
                color={"red"}
                src="./images/like-icon.svg"
                width={30}
                height={30}
                mt={-2}
                ml={2}
              />
            ) : (
              <Image
                width={30}
                height={30}
                mt={-2}
                ml={2}
                src="./images/liked.png"
                alt="not_liked"
              />
            )}
          </Flex>
          <Flex cursor={"pointer"} mr={2}  mt={2}>
            {commentaire}
            <MdMessage onClick={onOpen} size={30} />
          </Flex>
          <Flex cursor={"pointer"} mr={2}   mt={[1,1,1,2,2]}>
            0<PiShareBold size={30} />
          </Flex>
          <Flex cursor={"pointer"} mr={2}  mt={[1,1,1,2,2]} onClick={() => Favoris(idM)}>
            {favoris}{" "}
            {follow ? (
              <FcLike color="blue" colorRendering={"blue"} size={30} />
            ) : (
              <FcLikePlaceholder size={30}></FcLikePlaceholder>
            )}
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Commenter la publication de {propio} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2} fontWeight={600}>
              Message :{" "}
            </Text>
            <Textarea
              placeholder="Commentaires"
              onChange={(e) => setCommented(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={commented.length < 2}
              onClick={() => Comment(idM)}
            >
              Publier
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

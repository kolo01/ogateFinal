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
  Badge,
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

export default function Mespub(
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
  dispo
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
  const [Dispo, setDispo] = useState(dispo);
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

  const changerEtat = async (etat) =>
  {
      await axios.post(`http://185.98.139.246:9090/ogatemanagement-api/client/modifierdisponibilitepublication/${idM}?disponibilite=${etat}`,{
        publicationId:idM,
        disponibilite:etat
      },config).then((res)=>{setDispo(etat),toast({title:"Succès",duration:9000,status:"success",description:res.data.donnee})}).catch((err)=>{toast({title:"Erreur",duration:9000,status:"error",description:err.response.data.donnee})})
  }





  return (
    <>
      <Box
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
        fontSize={"16px"} fontFamily={"-apple-system"}
        p={2}
      >
        <Box
          width={"full"}
          // bgImage={image}
          // bgColor={"gray"}
          height={"fit-content"}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
        >
          {Dispo == "DISPONIBLE" ? <Badge colorScheme='green'>{Dispo}</Badge> : <Badge  colorScheme='red'>{Dispo}</Badge>}
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
            {/* <Avatar /> */}
            <Flex  >
              <Text mr={20} noOfLines={1}  fontSize={'16px'} fontFamily={"-apple-system"}>
                {propio}
              </Text>

              <Text noOfLines={1}  fontSize={'14px'} fontFamily={"-apple-system"}>
                {date}
              </Text>
              {/* <Text fontWeight={"hairline"} color={"#D9D9D9"} fontSize={"12px"}>
                {"date"}
              </Text> */}
            </Flex >
          </Flex>
          
        </Flex>
        <Flex>
          <Box>
            <Text noOfLines={1}  fontSize={'16px'} fontFamily={"-apple-system"}>
              {appart.designation},{ville}
            </Text>
            {message.length > 3 ? (
              <Text   fontSize={'16px'} fontFamily={"-apple-system"} mb={5}>
                {message}
              </Text>
            ) : (
              <></>
            )}

           
          </Box>
        </Flex>
             {Dispo == "DISPONIBLE"? <Button bgColor={"red"} width={"full"} color={"white"} onClick={()=>changerEtat("INDISPONIBLE")}> MARQUER INDISPONIBLE</Button> : <Button bgColor={"green"}  onClick={()=>changerEtat("DISPONIBLE")} width={"full"} color={"white"} > MARQUER DISPONIBLE</Button>} 
      </Box>

    
      
    </>
  );
}

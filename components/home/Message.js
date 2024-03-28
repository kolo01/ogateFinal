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
  Link,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MdMessage, MdOutlineMessage, MdSaveAlt } from "react-icons/md";
import { PiHeart, PiShareBold, PiSwap, PiSwapFill } from "react-icons/pi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import secureLocalStorage from "react-secure-storage";

import PhotoAlbum from "react-photo-album";
import Images from "./Affichages/Images";
import { IoMdSend } from "react-icons/io";

export default function Messages({
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
  all,
}) {
  const [commented, setCommented] = useState("");
  const [commentaire, setCommentaire] = useState(0);
  const [likes, setLikes] = useState(isliked);
  const [images, setImages] = useState([]);
  const [iLength, setILength] = useState(0);
  const [typed, setTyped] = useState("");
  const [interessed, setInteressed] = useState(isInteressed);
  const [follow, setFollow] = useState(isFav);
  const toast = useToast();

  const [token, setToken] = useState("");
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  //fin des declarations


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
        // setFollow(!isFav);
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

  const [index, setIndex] = useState(-1);



  useEffect(() => {
    if (image.length > 0) {
      if (image.length > 5) {
        setILength(image.length);
      } else {
        setILength(5);
      }
      setTyped(image[0].typeFichier);
    } else {
      setTyped("IMAGES");
    }

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


    
  }, [
    token,
    idM,
    like,
    follow,
    interessed,
    isliked,
    isInteressed,
    isFav,
    all,
    image,
  ]);



  return (
    <>
      <Box
      fontSize={'16px'} fontFamily={"-apple-system"}
        width={{ base: "full", lg: "555px" }}
        height={"fit-content"}
        py={5}
        my={5}
        color={"black"}
        bgColor={"white"}
        borderRadius={"2%"}
        overflow={"visible"}
        transition={"all 83ms"}
        boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
        p={2}
      >
        <Flex justifyContent={"space-between"} >
          <Flex mt={2} mb={2}>
            <Avatar />
            <Box ml={2} mt={2}>
              <Text fontWeight={700} fontSize={"16px"}>
                {propio}
              </Text>

              <Text fontWeight={"hairline"} fontSize={"14px"}>
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
            <Text >
              {appart.designation},{ville}
            </Text>
            {message.length > 5 ? (
              <Text   mb={5}>
                {message}
              </Text>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
        <Box
           width={{ base: "390px", lg: "555px" }}
         
          height={"400px"}
        
          
        >
          {typed == "IMAGE" ? (
           <>
           <Box onClick={onOpen} cursor={'pointer'} width={"95%"}>
              <Images images={image} />
              </Box>
              <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} >
              <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody display={"flex"} px={0} py={0} >
          <Box width={"50%"} height={"2xl"}  bgColor={"black"} >
                  <Carousel
                  showArrows={true}
                    interval={5000}
                    showThumbs={false}
                    showIndicators={false}
                    autoPlay
                    infiniteLoop
                  >
                   
                    {image.map((images, index) => (
                      <Image
                      px={5}
                      alt={`${images.nom}`}
                      mt={10}
                        key={index}
                        width={"full"}
                        height={"xl"}
                        src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${images.id}`}
                      />
                    ))}
                    
                  </Carousel>
                </Box>
                <Box width={"50%"}  bgColor={"white"}  overflowY={"auto"}>
                <Flex ml={5} justifyContent={"space-between"}>
          <Flex mt={2} mb={2}>
            {/* <Avatar /> */}
            <Box>
              <Text fontWeight={700}  fontSize={'16px'} fontFamily={"-apple-system"}>
                {propio}
              </Text>

              <Text fontWeight={"hairline"}  fontSize={'14px'} fontFamily={"-apple-system"}>
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
        <Flex  ml={5}   fontSize={'16px'} fontFamily={"-apple-system"}>
          <Box>
            <Text >
              {appart.designation},{ville}
            </Text>
            {message.length > 5 ? (
              <Text   fontSize={'16px'} fontFamily={"-apple-system"}  mb={5}>
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
          mb={5}
          pb={10}
          justifyContent={"space-between"}
          borderTop={"0.025em solid gray"}
        >
          <Flex cursor={"pointer"} mr={2} mt={3} onClick={() => liked(idM)}>
           
            {likes ? (
              <Box ml={5} onClick={()=>setLikes(!likes)}>
<Box >
              <Image
                alt="like"
                color={"red"}
                src="./images/like-icon.svg"
                width={"20px"}
                height={"20px"}
                mt={-2}
                ml={2}
              />
              </Box>
              <Text>J{`'`}aime</Text>
              </Box>
            ) : (
            <Box ml={5} onClick={()=>setLikes(!likes)}>
<Box >
              <Image
                 width={"20px"}
                 height={"20px"}
                mt={-2}
                ml={2}
                src="./images/liked.png"
                alt="not_liked"
              />
               </Box>
               <Text>J{`'`}aime</Text>
              </Box>
            )}
          </Flex>
          <Box cursor={"pointer"} mr={2} mt={2}>
            <Center>
           <Box >
            <MdOutlineMessage size={20} />
            </Box>
            </Center>
            <Text>Commentaires</Text>
          </Box>
          <Box cursor={"pointer"} mr={2} mt={[1, 1, 1, 2, 2]}>
            <Center>
            <Box>
            <PiShareBold size={20}  />
            </Box>
            </Center>
            <Text>Partager</Text>
          </Box>
          <Flex
            cursor={"pointer"}
            mr={2}
            mt={[1, 1, 1, 2, 2]}
            onClick={() => Favoris(idM)}
          >
           
            {follow ? (
              <Box>
                <Box ml={3}>
                 <FcLike color="blue" colorRendering={"blue"} size={20} />
                 </Box>
                 <Text>Favoris</Text>
              </Box>
             
            ) : (
              <Box>
<Box ml={3}>
              <PiHeart size={20}></PiHeart>
             </Box>
              <Text>Favoris</Text>
              </Box>
            )}
          </Flex>
        </Flex>
        <Flex mt={10} mx={5}>
          <Avatar/>
          <InputGroup ml={2}>
          <InputRightElement mt={2}><IoMdSend fontSize={'20px'}/></InputRightElement>
          <Input height={10}  placeholder="Commenter" borderRadius={'full'} mt={2}/>
          </InputGroup>
              
        </Flex>
        <Box mt={5}>
          <Center>
            <Text fontSize={'16px'} fontFamily={"system-ui"}>Aucun commentaire</Text>
          </Center>
        </Box>
                </Box>
                
          </ModalBody>

        
        </ModalContent>
               
              </Modal>
              </>
          ) : typed == "VIDEO" ? (
            <Carousel
              interval={5000}
              showStatus={false}
              showThumbs={false}
              showIndicators={false}
              autoPlay
              infiniteLoop
            >
              {image.map((images, index) => (
                <video controls width={"545px"} height={"312px"}  key={index}>
                  <source
                    src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${images.id}`}
                  />
                </video>
              ))}
            </Carousel>
          ) : (
            <Carousel
              interval={5000}
              showThumbs={false}
              showIndicators={false}
              infiniteLoop
              showStatus={false}
            >
              {image.map((images, index) => (
                <Link
                  download={true}
                  key={index}
                  width={"200px"}
                  height={"400px"}
                  href={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${images.id}`}
                  alt={images.id}
                >
                  
                    <b>Telecharger {images.nom} </b>
              
                  {/* <div style={{overflow:'scroll',height:600}}>
            <MobilePDFReader url="http://localhost:3000/test.pdf"/>
           </div> */}
                </Link>
              ))}
            </Carousel>
          )}
        </Box>

        {/* LES BUTTONS SOUS LA PUB */}
           <Flex justifyContent={"space-between"}  width={{ base: "390px", lg: "545px" }} fontSize={"12px"} color={"gray"}>
            <Flex>
            
            <Image
                alt="like"
                color={"red"}
                src="./images/like-icon.svg"
                width={5}
                height={5}
              
                mx={2}
              /> 
              <Text>{like} personnes </Text>
              </Flex>
              <Flex>
             <Text>     {commentaire} Commentaires </Text>
             <Text fontSize={"25px"} mt={-4} mx={2}>.</Text>
             <Text>     {favoris} Reactionns </Text>
           
             
              </Flex>
              
           </Flex>




        <Flex
          width={"full"}
          height={"36px"}
          mt={2}
          pb={5}
          justifyContent={"space-between"}
          borderTop={"0.025em solid gray"}
        >
          <Flex cursor={"pointer"} mr={2} mt={3} onClick={() => liked(idM)}>
            
            {likes ? (
              <Flex px={2} onClick={()=>setLikes(!likes)}>
                  <Image
                alt="like"
                color={"red"}
                src="./images/like-icon.svg"
                width={"20px"}
                height={"20px"}
                mt={-2}
                mx={2}
              /> <Text mt={-2}  color={'#6a6a6a'} fontSize={"15px"}>J{`'`}aime</Text>
              </Flex>
            
            ) : (
              <Flex pX={2}  onClick={()=>setLikes(!likes)}>

             
              <Image
                width={"20px"}
                height={"20px"}
                mt={-2}
                mx={2}
                src="./images/liked.png"
                alt="not_liked"
              /><Text mt={-2}  color={'#6a6a6a'} fontSize={"15px"}>J{`'`}aime</Text>
               </Flex>
            )}
          </Flex>
          <Flex cursor={"pointer"}  mt={2} pX={2}>
     
            <MdOutlineMessage onClick={onOpen} size={20} />
            <Text ml={2} mt={-1} color={'#6a6a6a'} fontSize={"15px"}  fontWeight={500}>Commenter</Text>
          </Flex>
          <Flex cursor={"pointer"}  mt={[1, 1, 1, 2, 2]} px={2}>
            <PiSwapFill size={20}  />
            <Text ml={2} mt={-1} color={'#6a6a6a'} fontSize={"15px"}>Republier</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            pX={2}
            mt={[1, 1, 1, 2, 2]}
            onClick={() => Favoris(idM)}
          >
            {/* {console.log(follow,"follow")} */}
            {follow ? (
              <Flex onClick={()=>setFollow(!follow) }>
              <FcLike   size={20} />
              <Text ml={2}  color={'#6a6a6a'} fontSize={"15px"}>Favoris</Text>
              </Flex>
            ) : (
            <Flex onClick={()=>setFollow(!follow)}>
              <PiHeart size={20}></PiHeart>
              <Text ml={2} mt={-1} color={'#6a6a6a'} fontSize={"15px"}>Favoris</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
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
      </Modal> */}
    </>
  );
}

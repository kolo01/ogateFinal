import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Box,
  Text,
  Input,
  Flex,
  Select,
  useDisclosure,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Dernier() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //variable globale
  const [fields, setFields] = useState([{ id: 1, fileType: 'IMAGE', selectedFile: null }]);
  const toast = useToast();
  const router = useRouter();

  //fin des variables globales

  const [token, setToken] = useState("");
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  //fin des declarations



 

  ///variable pour Post
  const [TypePoste, setTypePoste] = useState("");
  const [checkedD, setCheckedD] = useState([]); //utiliser pour recuperer les documents cochés
  const [checkedB, setCheckedB] = useState([]); //utiliser pour recuperer les info additionelles sur les biens cochés
  const [checkedQ, setCheckedQ] = useState([]); //utiliser pour recuperer les info addictionnelle sur le quartier cochés
  const [nbPiece, SetNbPiece] = useState(0);
  const [nbChambre, SetNbChambre] = useState(0);
  const [nbSbain, SetNbSbain] = useState(0);
  const [nbSalon, SetNbSalon] = useState(0);
  const [prix, SetPrix] = useState(0);
  const [periodicite, SetPeriodicite] = useState("JOUR");
  const [apportInit, SetApportInit] = useState(0);
  const [doctype, SetDoctype] = useState([""]);
 
  
  const [fichiers, setFichiers] = useState([]); //utiliser pour recuperer les images dans post et Besoin
  const [fichiersId, setFichiersId] = useState([]); //utiliser pour recuperer les id dans la bd
  const [OtherB, setOtherB] = useState("");
  const [OtherQ, setOtherQ] = useState("");

  const [lat, setLat] = useState(0);
  const [load, setLoad] = useState(false);
  const [long, setLong] = useState(0);
  const [ville, setVille] = useState("none");
  const [desc, setDesc] = useState("none");

  const [StypeBien, setStypeBien] = useState(0);
  const [meuble, setMeuble] = useState("NON_MEUBLE");
  //fin des declarations
  const [displayed1, setDisplayed1] = useState("block");
  const [displayed2, setDisplayed2] = useState("none");

  //variable pour Besoin
  //fin des declarations

  //Fonction d'envoi basé sur le modele

  const HandleMedia = (fields) => {
    try {
      var tester =0;
      fields.map((data,index)=>{
        
        const total = data.selectedFile.length;
        
        Object.values(data.selectedFile).map(async (dats, index) => {
          console.log(dats)
          console.log(data.fileType)
    
            let formdata = new FormData();
            formdata.append("fichier", dats);
            formdata.append("typeFichier", data.fileType);
            await axios.post(
                "http://185.98.139.246:9090/ogatemanagement-api/ajouterfichier",
                formdata,
                config
              )
              .then((response) => {
                tester = tester+1
              
                if (tester == total) {
                  setDisplayed1("none");
                setDisplayed2("block");
                }
                  fichiersId.push(response.data.donnee.id);
              }).catch((error)=>{})
        
        });




      })
     console.log("fichiersID",fichiersId)
    } catch (error) {
      console.log(error)
      setDisplayed1("none");
      setDisplayed2("block");
    }0
   
   
  };

  const SavePost = async () => {
    // HandleMedia(doctype, fichiers)
    await axios
      .post(
        "http://185.98.139.246:9090/ogatemanagement-api/client/enregistrerpublicationaveclistefichier",
        {
          apportInitial: JSON.parse(sessionStorage.getItem("Apport"))?? 0,
          autreInfoSurBien: JSON.parse(sessionStorage.getItem("OAddBien")) ?? "" ,
          autreInfoSurQuartier: JSON.parse(sessionStorage.getItem("OAddQuart")) ?? "",
          description: desc,
          fichierIds: fichiersId ?? [] ,

          informationAdditionnelleSurBienIds: JSON.parse(
            sessionStorage.getItem("IAddBien")
          )?? [null],
          informationAdditionnelleSurQuartierIds: JSON.parse(
            sessionStorage.getItem("IAddQuart")
          ) ?? [null],
          latitude: lat?? 0,
          localisation: ville ?? "Generalite",
          longitude: long?? 0,
          nombreChambres: JSON.parse(sessionStorage.getItem("NChambre"))??0,
          nombrePieces: JSON.parse(sessionStorage.getItem("NPieces"))??0,
          nombreSalon: JSON.parse(sessionStorage.getItem("NSalon"))??0,
          periodicite: JSON.parse(sessionStorage.getItem("Periodicite"))??"JOUR",
          prix: JSON.parse(sessionStorage.getItem("Prix"))??0,
          typeAppartement: JSON.parse(sessionStorage.getItem("meuble"))??"NON_MEUBLE",
          typeBienId: JSON.parse(sessionStorage.getItem("typeBien"))??0,
          typeDocumentIds: JSON.parse(sessionStorage.getItem("typeDocument"))??[null],
          typeFichier: "DOCUMENT",
          typePost: JSON.parse(sessionStorage.getItem("typePoste")),
          typeRequete: "EXPRESSION_BESOIN",
        },
        config
      )
      .then((response) => {
        toast({
          title: "Poste Sauvegardé",
          status: "success",
          description: "votre poste à bien été enregistré",
          duration: 7000,
        });
        router.reload()
      })
      // .catch((error) => {
      //   console.log(error),
      //     toast({
      //       title: "Erreur lors de l'enregistrement",
      //       status: "error",
      //       description: "Veuillez réesayer svp!!!",
      //       duration: 7000,
      //     });
      // })
      ;
  };



 

  const handleAddField = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId, fileType: 'IMAGE', selectedFile: null }]);
 
  };

  const handleRemoveFields = (id) => {
    if (fields.length === 1) return; // Ne supprime pas le dernier champ
    const updatedFields = fields.filter(field => field.id !== id);
    setFields(updatedFields);
  
  };


  const getFileAcceptType = (fileType) => {
    switch (fileType) {
      case 'IMAGE':
        return 'image/*';
      case 'DOCUMENT':
        return ".doc,.docx,.pdf,.ods,.odt,.odf";
      case 'VIDEO':
        return 'video/*';
      default:
        return '';
    }
  };


  const handleFileTypeChange = (event, id) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, fileType: event.target.value };
      }
      return field;
    });
    setFields(updatedFields);
    console.log(fields)
  };

  const handleFileChange = (event, id) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, selectedFile: event.target.files };
      }
      return field;
    });
    setFields(updatedFields);
    console.log(fields)
  };









  
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);

    //Recuperation de la liste des type de bien
  }, [token]);
  return (
    <Box Box   fontSize={'16px'} fontFamily={"-apple-system"}>
      <Button colorScheme="blue" mr={3} onClick={onOpen}>
        Suivant
      </Button>
      <Modal isOpen={isOpen} size={"5xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width={"full"}
          bgColor={"#e3f7f2"}
          ml={3}
          fontSize={["10px", "10px", "10px", "15px", "15px"]}
        >
          <ModalHeader>Generalité et Document(s)</ModalHeader>
          <ModalCloseButton />
          <ModalBody width={"100%"}>
            <SimpleGrid columns={[1, 1, 1, 2, 2]} spacingX={20} mb={20}>
            {fields.map(field => (
        < >

<Box key={field.id} width={"300px"} mt={2}>
                <Text fontWeight={600}>Type de Fichier</Text>
                <Select
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  onChange={(e) => {
                    handleFileTypeChange(e,field.id);
                  }}
                >
                  <option value={"IMAGE"}>IMAGE</option>
                  <option value={"DOCUMENT"}>DOCUMENT</option>
                  <option value={"VIDEO"}>VIDEO</option>
                </Select>
              </Box>
          {field.fileType && (
           <Box width={"390px"} mt={2}>
           <Text fontWeight={600}>Fichier(s)</Text>
           <Flex>
           <Input
             border={"2px solid gray"}
             _placeholder={{
               color: "cyan.700",
             }}
             type="file"
             accept={getFileAcceptType(field.fileType)}
             multiple={true}
             onChange={(e) => handleFileChange(e,field.id)}
           />
 {field.id == 1 ? (
          
          <Button ml={10} bgColor={"#00ffef"}textAlign={'center'} fontSize={"20px"} onClick={handleAddField} borderRadius={"full"}>+</Button>
            
         ):<Button ml={10} bgColor={"#00ffef"}textAlign={'center'} fontSize={"20px"} onClick={() => handleRemoveFields(field.id)} borderRadius={"full"}>-</Button>}
           
           </Flex>
         </Box>
          )}
        
       
        </>
       
      ))}
      {/* <
              {/* <Box width={"300px"} mt={2}>
                <Text fontWeight={600}>Type de Fichier</Text>
                <Select
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  onChange={(e) => {
                    handleDocType(0,e.target.value);
                  }}
                >
                  <option value={"IMAGE"}>IMAGE</option>
                  <option value={"DOCUMENT"}>DOCUMENT</option>
                  <option value={"VIDEO"}>VIDEO</option>
                </Select>
              </Box>
              <Box width={"390px"} mt={2}>
                <Text fontWeight={600}>Fichier(s)</Text>
                <Flex>
                <Input
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  type="file"
                  accept={getFileAcceptType(field.fileType)}
                  multiple={true}
                  onChange={(e) => setFichiers([e.target.files])}
                />

                <Button ml={10} bgColor={"#00ffef"}textAlign={'center'} fontSize={"20px"} onClick={()=>addPoint()} borderRadius={"full"}>+</Button>
                </Flex>
              </Box>
              {accepted.length>1? accepted.map((data,index)=>(
                <>
               <Box key={index} width={"300px"} mt={2}>
                <Text fontWeight={600}>Type de Fichier</Text>
                <Select
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  onChange={(e) => {
                    handleDocType(index,e.target.value);
                  }}
                >
                  <option value={"IMAGE"}>IMAGE</option>
                  <option value={"DOCUMENT"}>DOCUMENT</option>
                  <option value={"VIDEO"}>VIDEO</option>
                </Select>
              </Box>
              <Box width={"390px"} mt={2}>
                <Text fontWeight={600}>Fichier(s)</Text>
                <Flex>
                <Input
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  type="file"
                  accept={`${data}`}
                  multiple={true}
                  onChange={(e) => setFichiers(index,[e.target.files])}
                />

                <Button ml={10} bgColor={"#00ffef"}textAlign={'center'} fontSize={"20px"}onClick={removePoint(index)} borderRadius={"full"}>-</Button>
                </Flex>
              </Box>
                </> 
              ))  :<></>} */}
              <Box width={"300px"} mt={2}>
                <Text fontWeight={600}>Localisation</Text>
                <Input
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  type="text"
                  placeholder=" Localisation"
                  onChange={(e) => {
                    setVille(e.target.value);
                  }}
                />
              </Box>
              <Box width={"300px"} mt={2}>
                <Text fontWeight={600}>Latitude</Text>
                <Input
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  type="number"
                  placeholder="latitude"
                  onChange={(e) => setLat(e.target.valueAsNumber)}
                />
              </Box>
              <Box width={"300px"} mt={2}>
                <Text fontWeight={600}>Longitude</Text>
                <Input
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  type="number"
                  placeholder="Longitude"
                  onChange={(e) => setLong(e.target.valueAsNumber)}
                />
              </Box>

              <Box>
                <Text fontWeight={600}>Description</Text>
                <Textarea
                placeholder="Belle demeure en bord de mer"
                  border={"2px solid gray"}
                  _placeholder={{
                    color: "cyan.700",
                  }}
                  width={"90%"}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  height={"150px"}
                />
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button
            isLoading={load}
              colorScheme="blue"
              mr={3}
              display={displayed1}
              onClick={() => {
                HandleMedia(fields);
                setLoad(true)
              }}
            >
              Terminer
            </Button>
            <Button
          
              colorScheme="green"
              display={displayed2}
              mr={3}
              onClick={() => {
                SavePost();
              }}
            >
              Confirmer
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Revenir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

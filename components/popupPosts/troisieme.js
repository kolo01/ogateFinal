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
    Checkbox,
    Textarea,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
import Dernier from "./quatrieme";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import {Select as Sl} from "react-dropdown-select";


  export default function Troisieme() {
   //variable globale

   const [checkedD,setCheckedD] = useState([])//utiliser pour recuperer les documents cochés
   const [checkedB,setCheckedB] = useState([])//utiliser pour recuperer les info additionelles sur les biens cochés
   const [checkedQ,setCheckedQ] = useState([])//utiliser pour recuperer les info addictionnelle sur le quartier cochés
   //fin des variables globales
 

   const [token, setToken] = useState("");
   let config = {
     headers: { Authorization: `Bearer ${token}` },
   };
   //variable pour texte

 
 
 
 
 
   ///Fonction des checkbox
  
 
   const CheckedBien = (index,valeur,bool)=>{
     
     if(bool == true){
       checkedB[index] = valeur
      
           }else{
             checkedB[index] = ""
           }
         }
 const CheckedQuartier = (index,valeur,bool)=>{
   if(bool == true){
checkedQ[index] = valeur

   }else{
     checkedQ[index] = ""
   }
     
 }
   ///fin des declarations
 
 ///Variable de recuperation des champs dans la base de donnée

 const [documentId, setDocumentId] = useState([]);
 const [quartierId, setQuartierId] = useState([]);
 const [bienId, setBienId] = useState([]);


 ///Fin de la recuperation



   ///variable pour Post


 //utiliser pour recuperer les id dans la bd
   const [OtherB,setOtherB] = useState("")
   const [OtherQ,setOtherQ] = useState("")
 
   
   const [StypeBien, setStypeBien] = useState(0);
   const [meuble, setMeuble] = useState("NON DEFINI");
   //fin des declarations
 
   //variable pour Besoin
   //fin des declarations
   useEffect(() => {
     setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);
 
     let config = {
       headers: { Authorization: `Bearer ${token}` },
     };
     //Recuperation de la liste des type de bien
    
     ///Recuperation des types de document
     axios
       .get(
         "http://185.98.139.246:9090/ogatemanagement-api/rechercherlistestypetypedocuments",
         config
       )
       .then((response) => setDocumentId(response.data.donnee))
       .catch((error) => {});
 
 
 
       //Info addition sur le bien
          
       axios.get('http://185.98.139.246:9090/ogatemanagement-api/rechercherlisteinformationsadditionnellessurbien',config).then((response)=>{setBienId(response.data.donnee),console.log(response.data.donneex)}).catch((error)=>{
        
     })
 
     ///info addition sur le quartier
     axios.get('http://185.98.139.246:9090/ogatemanagement-api/rechercherlisteinformationsadditionnellessurquartier',config).then((response)=>setQuartierId(response.data.donnee)).catch((error)=>{
         
     })
 
   }, [token]);
      //fin des declarations



      const handleSubmit = () =>{
        sessionStorage.setItem("IAddBien",JSON.stringify(checkedB))
        sessionStorage.setItem("OAddBien",JSON.stringify(OtherB))
        sessionStorage.setItem("IAddQuart",JSON.stringify((checkedQ)))
        sessionStorage.setItem("OAddQuart",JSON.stringify(OtherQ))
      }
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box   fontSize={'16px'} fontFamily={"-apple-system"}>
        <Button colorScheme="blue" mr={3} onClick={onOpen}>
          Suivant
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} >
          <ModalOverlay />
          <ModalContent bgColor={"#f0f1f2"} width={"full"} height={"fit-content"} pb={"40px"} ml={3} fontSize={["10px","10px","10px","15px","15px"]}>
            <ModalHeader>Informations additionelles</ModalHeader>
            <ModalCloseButton />
            <ModalBody width={"100%"}>
            <SimpleGrid columns={[1,1,1,2,2]} mb={20} spacingY={10}>
   
    
   <Box width={"300px"} ml={2} mt={2}>
         <Text  fontWeight={600}>Information additionnelle sur le bien</Text>
         <Box height={"fit-content"}  >
             
     
<Sl    multi={true}   options={bienId} labelField="designation" valueField="id"  />
    

         </Box>
         </Box>
         <Box  width={"300px"} ml={2} mt={2}>
         <Text  fontWeight={600}> Autre information sur le bien</Text>
         <Textarea  border={"2px solid gray"} onChange={(e)=>{setOtherB(e.target.value)}}></Textarea>
         </Box>
         <Box width={"300px"} ml={2} mt={2}>
         <Text  fontWeight={600}>Information additionnelle sur le quartier</Text>
         <Box height={"fit-content"}  >
             
         <Sl   multi={true}   options={quartierId} labelField="designation" valueField="id"  />

         </Box>
         </Box>
         <Box  width={"300px"} ml={2} mt={2}>
         <Text  fontWeight={600}> Autre information sur le quartier</Text>
         <Textarea border={"2px solid gray"}  onChange={(e)=>{setOtherQ(e.target.value)}}></Textarea>
         </Box>
   </SimpleGrid>
            </ModalBody>
  
            <ModalFooter>
              <Box onClick={()=>handleSubmit()}>
            <Dernier/>
            </Box>
              <Button variant="ghost" onClick={onClose}>Revenir</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
  
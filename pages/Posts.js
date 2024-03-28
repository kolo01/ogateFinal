import NavbarCo from "@/components/home/NavbarCo";
import {
    Box,
    Button,
    Center,
    Checkbox,
    CheckboxGroup,
    Flex,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    useToast,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import secureLocalStorage from "react-secure-storage";
  
  export default function PostUpdated() {
    //variable globale
    const toast = useToast();
    const router = useRouter();
  
    //fin des variables globales
  

    const [token, setToken] = useState("");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //variable pour texte
    const [text, setText] = useState("");
    //fin des declarations
  
    //variable pour Media
   
    //fin des declarations
  
  
  
  
  
    ///Fonction des checkbox
   
    const CheckedDoc = (index,valeur,bool)=>{
      
      if(bool == true){
        checkedD[index] = valeur
       
            }else{
              checkedD[index] = ""
            }
          }
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
console.log(valeur)
    }else{
      checkedQ[index] = ""
    }
      
  }
    ///fin des declarations
  
  ///Variable de recuperation des champs dans la base de donnée
  const [typebienId, setTypebienId] = useState([]);
  const [documentId, setDocumentId] = useState([]);
  const [quartierId, setQuartierId] = useState([]);
  const [bienId, setBienId] = useState([]);


  ///Fin de la recuperation



    ///variable pour Post
    const [TypePoste, setTypePoste] = useState("");
    const [checkedD,setCheckedD] = useState([])//utiliser pour recuperer les documents cochés
    const [checkedB,setCheckedB] = useState([])//utiliser pour recuperer les info additionelles sur les biens cochés
    const [checkedQ,setCheckedQ] = useState([])//utiliser pour recuperer les info addictionnelle sur le quartier cochés
    const [nbPiece,SetNbPiece] = useState(0)
    const [nbChambre,SetNbChambre] = useState(0)
    const [nbSbain,SetNbSbain] = useState(0)
    const [nbSalon,SetNbSalon] = useState(0)
    const [prix,SetPrix] = useState(0)
    const [periodicite,SetPeriodicite ] = useState("JOUR")
    const [apportInit,SetApportInit ] = useState(0)
    const [doctype, setDocType] = useState("IMAGE");
    const [accepted, setAccepted] = useState("image/*");
    const [fichiers, setFichiers] = useState([]); //utiliser pour recuperer les images dans post et Besoin
    const [fichiersId, setFichiersId] = useState([]); //utiliser pour recuperer les id dans la bd
    const [OtherB,setOtherB] = useState("")
    const [OtherQ,setOtherQ] = useState("")
    const [lat,setLat] = useState(0)
    const [long,setLong] = useState(0)
    const [ville,setVille] = useState("none")
    const [desc,setDesc] = useState("none")
    
    const [StypeBien, setStypeBien] = useState(0);
    const [meuble, setMeuble] = useState("NON DEFINI");
    //fin des declarations
  
    //variable pour Besoin
    //fin des declarations
    useEffect(() => {
      setToken(JSON.parse(localStorage.getItem("local")).data.accessToken);
      console.log("token",token)
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      //Recuperation de la liste des type de bien
      axios
        .get(
          "http://185.98.139.246:9090/ogatemanagement-api/rechercherlistetypebiens",
          config
        )
        .then((response) => setTypebienId(response.data.donnee))
        .catch((error) => {});
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
  
    //Fonction d'envoi basé sur le modele
  
    
    const HandleMedia =  (doctype,fichiers) => {
      console.log("fichiers",fichiers,doctype)
      fichiers.map(async (data,index)=>{
        
       Object.values(data).map(async (donnees,index)=>{
        let formdata = new FormData()       
        formdata.append( "fichier",donnees);
        formdata.append("typeFichier" , doctype)
        await axios.post("http://185.98.139.246:9090/ogatemanagement-api/ajouterfichier",formdata
        ,config).then((response)=>{console.log(response.data.donnee.id),fichiersId.push(response.data.donnee.id)})
        })
      })
    };

    const SavePost = ()=>{
        HandleMedia(doctype,fichiers)
       axios.post("http://185.98.139.246:9090/ogatemanagement-api/client/enregistrerpublicationaveclistefichier",{
        apportInitial: apportInit,
        autreInfoSurBien:OtherB,
        autreInfoSurQuartier: OtherQ,
        description: desc,
        fichierIds: fichiersId,
        id: 1,
        informationAdditionnelleSurBienIds:checkedB,
        informationAdditionnelleSurQuartierIds: checkedQ,
        latitude: lat,
        localisation: ville,
        longitude: long,
        nombreChambres: nbChambre,
        nombrePieces: nbPiece,
        nombreSalon: nbSalon,
        periodicite:periodicite,
        prix: prix,
        typeAppartement: meuble,
        typeBienId: parseInt(StypeBien),
        typeDocumentIds: checkedD,
        typeFichier: doctype,
        typePost: TypePoste,
        Client:JSON.parse(localStorage.getItem("local")).data.nom,
        typeRequete: "EXPRESSION_BESOIN"

       },config).then((response)=>{
        toast({
          title:"Poste Sauvegardé",status:"success",description:"votre poste à bien été enregistré",duration:7000
        })
       }).catch((error)=>{
        console.log(error),
        toast({
          title:"Erreur lors de l'enregistrement",status:"error",description:"Veuillez réesayer svp!!!",duration:7000
        })
       })
    }

    const handleDocType = (targeted)=>{
      setDocType(targeted)
      if(targeted == "VIDEO"){
        setAccepted("video/*")
      }else if(targeted == "DOCUMENT"){
        setAccepted(".doc,.docx,.pdf,.ods,.odt,.odf")
      }else(setAccepted("image/*"))
    }
  
    return (
      <>
      <NavbarCo/>
      <Box mt={2} mb={20} fontFamily={"-apple-system"}>
         <Box  mx={10} >
        
  
        
  <SimpleGrid columns={[1,1,1,2,3]} mt={5} ml={2} pb={10} >
    <Box>
    <Text width={"90%"} height={"fit-content"} fontWeight={700} fontSize={["inherit","inherit","inherit","20px","25px"]} borderBottom={"2px solid black"}>Informations de base</Text>
    <SimpleGrid columns={[1,1,2,2,2]} mt={2}>
    <Box ml={5} width={"50%"}>
      <Text>Type de postes</Text>
      <Select onChange={(e) => setTypePoste(e.target.value)}>
        <option value={"INFORMATION"}>INFORMATION</option>
        <option value={"VENTE"}>VENTE</option>
        <option value={"LOCATION"}>LOCATION</option>
        
        <option value={"MEDIA"}>MEDIA</option>
      </Select>
    </Box>
    <Box ml={5} width={"50%"}>
      <Box>
        <Text>Type de bien</Text>
        <Select onChange={(e) => setStypeBien(e.target.value)}>
          {typebienId.map((data, index) => (
            <option key={index}  onClick={()=>console.log(typeof(StypeBien))} value={parseInt(index+1)}>
              {data.designation}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
    {parseInt(StypeBien) > 0 ? (
      <>
        {StypeBien == "1" || StypeBien == "2" ? (
          <Box ml={5} mt={2}>
            <Text>Meublé?</Text>
            <RadioGroup onChange={(e) => setMeuble(e)}>
              <Radio value="MEUBLE" mr={5}>
                OUI
              </Radio>
              <Radio value="NON-MEUBLE">NON</Radio>
            </RadioGroup>
          </Box>
        ) : (
          <></>
        )}
      </>
    ) : (
      <></>
    )}
    <Box ml={5} mt={2}>
          <Text  fontWeight={600}>Type de document</Text>
          <Box height={"fit-content"}  py={2} px={4}>
              
      
<Box width={"70%"} mt={1} spacing={2} mx={4}>
  <CheckboxGroup>
      {documentId.map((data,index)=><Checkbox mr={2} key={index}
  //   isChecked={checkedItems[index]}
    onChange={(e) => {CheckedDoc(index,data.id,e.target.checked)}}
  >
    {data.designation}
  </Checkbox>)}
  </CheckboxGroup>
</Box >
          </Box>
          </Box>
    </SimpleGrid>
    </Box>
    <Box>
    <Text width={"90%"} height={"fit-content"} fontWeight={700} fontSize={["inherit","inherit","inherit","20px","25px"]} borderBottom={"2px solid black"}>Informations sur le bien</Text>
    <SimpleGrid columns={[1,1,2,2,2]} mt={2}>
    <Box  mt={2} width={"100%"}>
          <Text  fontWeight={600} >N° de piéces</Text>
          <Input type='number' width={"80%"} onChange={(e)=>SetNbPiece(e.target.valueAsNumber)} placeholder={"Nombre de piece"} />
          </Box> 
          <Box  mt={2} width={"100%"}>
         <Flex> <Text  fontWeight={600} >N° de chambre</Text> <Text fontSize={"15px"} color={"gray.400"} >(optionnel)</Text></Flex>
          <Input type='number' width={"80%"} onChange={(e)=>SetNbChambre(e.target.valueAsNumber)}placeholder={"Nombre de chambre"} />
          </Box> 
          <Box  mt={2}width={"100%"}>
         <Flex> <Text  fontWeight={600} >N° de salle de bain </Text> <Text fontSize={"15px"} color={"gray.400"} >(optionnel)</Text></Flex>
          <Input type='number' width={"80%"} onChange={(e)=>SetNbSbain(e.target.valueAsNumber)}placeholder={"Nombre de salle de bain "} />
          </Box> 
          <Box ml={2} mt={2} width={"100%"}>
         <Flex> <Text  fontWeight={600} >N° de salon </Text> <Text fontSize={"15px"} color={"gray.400"} >(optionnel)</Text></Flex>
          <Input type='number' width={"80%"}onChange={(e)=>SetNbSalon(e.target.valueAsNumber)} placeholder={"Nombre de salon "} />
          </Box> 
          <Box width={"100%"}>
         <Flex> <Text  fontWeight={600} >Prix </Text> </Flex>
          <Input type='number' width={"80%"} onChange={(e)=>SetPrix(e.target.valueAsNumber)}placeholder={"Prix "} />
          </Box> 
          <Box width={"100%"}>
              <Text fontWeight={600}>Periodicité de paiements</Text>
          <Select  width={"80%"}onChange={(e)=>SetPeriodicite(e.target.value)}>
              <option value={"JOUR"}>Jour</option>
            
              <option value={"MOIS"}>Mois</option>
              <option value={"ANNEE"}>Année</option>
          </Select>
          </Box> 
          {(TypePoste == "LOCATION"||TypePoste == "VENTE") ? <Box  mt={2} width={"100%"}>
          <Text fontWeight={600}>Apport initial</Text>
          <Input type='number'  width={"80%"}onChange={(e)=>SetApportInit(e.target.valueAsNumber)} placeholder="Apport initial" maxLength={12} />
          </Box>  :<></>}
    </SimpleGrid>
    </Box>
    <Box>
    <Text width={"90%"} height={"fit-content"} fontWeight={700} fontSize={["inherit","inherit","inherit","20px","25px"]} borderBottom={"2px solid black"}>Informations additionelles</Text>
    
    <Box width={"300px"} ml={2} mt={2}>
          <Text  fontWeight={600}>Information additionnelle sur le bien</Text>
          <Box height={"fit-content"}  >
              
      
<SimpleGrid columns={[2,3,3,3,3]} mt={1} spacingX={10}  >
      {bienId.map((data,index)=><Checkbox  key={index}
  
    onChange={(e) => CheckedBien(index,data.id,e.target.checked)}
  >
    {data.designation}
  </Checkbox>)}
</SimpleGrid>

          </Box>
          </Box>
          <Box  width={"300px"} ml={2} mt={2}>
          <Text  fontWeight={600}> Autre information sur le bien</Text>
          <Textarea onChange={(e)=>{setOtherB(e.target.value)}}></Textarea>
          </Box>
          <Box width={"300px"} ml={2} mt={2}>
          <Text  fontWeight={600}>Information additionnelle sur le quartier</Text>
          <Box height={"fit-content"}  >
              
      
<SimpleGrid columns={[2,3,3,3,3]} mt={1} spacingX={"100px"} spacingY={2}  >
{quartierId.map((data,index)=><Checkbox mr={10} key={index}
  //   isChecked={checkedItems[index]}
    onChange={(e) => CheckedQuartier(index,data.id,e.target.checked)}
  >
    {data.designation}
  </Checkbox>)}
</SimpleGrid>

          </Box>
          </Box>
          <Box  width={"300px"} ml={2} mt={2}>
          <Text  fontWeight={600}> Autre information sur le quartier</Text>
          <Textarea onChange={(e)=>{setOtherQ(e.target.value)}}></Textarea>
          </Box>
    </Box>
    
    <Box width={["100%","100%","100%","800px","800px"]} ml={2}>
    <Text width={"90%"} height={"fit-content"} fontWeight={700} fontSize={["inherit","inherit","inherit","20px","25px"]} borderBottom={"2px solid black"}>Generalité et Document(s)</Text>
    <SimpleGrid columns={[1,1,1,2,2]} spacingX={20}>
      
    <Box width={"300px"}  mt={2}>
          <Text  fontWeight={600} >Type de fichier</Text>
        <Select onChange={(e)=>{handleDocType(e.target.value)}}>
          <option value={"IMAGE"}>IMAGE</option>
          <option value={"DOCUMENT"}>DOCUMENT</option>
          <option value={"VIDEO"}>VIDEO</option>
        </Select>
          </Box> 
          <Box width={"300px"}  mt={2}>
          <Text  fontWeight={600} >Fichier(s)</Text>
          <Input type='file' accept={`${accepted}`} multiple={true} onChange={(e)=>setFichiers([e.target.files])} />
          </Box> 
          <Box width={"300px"}  mt={2}>
          <Text  fontWeight={600}>Latitude</Text>
          <Input type='number' placeholder="latitude" onChange={(e)=>setLat(e.target.valueAsNumber)} />
          </Box> 
          <Box width={"300px"} mt={2}>
          <Text  fontWeight={600} >Longitude</Text>
          <Input type='number'  placeholder="Longitude" onChange={(e)=>setLong(e.target.valueAsNumber)} />
          </Box> 
          <Box width={"300px"} mt={2}>
          <Text  fontWeight={600} >Localisation(Ville)</Text>
          <Input type='text'  placeholder=" Ville" onChange={(e)=>{setVille(e.target.value)}}/>
          </Box> 
          <Box >
          <Text  fontWeight={600}>Description</Text>
          <Textarea  width={"90%"} onChange={(e)=>{setDesc(e.target.value)}} height={"150px"} />
          </Box>
        
    </SimpleGrid>
    
    </Box>
         
         
  </SimpleGrid>
    <Flex bgColor={"cyan.700"}justifyContent={"space-between"}py={5}  px={10}borderBottomRadius={"25px"}>
      <Text></Text>
      <Button onClick={()=>SavePost()}>Publier Post</Button>
      
    </Flex>
      </Box>
       
      </Box>
     
      </>
    );
  }
  
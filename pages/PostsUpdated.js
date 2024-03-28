import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
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

  const [initial, setInitial] = useState("");
  const [token, setToken] = useState("");

  //variable pour texte
  const [text, setText] = useState("");
  //fin des declarations

  //variable pour Media
  const [images, setImages] = useState([]); //reutiliser pour recuperer les images dans post et Besoin
  //fin des declarations





  ///Fonction des checkbox
  const [checkedD,setCheckedD] = useState([])
  const [checkedB,setCheckedB] = useState([])
  const [checkedQ,setCheckedQ] = useState([])
  const CheckedDoc = (index,valeur)=>[
        checkedD[index] = valeur
  ]
  const CheckedBien = (index,valeur)=>[
    checkedB[index] = valeur
]
const CheckedQuartier = (index,valeur)=>[
    checkedQ[index] = valeur
]
  ///fin des declarations

  ///variable pour Post
  const [TypePoste, setTypePoste] = useState("");
  const [typebienId, setTypebienId] = useState([]);
  const [documentId, setDocumentId] = useState([]);
  const [quartierId, setQuartierId] = useState([]);
  const [bienId, setBienId] = useState([]);
  const [StypeBien, setStypeBien] = useState("");
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

  const HandleText = async () => {
    toast({
      title: "Information recupérer",
      description: "Enregistrement Effectué",
      duration: 9000,
      status: "success",
    });
  };
  const HandleMedia = async () => {
    toast({
      title: "Information recupérer",
      description: "Enregistrement Effectué",
      duration: 9000,
      status: "success",
    });
  };

  return (
    <>
      <Box ml={20} fontFamily={"-apple-system"}>
        <Text>Choissisez votre catègorie</Text>
        <RadioGroup
          onChange={(e) => setInitial(e)}
          display={["grid", "grid", "grid", "flex", "flex"]}
        >
          <Radio value={"TEXTE"} mr={5}>
            TEXTE/PARAGRAPHE
          </Radio>
          <Radio value={"VENTE/LOCATION"} mr={5}>
            VENTE/LOCATION
          </Radio>
          <Radio value={"BESOIN"} mr={5}>
            BESOIN
          </Radio>
          <Radio value={"MEDIA"} mr={5}>
            MEDIA
          </Radio>
        </RadioGroup>
      </Box>

      {initial == "TEXTE" ? (
        <Box
        fontFamily={"-apple-system"}
          ml={20}
          width={["300px", "300px", "300px", "500px", "500px"]}
          display={"grid"}
        >
          <Text fontWeight={700}>Entrez votre texte</Text>{" "}
          <Textarea
            width={["300px", "300px", "300px", "500px", "500px"]}
          ></Textarea>{" "}
          <Button
            mt={2}
            bgColor={"cyan.700"}
            color={"white"}
            py={2}
            px={4}
            width={"100px"}
            onClick={() => HandleText()}
          >
            Publier
          </Button>
        </Box>
      ) : initial == "MEDIA" ? (
        <>
          <Box
          fontFamily={"-apple-system"}
            mt={5}
            ml={20}
            width={["300px", "300px", "300px", "500px", "500px"]}
          >
            <Text fontWeight={"extrabold"}>Selectionner vos fichiers</Text>
            <Input type="file" multiple={true} />
            <Button
              onClick={() => HandleMedia()}
              mt={2}
              bgColor={"cyan.700"}
              color={"white"}
              py={2}
              px={4}
              width={"100px"}
            >
              Publier
            </Button>
          </Box>
        </>
      ) : initial == "BESOIN" ? (
        <></>
      ) : initial == "VENTE/LOCATION" ? (
        <SimpleGrid fontFamily={"-apple-system"} columns={[1,1,1,2,3]} mt={5}>
          <Box ml={20} width={"50%"}>
            <Text>Type de postes</Text>
            <Select onChange={(e) => setTypePoste(e.target.value)}>
              <option value={"INFORMATION"}>INFORMATION</option>
              <option value={"VENTE"}>VENTE</option>
              <option value={"LOCATION"}>LOCATION</option>
              <option value={"LOCATION-VENTE"}>LOCATION-VENTE</option>
              <option value={"MEDIA"}>MEDIA</option>
            </Select>
          </Box>
          <Box ml={20} width={"50%"}>
            <Box>
              <Text>Type de bien</Text>
              <Select onChange={(e) => setStypeBien(e.target.value)}>
                {typebienId.map((data, index) => (
                  <option key={index} value={data.designation}>
                    {data.designation}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          {StypeBien.length > 2 ? (
            <>
              {StypeBien == "Habitation" || StypeBien == "Studio" ? (
                <Box ml={20} mt={2}>
                  <Text>Meublé?</Text>
                  <RadioGroup onChange={(e) => setMeuble(e)}>
                    <Radio value="OUI" mr={5}>
                      OUI
                    </Radio>
                    <Radio value="NON">NON</Radio>
                  </RadioGroup>
                </Box>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <Box ml={20} mt={2}>
                <Text  fontWeight={600}>Type de document</Text>
                <Box height={"fit-content"}  py={2} px={4}>
                    
            
      <SimpleGrid columns={[2,2,2,3,3]} mt={1} spacing={2} mx={4}>
        <CheckboxGroup>
            {documentId.map((data,index)=><Checkbox key={index}
        //   isChecked={checkedItems[index]}
          onChange={(e) => {CheckedDoc(index,e.target.checked),console.log(checkedD)}}
        >
          {data.designation}
        </Checkbox>)}
        </CheckboxGroup>
      </SimpleGrid>
                </Box>
                </Box>
                <Box ml={20} mt={2} width={"300px"}>
                <Text  fontWeight={600} >Nombre de piéces</Text>
                <Input type='number'placeholder={"Nombre de piece"} />
                </Box> 
                <Box ml={20} mt={2} width={"300px"}>
               <Flex> <Text  fontWeight={600} >Nombre de chambre</Text> <Text fontSize={"15px"} color={"gray.400"} ml={2}>(optionnel)</Text></Flex>
                <Input type='number'placeholder={"Nombre de chambre"} />
                </Box> 
                <Box ml={20} mt={2} width={"300px"}>
               <Flex> <Text  fontWeight={600} >Nombre de salle de bain </Text> <Text fontSize={"15px"} color={"gray.400"} ml={2}>(optionnel)</Text></Flex>
                <Input type='number'placeholder={"Nombre de salle de bain "} />
                </Box> 
                <Box ml={20} mt={2} width={"300px"}>
               <Flex> <Text  fontWeight={600} >Nombre de salon </Text> <Text fontSize={"15px"} color={"gray.400"} ml={2}>(optionnel)</Text></Flex>
                <Input type='number'placeholder={"Nombre de salon "} />
                </Box> 
                <Box ml={20} mt={2} width={"300px"}>
               <Flex> <Text  fontWeight={600} >Prix </Text> </Flex>
                <Input type='number'placeholder={"Prix "} />
                </Box> 
                <Box ml={20} width={"300px"}>
                    <Text>Periodicité de paiements</Text>
                <Select>
                    <option>Jour</option>
                    <option>Semaine</option>
                    <option>Mois</option>
                    <option>Année</option>
                </Select>
                </Box> 
                {TypePoste == "LOCATION-VENTE" ? <Box ml={20} mt={2} width={"300px"}>
                <Text fontWeight={600}>Apport initial</Text>
                <Input type='number' placeholder="Apport initial" maxLength={12} />
                </Box>  :<></>}
                <Box width={"300px"} ml={20} mt={2}>
                <Text  fontWeight={600}>Information additionnelle sur le bien</Text>
                <Box height={"fit-content"}  >
                    
            
      <SimpleGrid columns={[2,3,3,3,3]} mt={1} spacingX={10}  >
            {bienId.map((data,index)=><Checkbox  key={index}
        
          onChange={(e) => CheckedBien(index,e.target.checked)}
        >
          {data.designation}
        </Checkbox>)}
      </SimpleGrid>
      
                </Box>
                </Box>
                <Box width={"300px"} ml={20} mt={2}>
                <Text  fontWeight={600}>Information additionnelle sur le quartier</Text>
                <Box height={"fit-content"}  >
                    
            
      <SimpleGrid columns={[2,3,3,3,3]} mt={1} spacingX={"100px"} spacingY={2}  >
      {quartierId.map((data,index)=><Checkbox mr={10} key={index}
        //   isChecked={checkedItems[index]}
          onChange={(e) => CheckedQuartier(index,e.target.checked)}
        >
          {data.designation}
        </Checkbox>)}
      </SimpleGrid>
      
                </Box>
                </Box>
                <Box width={"300px"} ml={20}>
                <Text  fontWeight={600}>Description</Text>
                <Textarea width={"300px"} height={"150px"} />
                </Box> 
                <Box width={"300px"} ml={20} mt={2}>
                <Text  fontWeight={600} >Fichier(s)</Text>
                <Input type='file' multiple={true} onChange={(e)=>setFichiers([e.target.files])} />
                </Box> 
                <Box width={"300px"} ml={20} mt={2}>
                <Text  fontWeight={600} placeholder={"Latitude"}>Latitude</Text>
                <Input type='number'  />
                </Box> 
                <Box width={"300px"} ml={20} mt={2}>
                <Text  fontWeight={600} placeholder={"Longitude"}>Longitude</Text>
                <Input type='number'  />
                </Box> 
                <Box width={"300px"} ml={20} mt={2}>
                <Text  fontWeight={600} placeholder={"Localisation(Ville)"}>Localisation(Ville)</Text>
                <Input type='text'  />
                </Box> 
                <Box></Box>
        </SimpleGrid>
      ) : (
        <></>
      )}
    </>
  );
}

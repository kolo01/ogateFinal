import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  SimpleGrid,
  Select,
  RadioGroup,
  Radio,
  useToast,
  Center,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Input,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Secondaire from "./Secondaire";
import { Select as Sl } from "react-dropdown-select";
import Dernier from "./quatrieme";

export default function PrincipalePopup() {
  ///Variables pour les vues des differents composants
  const [view1, setView1] = useState("block");
  const [view2, setView2] = useState("none");
  const [view3, setView3] = useState("none");
  const [view4, setView4] = useState("none");

  const [stepper, setStepper] = useState(1);

  const Next = (actu) => {
    if (actu == 1) {
      setView1("none");
      setView2("block");
      setView3("none");
      setView4("none");
    } else if (actu == 2) {
      setView1("none");
      setView2("none");
      setView3("block");
      setView4("none");
    } else if (actu == 3) {
      setView1("none");
      setView2("none");
      setView3("none");
      setView4("block");
    } else {
      setView1("none");
      setView2("none");
      setView3("none");
      setView4("block");
    }
  };

  const Previous = (actu) => {
    if (actu == 4) {
      setView1("none");
      setView2("none");
      setView3("block");
      setView4("none");
    } else if (actu == 3) {
      setView1("none");
      setView2("block");
      setView3("none");
      setView4("none");
     
    } else if (actu == 2) {
      setView1("block");
      setView2("none");
      setView3("none");
      setView4("none");
    } else {
      setView1("block");
      setView2("none");
      setView3("none");
      setView4("none");
    }
  };

  const Choice = (actu) => {
    if (actu == 4) {
      setView1("none");
      setView2("none");
      setView3("none");
      setView4("block");

    } else if (actu == 3) {
      setView1("none");
      setView2("none");
      setView3("block");
      setView4("none");
     
    } else if (actu == 2) {
      setView1("none");
      setView2("block");
      setView3("none");
      setView4("none");

    } else if (actu == 1) {
      setView1("block");
      setView2("none");
      setView3("none");
      setView4("none");

    }
  };

  const steps = [
    { title: 'Informations',description:""},
    { title: 'Informations ',description:"sur le bien" },
    { title: 'Informations ',description:"additionelles" },
    { title: 'Generalité ',description:"et Document(s)" },
  ]
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
    setActiveStep: stepper,
  })






  const { isOpen, onOpen, onClose } = useDisclosure();

///variable de la box 2
const [TypePoste, setTypePoste] = useState("INFORMATION");
    const [nbPiece,SetNbPiece] = useState(0)
    const [nbChambre,SetNbChambre] = useState(0)
    const [nbSbain,SetNbSbain] = useState(0)
    const [nbSalon,SetNbSalon] = useState(0)
    const [prix,SetPrix] = useState(0)
    const [periodicite,SetPeriodicite ] = useState("JOUR")
    const [apportInit,SetApportInit ] = useState(0)




///variable de la box finale
const [fields, setFields] = useState([{ id: 1, fileType: 'IMAGE', selectedFile: null }]);
const [lat, setLat] = useState(0);
const [load, setLoad] = useState(false);
const [long, setLong] = useState(0);
const [ville, setVille] = useState("none");
const [desc, setDesc] = useState("none");
      ///fonction de ce dernier
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
    
    
























  ///variable pour Post

  const toast = useToast();
  const router = useRouter();
  const [token, setToken] = useState("");
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };



  ///fin des declarations

  ///Variable de recuperation des champs dans la base de donnée
  const [typebienId, setTypebienId] = useState([]);
  const [documentId, setDocumentId] = useState([]);
  const [quartierId, setQuartierId] = useState([]);
  const [bienId, setBienId] = useState([]);

  ///Fin de la recuperation

  ///variable pour Post
 
  const [checkedD, setCheckedD] = useState([]); //utiliser pour recuperer les documents cochés
  const [checkedB, setCheckedB] = useState([]); //utiliser pour recuperer les info additionelles sur les biens cochés
  const [needDoc, setNeedDoc] = useState(false); //utiliser pour recuperer les info addictionnelle sur le type de bien

  const [StypeBien, setStypeBien] = useState(1);
  const [meuble, setMeuble] = useState("NON_MEUBLE");
  //fin des declarations
  //fin des declarations
  useEffect(() => {
    try {
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
        .then((response) => {
          setTypebienId(response.data.donnee),
            console.log("type bien id", response.data.donnee);
        })
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

      axios
        .get(
          "http://185.98.139.246:9090/ogatemanagement-api/rechercherlisteinformationsadditionnellessurbien",
          config
        )
        .then((response) => {
          setBienId(response.data.donnee),
            console.log("other", response.data.donneex);
        })
        .catch((error) => {});

      ///info addition sur le quartier
      axios
        .get(
          "http://185.98.139.246:9090/ogatemanagement-api/rechercherlisteinformationsadditionnellessurquartier",
          config
        )
        .then((response) => setQuartierId(response.data.donnee))
        .catch((error) => {});
    } catch (error) {
      router.push("/");
    }
  }, [token, router]);

  const handleSubmit = () => {
    sessionStorage.setItem("typePoste", JSON.stringify(TypePoste));
    sessionStorage.setItem("meuble", JSON.stringify(meuble));
    sessionStorage.setItem("typeBien", JSON.stringify(parseInt(StypeBien)));
    sessionStorage.setItem("typeDocument", JSON.stringify(checkedD));

    ///Deuxieme view
    sessionStorage.setItem("NPieces",JSON.stringify(nbPiece))
    sessionStorage.setItem("NChambre",JSON.stringify(nbChambre))
    sessionStorage.setItem("NBain",JSON.stringify(parseInt(nbSbain)))
    sessionStorage.setItem("NSalon",JSON.stringify(nbSalon))
    sessionStorage.setItem("Prix",JSON.stringify(prix))
    sessionStorage.setItem("Periodicite",JSON.stringify(periodicite))
    sessionStorage.setItem("Apport",JSON.stringify(apportInit))


    ///troisieme view
    
    sessionStorage.setItem("IAddBien",JSON.stringify(checkedB))
    sessionStorage.setItem("OAddBien",JSON.stringify(OtherB))
    sessionStorage.setItem("IAddQuart",JSON.stringify((checkedQ)))
    sessionStorage.setItem("OAddQuart",JSON.stringify(OtherQ))


    ////last 

  };

  return (
    <Box fontSize={"12px"} fontFamily={"-apple-system"}>
      <Box
        onClick={onOpen}
        maxW={"107px"}
        maxH={"56px"}
        textAlign={"center"}
        cursor={"pointer"}
      >
        <Center>
          <Box>
            <Image
              src={"./all/Sell.png"}
              alt=""
              width={"24px"}
              height={"24px"}
              fontSize={"24px"}
            />
          </Box>
        </Center>
        <Text fontSize={"20px"} lineHeight={"16px"}>
          {"Postes"}
        </Text>
      </Box>

      <Modal isOpen={isOpen} size={"5xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informations de base</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stepper size='lg' colorScheme='red' index={stepper}>
      {steps.map((step, index) => (
        <Step key={index}  onClick={()=>{setStepper(index+1),Choice(index+1)}}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
            {/* First view */}
            <Box display={view1}>
          
              <SimpleGrid columns={[1, 1, 2, 2, 2]} mt={2} spacingX={10} mx={5}>
                <Box width={"100%"}>
                  <Text>Type de postes</Text>
                  <Select
                    width={"fit-content"}
                    onChange={(e) => setTypePoste(e.target.value)}
                  >
                    <option value={"INFORMATION"}>INFORMATION</option>
                    <option value={"VENTE"}>VENTE</option>
                    <option value={"LOCATION"}>LOCATION</option>
                    <option value={"LOCATION_VENTE"}>LOCATION-VENTE</option>
                    {/* <option value={"MEDIA"}>MEDIA</option> */}
                  </Select>
                </Box>
                {TypePoste == "INFORMATION" ? (
                  <></>
                ) : (
                  <>
                    <Box width={"100%"}>
                      <Box>
                        <Text>Type de bien</Text>
                        <Select
                          width={"fit-content"}
                          onChange={(e) => {
                            setStypeBien(e.target.value);
                          }}
                        >
                          <option>Veuillez choisir une option</option>
                          {typebienId.map((data, index) => (
                            <option key={index} value={parseInt(index + 1)}>
                              {data.designation}
                            </option>
                          ))}
                        </Select>
                      </Box>
                    </Box>
                    {parseInt(StypeBien) < 3 ? (
                      <>
                        {StypeBien == "1" || StypeBien == "2" ? (
                          <Box mt={2}>
                            <Text>Meublé?</Text>
                            <RadioGroup onChange={(e) => setMeuble(e)}>
                              <Radio value="MEUBLE" mr={5}>
                                OUI
                              </Radio>
                              <Radio value="NON_MEUBLE">NON</Radio>
                            </RadioGroup>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {/* 

{console.log(typeof(typebienId))}
{console.log("object",Object.values(typebienId)[parseInt(StypeBien)-1].documentIsAssocieted)} */}
                    {Object.values(typebienId)[parseInt(StypeBien) - 1]
                      .documentIsAssocieted ? (
                      <Box mt={2}>
                        <Text fontWeight={600}>Type de document</Text>
                        <Box height={"fit-content"} py={2}>
                          <Box width={"100%"} mt={1} spacing={2}>
                            {/* <select class="js-example-basic-multiple" name="states[]" multiple="multiple">
      {documentId.map((data,index)=><option mr={2} key={index}
  //   isChecked={checkedItems[index]}
    onSelect={(e) => {CheckedDoc(index,data.id,e.target.checked)}}
    value={data.id}
  >
    {data.designation}
  </option>)}
  </select> */}

                            <Sl
                              multi={true}
                              options={documentId}
                              labelField="designation"
                              valueField="id"
                            />
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </SimpleGrid>
            </Box>

            {/* DExieme view */}
            <Box display={view2}>
            <SimpleGrid columns={[1, 1, 2, 2, 2]} mt={2} spacingY={5}>
              <Box mt={2} width={"100%"}>
                <Text fontWeight={600}>N° de piéces</Text>
                <Input
                  type="number"
                  width={"80%"}
                  onChange={(e) => SetNbPiece(e.target.valueAsNumber)}
                  placeholder={"120"}
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color:"cyan.700"                  }}
                />
              </Box>
              <Box mt={2} width={"100%"}>
                <Flex>
                  {" "}
                  <Text fontWeight={600}>N° de chambre</Text>{" "}
                 
                </Flex>
                <Input
                  type="number"
                  width={"80%"}
                  onChange={(e) => SetNbChambre(e.target.valueAsNumber)}
                  placeholder={"5"}
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color:"cyan.700"                  }}
                />
              </Box>
              <Box mt={2} width={"100%"}>
                <Flex>
                  {" "}
                  <Text fontWeight={600}>N° de salle de bain </Text>{" "}
                  {/* <Text fontSize={"15px"} color={"gray.400"}>
                    (optionnel)
                  </Text> */}
                </Flex>
                <Input
                  type="number"
                  width={"80%"}
                  onChange={(e) => SetNbSbain(e.target.valueAsNumber)}
                  placeholder={"3"}
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color:"cyan.700"                  }}
                />
              </Box>
              <Box mt={2} width={"100%"}>
                <Flex>
                  {" "}
                  <Text fontWeight={600}>N° de salon </Text>{" "}
                  {/* <Text fontSize={"15px"} color={"gray.400"}>
                    (optionnel)
                  </Text> */}
                </Flex>
                <Input
                  type="number"
                  width={"80%"}
                  onChange={(e) => SetNbSalon(e.target.valueAsNumber)}
                  placeholder={"2"}
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color:"cyan.700"                  }}
                />
              </Box>
              <Box width={"100%"}>
                <Flex>
                  {" "}
                  <Text fontWeight={600}>Prix </Text>{" "}
                </Flex>
                <Input
                  type="number"
                  width={"80%"}
                  onChange={(e) => SetPrix(e.target.valueAsNumber)}
                  placeholder={"200000 "}
                  height={"50px"}
                  border={"2px solid gray"}
                  _placeholder={{
                    color:"cyan.700"                  }}
                />
              </Box>
              <Box width={"100%"}>
                <Text fontWeight={600}>Periodicité de paiements</Text>
                <Select
                 height={"50px"}
                 border={"2px solid gray"}
                 _placeholder={{
                  color:"cyan.700"                  }}
                  width={"80%"}
                  onChange={(e) => SetPeriodicite(e.target.value)} placeholder="Periodicité de paiement"
                >
                  <option value={"JOUR"}>Jour</option>

                  <option value={"MOIS"}>Mois</option>
                  <option value={"ANNEE"}>Année</option>
                </Select>
              </Box>
              {(TypePoste == "LOCATION" || TypePoste == "VENTE" || TypePoste == "LOCATION_VENTE") ? (
                <Box mt={2} width={"100%"}>
                  <Text fontWeight={600}>Apport initial</Text>
                  <Input
                   height={"50px"}
                   border={"2px solid gray"}
                   _placeholder={{
                     color:"cyan.700"                  }}
                    type="number"
                    width={"80%"}
                    onChange={(e) => SetApportInit(e.target.valueAsNumber)}
                    placeholder="20000000"
                    maxLength={12}
                  />
                </Box>
              ) : (
                <></>
              )}
            </SimpleGrid>
            </Box>

            {/* Troisieme view */}
            <Box display={view3}>
            <Box   fontSize={'16px'} fontFamily={"-apple-system"}>
    
      
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
            
      </Box>
            </Box>

            {/* Derniere Vue */}
            <Box display={view4}>
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
            </Box>
          </ModalBody>

          <ModalFooter>
            <Box>
              {/* {TypePoste == "INFORMATION" ? <Dernier /> : <Secondaire />} */}
              {stepper<4 ?  <Button colorScheme="blue" onClick={()=>{Next(stepper), setStepper(stepper+1)}}>
              Suivant
            </Button> :  <Button colorScheme="blue" onClick={()=>{console.log('dernier');}}>
              Terminer
            </Button>}
             
            </Box>

            <Box>
              {/* {TypePoste == "INFORMATION" ? <Dernier /> : <Secondaire />} */}
              {stepper > 1 ?  <Button variant="ghost" onClick={()=>{Previous(stepper), setStepper(stepper-1)}}>
              Revenir
            </Button> :  <Button variant={'ghost'} onClick={onClose}>
              Fermer
            </Button>}
             
            </Box>

           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

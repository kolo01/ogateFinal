import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const FileUploadForm = () => {
  const [fields, setFields] = useState([{ id: 1, fileType: '', selectedFile: null }]);

  const handleAddField = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId, fileType: '', selectedFile: null }]);
    console.log(fields)
  };

  const handleRemoveFields = (id) => {
    if (fields.length === 1) return; // Ne supprime pas le dernier champ
    const updatedFields = fields.filter(field => field.id !== id);
    setFields(updatedFields);
    console.log(fields)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Vous pouvez traiter l'envoi de fichier ici
    console.log('Champs de fichier:', fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <Flex key={field.id}>

<Box width={"300px"} mt={2}>
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
 {field.id == 1 && (
          
          <Button ml={10} bgColor={"#00ffef"}textAlign={'center'} fontSize={"20px"} onClick={handleAddField} borderRadius={"full"}>+</Button>
            
         )}
           
           </Flex>
         </Box>
          )}
          {field.id !== 1 && (
          
           <Button ml={10} bgColor={"#00ffef"}textAlign={'center'} fontSize={"20px"} onClick={() => handleRemoveFields(field.id)} borderRadius={"full"}>-</Button>
             
          )}
       
        </Flex>
       
      ))}
      {/* <button type="button" onClick={handleAddField}>Ajouter un champ</button> */}
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default FileUploadForm;

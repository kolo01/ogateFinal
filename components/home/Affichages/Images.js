import { AspectRatio, Box, Image, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Images({images}) {
    const [iLength,setIlength] = useState("")


    useEffect(()=>{
        setIlength(images.length)
        console.log(images.length)
    },[iLength,images])





if (iLength<5 || iLength > 1) {
    return (
        <SimpleGrid columns={iLength} width={["450px", "450px", "500px", "545px", "545px"]}
              >
           {images.map((data,index)=>{
            return (
            // <AspectRatio key={index} maxW='500px' maxH={'380px'} ratio={1/0.8}>
                
            <Image  key={index}  w={'550px'} h={'400px'} src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${data.id}`} alt={`${data.nom}`} />
        //   </AspectRatio>
          )
           })} 
        </SimpleGrid>
       )
}else if(iLength == 1){
    return(
        <Box bgImage={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${data.id}`}  width={"500px"} height={'380px'}>
        {/* <Image width={"555px"}
             src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${data.id}`} alt={`${data.nom}`} /> */}
             </Box>
    )
}else if(iLength ==5 || iLength>5 )
{
    return (
        <SimpleGrid columns={3} spacingX={5} width={["350px", "350px", "350px", "100%", "100%"]}
              >
           {images.map((data,index)=>{
            return (
            <AspectRatio key={index} maxW='555px' ratio={1}>
            <Image src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${data.id}`} alt={`${data.nom}`} objectFit='cover' />
          </AspectRatio>
          )
           })} 
        </SimpleGrid>
       )
}

 
}

export default Images
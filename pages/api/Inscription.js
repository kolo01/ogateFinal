import axios from "axios";

export default function Inscription(req,res){
    axios.post("http://185.98.139.246:9090/ogatemanagement-api/signup", {
        nom:res.nom,
        username: res.username,
        password:res.mdp ,
        typeCompte: res.compte,
        localisation: "NON DEFINI",
      }).then((response)=>{
        sessionStorage.clear()
        res.status(200).json({ response: 'succes' })
        console.log({ response: 'succes' })
      }).catch((error)=>{ 
        console.log(error)
       
        // if(error.response.data.donnee=="Le numéro de téléphone appartient à un autre utilisateur"){
        //     res.status(201).json({ response: 'Deja enregistrer' })
        //     console.log({ response: 'Deja enregistrer' })
        // }
        // else if (error.response.data.donnee == null){
         
        //     res.status(401).json({ response: 'Error' })
        //     console.log({ response: 'Error' })
        // }else{
        //     res.status(401).json({ response: 'Error' })
        //     console.log({ response: 'Error' })
        // }
       } );
   
}
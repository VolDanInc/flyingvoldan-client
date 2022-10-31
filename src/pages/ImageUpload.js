import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const API_URL = "http://localhost:5005";

function ImageUpload() {
    const {aircraftId} = useParams();
  //const navigate= useNavigate();
    const [image, setImage]= useState(null)
    function handleImage(e) {
        console.log(e.target.files)
setImage(e.target.files[0])
    }
    function handleApi(){
        const formData = new FormData()
        formData.append("image", image)
        axios.post(`${API_URL}/upload`, formData)
        //axios.post(`${API_URL}/aircrafts/${aircraftId}`, formData)
        .then((response)=> {
            console.log(response)

            //navigate(`/`)
        })
        
    }
  return (
    <div>
      <input type= "file" name= "file" onChange={handleImage}/>
      <button onClick={handleApi}>Submit</button>
    </div>
  )
}

export default ImageUpload;

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const OnePet = (props) => {
    const [pets, setPets] = useState({});
    const [pet, setPet] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const removeFromDom = (petId) => {
        setPets(pets.filter(pet => pet._id != petId));
    }
    
    const deletePet = (idToBeDeleted) => {
        axios.delete('http://localhost:8000/api/pets/' + idToBeDeleted)
            .then(res => {
                removeFromDom(idToBeDeleted);
                navigate(`/`)
            })
            .catch(err => console.error(err));
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                setPet(res.data);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    }, [id]);
    
    return (
        <div>
            <div className='d-flex justify-content-around'>
                <h1 className='mt-3 text-primary'> Pet Shelter</h1>
                <Link to={"/"} className='btn btn-primary m-3 p-3'> Back to Home</Link>
            </div>
            <div className='d-flex justify-content-around'>
            <h3 className='text-success mt-4'>Details about: {pet.name}</h3>
                <button onClick={(e)=>{deletePet(id)}} className="btn btn-danger m-3 p-3"><Link to={"/"} className="text-light">Adopt {pet.name}</Link></button>
            </div>
            <div className='mt-3'>
                <p>Pet Type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <p>Skills: {pet.skillOne} </p>
                <p>{pet.skillTwo}</p>
                <p>{pet.skillThree}</p>
            </div>
            <div className='d-flex justify-content-evenly'>
                <p>Like {pet.name} </p>
                <p>0 likes</p>
            </div>
        </div>
    )
}

export default OnePet;
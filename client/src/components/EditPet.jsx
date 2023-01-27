import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const EditPet = (props) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skillOne, setSkillOne] = useState('');
    const [skillTwo, setSkillTwo] = useState('');
    const [skillThree, setSkillThree] = useState('');
    const [errors, setErrors] = useState([]); 

    const navigate = useNavigate();
    
    // server request for data on form
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                const {
                    name,
                    type,
                    description,
                    skillOne,
                    skillTwo,
                    skill
                } = res.data
                setName(name);
                setType(type);
                setDescription(description);
                setSkillOne(skillOne);
                setSkillTwo(skillTwo);
                setSkillThree(skillThree);
            })
    }, [id]);


    const updatePet = (e) => {
        e.preventDefault();
        const editedPet = { name, type, description, skillOne, skillTwo, skillThree}
        axios.put(`http://localhost:8000/api/pets/${id}`, editedPet)
            .then(res => {
                console.log(res);
                navigate(`/`)
                ;})
            .catch(err => {
                console.log(err.response);
                setErrors(err.response?.data?.errors)
            })
    }

    return (
        <div>
        <div className='d-flex justify-content-around'>
            <h1 className='mt-3 text-primary'> Pet Shelter</h1>
            <Link to={"/"} className='btn btn-primary m-3 p-3'> Back to Home</Link>
        </div>
        <h3 className='text-success mb-3'>Edit {name}</h3>
        <form onSubmit={(e) => {updatePet(e)}}>
            <div className='mb-3'>
                <label className='m-3'>Name</label>
                {
                errors?.name && (
                    <p style={{ color: 'red' }}>{errors.name?.message}</p>
                )
                }
                <input type="text" 
                name="name" 
                value={name}
                onChange={(e)=> { setName(e.target.value) }}
                className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Type</label>
                {
                errors?.type && (
                    <p style={{ color: 'red' }}>{errors.type?.message}</p>
                )
                }
                <input type="text" 
                name="type" 
                value={type}
                onChange={(e)=> { setType(e.target.value) }}
                className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Description</label>
                {
                errors?.description && (
                    <p style={{ color: 'red' }}>{errors.description?.message}</p>
                )
                }
                <input type="text" 
                name="description" 
                value={description}
                onChange={(e)=> { setDescription(e.target.value) }}
                className='p-3'/>
            </div>
            <p className='text-success'>Skills (optional)</p>
            <div className='mb-3'>
                <label className='m-3'>Skill One</label>
                <input type="text" 
                name="skillOne" 
                value={skillOne}
                onChange={(e)=> { setSkillOne(e.target.value) }}
                className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Skill Two</label>
                <input type="text" 
                name="skillTwo" 
                value={skillTwo}
                onChange={(e)=> { setSkillTwo(e.target.value) }}
                className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Skill Three</label>
                <input type="text" 
                name="skillThree" 
                value={skillThree}
                onChange={(e)=> { setSkillThree(e.target.value) }}
                className='p-3'/>
            </div>
            <div>
                <input type="submit" value="Edit Pet" className='p-3 btn btn-success'/>
            </div>
        </form>
    </div>
    )
}

export default EditPet;
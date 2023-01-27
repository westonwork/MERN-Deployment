import {useState} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


export const NewPet = (props) => {
    const { id } = useParams();
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [skillOne, setSkillOne] = useState();
    const [skillTwo, setSkillTwo] = useState();
    const [skillThree, setSkillThree] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleNewPet = (e) => {
        e.preventDefault();
        // Watch out for the route... 404 error because of adding /new
        axios.post("http://localhost:8000/api/pets/",
        {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree
        })
        .then(res => {
            console.log(res)
            navigate(`/`)
        })
        .catch( err => {
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
                // Set Errors
            setErrors(errorArr);})
    }


    return (
        <div>
        <div className='d-flex justify-content-around'>
            <h1 className='mt-3 text-primary'> Pet Shelter</h1>
            <Link to={"/"} className='btn btn-primary m-3 p-3'> Back to Home</Link>
        </div>
        <p className='text-primary'>Know a pet needing a home?</p>
        <form onSubmit={(e) => {handleNewPet(e)}}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div className='mb-3'>
                <label className='m-3'>Pet Name:</label>
                <input type="text" onChange={(e)=> setName(e.target.value)} className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Pet Type:</label>
                <input type="text" onChange={(e)=> setType(e.target.value)} className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Pet Description:</label>
                <input type="text" onChange={(e)=> setDescription(e.target.value)} className='p-3'/>
            </div>
            <p className='text-primary'>Skills (optional)</p>
            <div className='mb-3'>
                <label className='m-3'>Skill 1:</label>
                <input type="text" onChange={(e)=> setSkillOne(e.target.value)} className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Skill 2:</label>
                <input type="text" onChange={(e)=> setSkillTwo(e.target.value)} className='p-3'/>
            </div>
            <div className='mb-3'>
                <label className='m-3'>Skill 3:</label>
                <input type="text" onChange={(e)=> setSkillThree(e.target.value)} className='p-3'/>
            </div>
            <div>
                <input type="submit" value="Add Pet" className='p-3 btn btn-success'/>
            </div>
        </form>
    </div>
    );
};

export default NewPet;
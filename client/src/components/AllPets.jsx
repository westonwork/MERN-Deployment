import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

const AllPets = (props) => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/')
            .then(res => {
                res.data.sort((a, b) => {
                    if (a.type.toLowerCase() < b.type.toLowerCase()) {
                        return -1;
                    }
                    if (a.type.toLowerCase() > b.type.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
        setPets(res.data);
        setLoaded(true);
    })
        .catch(err => console.error(err));
}, []);

return (
    <div>
        <div className='d-flex justify-content-around'>
            <h1 className='mt-3 text-primary'> Pet Shelter</h1>
            <Link to={"/pets/new"} className='btn btn-primary m-3'>Add a Pet to the shelter</Link>
        </div>
        <p className='text-primary'>These pets are looking for a good home</p>
        <table className='table table-primary'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {loaded && pets.map((pet, i) => {
                    return <tr>
                        <td key={i}> {pet.name} </td>
                        <td key={i}> {pet.type} </td>
                        <td>
                            <button className='btn btn-info mx-3'><Link to={`/pets/${pet._id}`}>Details</Link></button>
                            <button className='btn btn-warning mx-3'><Link to={`/pets/${pet._id}/edit`}>Edit</Link></button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
)
}

export default AllPets;
const Pet = require('../models/pet.model');

const allPets = (req, res) => {
    Pet.find({})
        .then(pets => res.json(pets))
        .catch((err) => res.json(err));
    }

const onePet = (req, res) => {
    Pet.findById(req.params.id)
        .then(pet => {
            return res.json(pet)
        })
        .catch((err) => res.json(err))
    }


const newPet = (req, res) => {
    const { name, type, description, skillOne, skillTwo, skillThree } = req.body;
    Pet.create(req.body)
        .then(createdPet => {res.json(createdPet)})
        .catch((err) => {res.status(400).json(err)});
    }

const updatePet= (req, res) => {
    Pet.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true , runValidators: true})
        .then(updatedPet => res.json(updatedPet))
        .catch((err) => res.status(400).json(err))
        }

const deletePet = (req, res) => {
    Pet.findOneAndDelete({_id: req.params.id})
        .then(result => {
            return res.json(result)
        })
        .catch((err) => res.json(err));
    }

module.exports = {
    allPets,
    onePet,
    newPet,
    updatePet,
    deletePet
}
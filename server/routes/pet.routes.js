const PetController = require('../controllers/pet.controller');

module.exports = app => {
    app.get('/api/pets', PetController.allPets);
    app.post('/api/pets', PetController.newPet);
    app.get('/api/pets/:id', PetController.onePet);
    app.put('/api/pets/:id', PetController.updatePet);
    app.delete('/api/pets/:id', PetController.deletePet);
}
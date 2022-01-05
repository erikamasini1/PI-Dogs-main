const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const {showAllDogs, showDogsById, getTemperaments, postDog} = require('../controllers/controllers')

router.get('/dogs', showAllDogs)
router.get('/dogs/:id', showDogsById)
router.get('/temperament', getTemperaments)
router.post('/dog', postDog)

module.exports = router;

const axios = require("axios");
const sequelize = require("sequelize");
const { Dog, Temperament } = require("../db");
const { all } = require("../routes");
const { API_KEY } = process.env;

const getApiDogs = async (req, res) => {
  const apiDogs = await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}` );
  const allApiInfo = apiDogs.data;
  const allApiDogs = allApiInfo.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      temperament: dog.temperament,
      image: dog.image.url
    };
  });
 


  return allApiDogs;
};

const getDBDogs = async () => {
  return await Dog.findAll();
};

const getAllDogs = async () => {

const allDogs =  Promise.all([getApiDogs(), getDBDogs()]).then(value =>  {
  
  return [].concat(...value)
   // return [].concat.apply([], value);
})
//   const apiDogs = await getApiDogs();
//   const dBDogs = await getDBDogs();
//   const allDogs = apiDogs.concat(dBDogs);

  return allDogs;
};

const showAllDogs = async (req, res) => {
  try {
    const allDogs = await getAllDogs();

    const { name } = req.query;

    if (name) {
      const filteredDogs = allDogs.filter(dog =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
     
       if(filteredDogs.length > 0) {
           res.json(filteredDogs)
       } else {
           res.status(404).send(`${name.toUpperCase()} brand not found, please try another one!`)
       }
    } else {
      res.json(allDogs);
    }
  } catch (e) {
    console.log(e);
  }
};

const showDogsById = async (req, res) => {
    try{

        const allDogs = await getAllDogs()
        const {id} = req.params
        
        if(id){
            const filteredDog = allDogs.filter(dog => dog.id === parseInt(id))
            
            if(filteredDog.length > 0){
                res.json(filteredDog)
            } else {
                res.status(404).send(`${id.toUpperCase()} id not found, please try another one!`)
            }
        }
    } catch(e){
        console.log(e);
    }
}

 const getTemperaments = async (req,res) => {
  const apiDogs = await getApiDogs()
  

  let array = []
  for(var i = 0; i < apiDogs.length; i++){
    if(apiDogs[i].temperament){
      //allApiDogs[i].temperament = allApiDogs[i].temperament.split(', ')
      array.push(...apiDogs[i].temperament.split(', '))
    }
  }
  

  array.forEach(element => {
    Temperament.findOrCreate({
      where: { name: element}
    })
  
  });

  const allTemperaments = await Temperament.findAll()
  res.send(allTemperaments)



  //const temperaments = 

 }

 const postDog = async (req, res) => {
   const {
          name,
          height,
          weight,
          life_span,
          temperament
    } = req.body;
    console.log(req.body)

   const newDog = Dog.create({
          name,
          height,
          weight,
          life_span

   })

  //  temperament.forEach(element => {
  //  let temp = Temperament.findOne({where: {name: element}})
  //  console.log(Dog)
  //  newDog.setTemperament(temp)
  //  });
res.send(newDog)
 }

 //const project = await Project.findOne({ where: { title: 'My Title' } });

module.exports = { showAllDogs, showDogsById, getTemperaments, postDog };

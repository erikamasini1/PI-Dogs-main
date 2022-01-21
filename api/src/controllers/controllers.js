const axios = require("axios");
const sequelize = require("sequelize");
const { Dog, Temperament } = require("../db");
const { all } = require("../routes");
const { API_KEY } = process.env;

const getApiDogs = async () => {
 try{
  const apiDogs = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const allApiInfo = apiDogs.data;

  const allApiDogs = allApiInfo.map((dog) => {

    dog.weightToArray = dog.weight.metric.split(' - ')
    if (dog.weightToArray.length === 2) {
        dog.min_weight = isNaN(dog.weightToArray[0]) ? 0 : parseInt(dog.weightToArray[0]);
        dog.max_weight = isNaN(dog.weightToArray[1]) ? 0 : parseInt(dog.weightToArray[1]);
    } else if (!isNaN(dog.weight.metric)) {
        dog.min_weight = parseInt(dog.weight.metric);
        dog.max_weight = parseInt(dog.weight.metric);
    }

    dog.heightToArray = dog.height.metric.split(' - ')
    if (dog.heightToArray.length === 2) {
        dog.min_height = isNaN(dog.heightToArray[0]) ? 0 : parseInt(dog.heightToArray[0]);
        dog.max_height = isNaN(dog.heightToArray[1]) ? 0 : parseInt(dog.heightToArray[1]);
    } else if (!isNaN(dog.height.metric)) {
        dog.min_height = parseInt(dog.height.metric);
        dog.max_height = parseInt(dog.height.metric);
    }

    return {
      id: dog.id,
      name: dog.name,
      min_height: dog.min_height,
      max_height: dog.max_height,
      min_weight: dog.min_weight,
      max_weight: dog.max_weight,
      life_span: dog.life_span,
      source: 'thedogapi',
      temperaments: dog.temperament
        ? dog.temperament.split(", ").map( (temp) => {
            return { name: temp };
          })
        : [],
      image: dog.image.url,
    };
  });
  return allApiDogs;
}catch(e){
  console.log(e)
  res.status(500).send('No dogs found, please try again')
}
};

const getDBDogs = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const allDogs = Promise.all([getApiDogs(), getDBDogs()]).then((value) => {
    return [].concat(...value);
  });
  return allDogs;
};


const showAllDogs = async (req, res) => {
  try {
    const allDogs = await getAllDogs();
    const {name} = req.query;

    if (name) {
      const filteredDogs = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      res.json(filteredDogs);
    } else {
      res.json(allDogs);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('No dogs found, please try again')

  }
};

const showDogsById = async (req, res) => {
  try {
    const allDogs = await getAllDogs();
    const { id } = req.params;
    if (id ) {
      const filteredDogs = allDogs.find((dog) => dog.id.toString() === id.toString());

      if (filteredDogs) {
        res.json(filteredDogs);
      } else {
        res
          .status(404)
          .send(`${id} id not found, please try another one!`);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('No dogs found, please try again')
  }
};


const getTemperaments = async (req, res) => {
  const apiDogs = await getApiDogs();

  let array = [];
  for (var i = 0; i < apiDogs.length; i++) {
    if (apiDogs[i].temperaments) {
      apiDogs[i].temperaments.forEach((temp) => {
        array.push(temp.name);
      });
    }
  }

  array.forEach((element) => {
    Temperament.findOrCreate({
      where: { name: element },
    });
  });

  const allTemperaments = await Temperament.findAll({order: [['name', 'ASC']]});
  res.send(allTemperaments);

};

const postDog = async (req, res) => {
  try {
    if(req.body.name && req.body.max_height && req.body.max_weight && req.body.min_height && req.body.min_weight){
      let newDog = await Dog.create(req.body);

      let temperamentDB = await Temperament.findAll({ where: { id: req.body.temperament } });
    
      newDog.addTemperament(temperamentDB);
      res.send(newDog);
    } else {
      res.status(400).send('Required fields missing')
    }
  } catch(e){
    console.error('Dog not created ', e);
    res.status(500).send('Dog not created')
  }
};


module.exports = { showAllDogs, showDogsById, getTemperaments, postDog };

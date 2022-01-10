const axios = require("axios");
const sequelize = require("sequelize");
const { Dog, Temperament } = require("../db");
const { all } = require("../routes");
const { API_KEY } = process.env;

const getApiDogs = async () => {
  const apiDogs = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const allApiInfo = apiDogs.data;
  // VIDEO const allApiInfo = await apiDogs.data.map(el => {return { name:el.name}});
  const allApiDogs = allApiInfo.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
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
    // return [].concat.apply([], value);
  });
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
      //await
      const filteredDogs = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredDogs.length > 0) {
        res.json(filteredDogs);
      } else {
        res
          .status(404)
          .send(
            `${name.toUpperCase()} brand not found, please try another one!`
          );
      }
    } else {
      res.json(allDogs);
    }
  } catch (e) {
    console.log(e);
  }
};

const showDogsById = async (req, res) => {
  try {
    const allDogs = await getAllDogs();
    const { id } = req.params;

    if (id) {
      //await
      const filteredDog = allDogs.filter((dog) => dog.id === parseInt(id));

      if (filteredDog.length > 0) {
        res.json(filteredDog);
      } else {
        res
          .status(404)
          .send(`${id.toUpperCase()} id not found, please try another one!`);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getTemperaments = async (req, res) => {
  const apiDogs = await getApiDogs();

  // const temperaments = apiDogs.map(temp => temp.temperament)

  // const temEach = temperaments.map(temp => {
  //   temp.split(', ')
  // array de arrays
  //   for (let i = 0; i < temp.length; i++) {
  //     return temp[i]

  //   }
  // })
  // for (let i = 0; i < temperaments.length; i++) {
  //   if(apiDogs[i].temperament){
  //    apiDogs[i].temperament.split(', ')
  //   }
  //   // VER MINUTO 59 1,06
  // }

  let array = [];
  for (var i = 0; i < apiDogs.length; i++) {
    if (apiDogs[i].temperaments) {
      //allApiDogs[i].temperament = allApiDogs[i].temperament.split(', ')
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

  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);

  //const temperaments =
};

const postDog = async (req, res) => {
  //VALIDACION DE DATOS
  // ADD VS SET -> ADD METODO SEQUELZE QUE ME TRAE DE LA TABLA LO QUE LE PASO ENTRE PARENTESIS
  let { name, height, weight, life_span, temperament } = req.body;
  console.log(req.body);

  let newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
  });

  let temperamentDB = await Temperament.findAll({ where: { id: temperament } });

  newDog.addTemperament(temperamentDB);
  res.send(newDog);
};

//const project = await Project.findOne({ where: { title: 'My Title' } });

module.exports = { showAllDogs, showDogsById, getTemperaments, postDog };

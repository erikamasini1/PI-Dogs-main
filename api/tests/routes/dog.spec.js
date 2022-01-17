/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: "91ed43a8-ebe7-4534-88b9-2330b254f99a",
  name: 'Pug',
  min_height: 1,
  max_height: 2,
  min_weight: 1, 
  max_weight: 2
};

describe('Get all dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('Get dog route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs by id', () => {
    it('should get 200', () => 
      agent.get(`/dogs/${dog.id}`).expect(200)      
    );
  }),
  describe('GET /dogs non existing dog', () => {
    it('should get 200', () => 
      agent.get('/dogs/invalidId').expect(404)      
    );
  });
  describe('GET /dogs by name', () => {
  it('should get 200', () =>
    agent.get(`/dogs?name=${dog.name}`).expect(200))
  });
});


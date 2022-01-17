const { Dog, conn } = require('../../src/db.js');
const { expect, assert } = require('chai');

const sucessfulDog = {
  name: 'Pug',
  min_height: 1,
  max_height: 2,
  min_weight: 1, 
  max_weight: 2
};

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch((err) => {
            const result = err.errors.some(e => e.message === "dog.name cannot be null");
            if (result) {
              done();
            } else {
              done(new Error('There is no validation for name'))
            }
          });
      });
      it('should work when its a valid name', (done) => {
        Dog.create(sucessfulDog)
        .then(() => done())
        .catch((err) => done(err));
      });
    });
  });
});

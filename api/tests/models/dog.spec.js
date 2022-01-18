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
          .then(() => done(new Error('Should return an error')))
          .catch((err) => {
            const result = err.errors.some(e => e.message === "dog.name cannot be null");
            if (result) {
              done();
            } else {
              done(new Error('There is no validation for name'))
            }
          });
      });

      it('should work when its a valid dog', (done) => {
        Dog.create(sucessfulDog)
        .then(() => done())
        .catch((err) => done(err));
      });
    });
  });
});


// ValidationErrorItem {
//   message: 'dog.name cannot be null',
//   type: 'notNull Violation',
//   path: 'name',
//   value: null,
//   origin: 'CORE',
//   instance: dog {
//     dataValues: [Object],
//     _previousDataValues: {},
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: [Object],
//     isNewRecord: true
//   },
//   validatorKey: 'is_null',
//   validatorName: null,
//   validatorArgs: []
// },
// ValidationErrorItem {
//   message: 'dog.min_height cannot be null',
//   type: 'notNull Violation',
//   path: 'min_height',
//   value: null,
//   origin: 'CORE',
//   instance: dog {
//     dataValues: [Object],
//     _previousDataValues: {},
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: [Object],
//     isNewRecord: true
//   },
//   validatorKey: 'is_null',
//   validatorName: null,
//   validatorArgs: []
// },
// ValidationErrorItem {
//   message: 'dog.max_height cannot be null',
//   type: 'notNull Violation',
//   path: 'max_height',
//   value: null,
//   origin: 'CORE',
//   instance: dog {
//     dataValues: [Object],
//     _previousDataValues: {},
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: [Object],
//     isNewRecord: true
//   },
//   validatorKey: 'is_null',
//   validatorName: null,
//   validatorArgs: []
// },
// ValidationErrorItem {
//   message: 'dog.min_weight cannot be null',
//   type: 'notNull Violation',
//   path: 'min_weight',
//   value: null,
//   origin: 'CORE',
//   instance: dog {
//     dataValues: [Object],
//     _previousDataValues: {},
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: [Object],
//     isNewRecord: true
//   },
//   validatorKey: 'is_null',
//   validatorName: null,
//   validatorArgs: []
// },
// ValidationErrorItem {
//   message: 'dog.max_weight cannot be null',
//   type: 'notNull Violation',
//   path: 'max_weight',
//   value: null,
//   origin: 'CORE',
//   instance: dog {
//     dataValues: [Object],
//     _previousDataValues: {},
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: [Object],
//     isNewRecord: true
//   },
//   validatorKey: 'is_null',
//   validatorName: null,
//   validatorArgs: []
// }
// ]
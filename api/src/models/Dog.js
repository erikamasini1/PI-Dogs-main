const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('dog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    min_weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    life_span: {
      type: DataTypes.INTEGER
    }, 
    source: {
      type: DataTypes.STRING,
      defaultValue: 'database'
    }

  }, {
    timestamps: false
  });
};


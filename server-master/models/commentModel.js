const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const comment = sequelize.define("comment", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_updated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  author: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  timestamps: true,
  createdAt: 'date_created',
  updatedAt: 'date_updated'
});


module.exports = comment;

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Document = sequelize.define(
  "Document",
  {
    title: {
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
    category: {
      type: DataTypes.STRING,
    },
    has_comments: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "documents",
    timestamps: false,
  }
);

module.exports = Document;

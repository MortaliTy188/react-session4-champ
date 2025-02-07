const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Event = sequelize.define(
  "event",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    event_time: {
      type: DataTypes.TIME,
    },
    responsible_persons: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "event",
    timestamps: false,
  }
);

const EventStatus = sequelize.define(
  "EventStatus",
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { 
    tableName: "event_status",
    timestamps: false
  }
);

const EventType = sequelize.define(
  "EventType",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "event_type",
    timestamps: false
  }
);

Event.belongsTo(EventStatus, { foreignKey: "status_id" });
Event.belongsTo(EventType, { foreignKey: "type_id" });

module.exports = { Event, EventStatus, EventType };

const express = require("express");
const router = express.Router();
const { Event, EventStatus, EventType } = require("../models/eventModel");

router.get("/events/", async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{ model: EventStatus }, { model: EventType }],
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

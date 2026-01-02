// specify express module
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
// specify controller path
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../collection/collection");

//Mention all router
router.get("/events", getEvents);
router.post("/events",upload.single("image"), createEvent);
router.put("/events/:id", upload.single("image"), updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;

const { Event } = require("../models/event");

const HttpError = require("../helpers/HttpError");

const eventById = async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw HttpError(404);
  }
  res.status(200).json(event);
};

module.exports = eventById;

const { Event } = require("../models/event");

const HttpError = require("../helpers/HttpError");

const eventAddMember = async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw HttpError(404);
  }

  const members = event.registrations;

  const existingMember = members.find((member) => member.email === req.body.email);
  if (existingMember) {
    return res.status(400).json({ message: "This email is already registered in the event." });
  }

  members.push(req.body);
  await event.save();

  res.status(200).json(event);
};

module.exports = eventAddMember;

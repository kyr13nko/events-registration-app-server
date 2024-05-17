const { Event } = require("../models/event");

const eventsList = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const allEvents = await Event.find().skip(skip).limit(parseInt(limit));
  const totalEvents = await Event.countDocuments();

  const totalPages = Math.ceil(totalEvents / limit);
  const currentPage = parseInt(page);

  res.status(200).json({
    totalEvents,
    totalPages,
    currentPage,
    events: allEvents,
  });
};

module.exports = eventsList;

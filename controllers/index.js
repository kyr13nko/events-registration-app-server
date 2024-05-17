const ctrlWrapper = require("../helpers/ctrlWrapper");

const eventsList = require("./eventsList");
const eventById = require("./eventById");
const eventAddMember = require("./eventAddMember");

module.exports = {
  eventsList: ctrlWrapper(eventsList),
  eventById: ctrlWrapper(eventById),
  eventAddMember: ctrlWrapper(eventAddMember),
};

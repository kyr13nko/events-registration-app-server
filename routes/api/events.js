const express = require("express");

const validateBody = require("../../middlewares/validateBody");

const ctrl = require("../../controllers");
const { addMemberSchema } = require("../../models/event");

const router = express.Router();

router.get("/", ctrl.eventsList);

router.get("/:eventId", ctrl.eventById);

router.post("/:eventId", validateBody(addMemberSchema), ctrl.eventAddMember);

module.exports = router;

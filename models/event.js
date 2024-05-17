const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

const registrationSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  source: { type: String, required: true },
});

const eventSchema = new Schema(
  {
    title: String,
    description: String,
    eventDate: String,
    organizer: String,
    registrations: [registrationSchema],
  },
  { versionKey: false }
);

eventSchema.post("save", handleMongooseError);

const addMemberSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "any.required": "Missing required full name field",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "Missing required email field",
    "string.pattern.base": "Invalid email format. Please use the format 'example@mail.com'.",
  }),
  dateOfBirth: Joi.string().pattern(dateRegex).required().messages({
    "any.required": "Missing required date of birth field",
    "string.pattern.base": "Invalid date format. Please use the format 'DD-MM-YYYY'.",
  }),
  source: Joi.string().required().messages({
    "any.required": "Missing required source field",
  }),
});

const Event = model("event", eventSchema);

module.exports = { Event, addMemberSchema };

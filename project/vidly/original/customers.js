const Joi = require("joi"); //it is used to validate the genres
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  // validation
  const { error } = validateCustomer(req.body); //result.error

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  let customer = new Customer({
    name: req.body.name,
    phobe: req.body.phobe,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body); //result.error

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    {
      name: true,
    }
  );

  if (!customer) {
    res.status(404).send("given id is not found");
    return;
  }

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res.status(404).send("given id is not found");
    return;
  }

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send("given id is not found");
    return;
  }
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}
module.exports = router;

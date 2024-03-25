const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customers.js"); // to make code readable manner use like this here now imported .Customer and .validate

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
    phobe: req.body.phone,
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

module.exports = router;

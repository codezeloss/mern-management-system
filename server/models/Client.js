const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Client = model("Client", ClientSchema);

module.exports = Client;

const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  borrowedBooks: [{}],
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;

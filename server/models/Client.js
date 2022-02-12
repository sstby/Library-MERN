const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  clientFirstName: {
    type: String,
    required: true,
  },
  clientLastName: {
    type: String,
    required: true,
  },
  clientBorrowedBook: {
    type: String,
    required: false,
  },
  clientBorrowDate: {
    type: Date,
    required: false,
  },
  clientBorrowDeathline: {
    type: Date,
    required: false,
  },
  clientBorrowReturned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;

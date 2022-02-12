const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BookModel = require("./models/Book");
const ClientModel = require("./models/Client");
const { collection } = require("./models/Book");
const { query } = require("express");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://stby:qwert@cluster0.p4jrz.mongodb.net/library?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert-book", async (request, response) => {
  const { data } = request.body;
  const assign = new BookModel(data);

  try {
    await assign.save();
  } catch (error) {
    console.log(error);
  }
});

app.post("/insert-client", async (request, response) => {
  const { data } = request.body;
  const assign = new ClientModel(data);

  try {
    await assign.save();
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-all-books", async (request, response) => {
  BookModel.find({}, (error, result) => {
    if (error) {
      response.send(error);
    }
    response.send(result);
  });
});

app.get("/get-all-clients", async (request, response) => {
  ClientModel.find({}, (error, result) => {
    if (error) {
      response.send(error);
    }
    response.send(result);
  });
});

app.put("/update-book", async (request, response) => {
  const { data, id } = request.body;
  try {
    await BookModel.findById(id, (error, book) => {
      console.log(book);
      book.bookTitle = data.bookTitle;
      book.bookAuthor = data.bookAuthor;
      book.bookGenre = data.bookGenre;
      book.bookSector = data.bookSector;
      book.bookPublishing = data.bookPublishing;
      book.save();
    });
  } catch (error) {
    response.send("error");
  }
});

app.delete("/delete/:db/:id", async (request, result) => {
  const db = request.params.db;
  const id = request.params.id;

  if (db === "book");
  {
    await BookModel.findByIdAndRemove(id).exec();
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let database = require("./sampledata.json");
console.log(database);

app.get("/api/users", (request, response) => {
  response.json(database.users);
});

app.get("/api/products", (request, response) => {
  response.json(database.products);
});

app.get("/api/orders", (request, response) => {
  response.json(database.orders);
});

app.get("/api/products/:id", (request, response) => {
  const id = request.params.id;
  database.products.map((product) => {
    if (product.id == id) {
      response.json(product);
      console.log("Ive been gotted");
    }
  });
});

app.post("/api/products", (request, response) => {
  if (!request.body.title && !request.body.body) {
    return response.status(400).json({ error: "content missing" });
  }
  let product = {
    id: database.products[database.products.length - 1].id + 1,
    title: request.body.title,
    body: request.body.body,
    category: request.body.category,
    vendor: request.body.vendor,
    tags: request.body.tags,
    inventory: request.body.inventory,
    price: request.body.price,
    image: request.body.image,
  };
  database.products.push(product);
  response.json(database.products);
});

app.delete("/api/products/:id", (request, response) => {
  let id = request.params.id;
  var isPresent = false;

  for (i = 0; i < database.products.length; i++) {
    if (database.products[i].id == id) {
      isPresent = true;
    }
  }

  if (isPresent) {
    let data = database.products.filter((u) => u.id != id);
    database.products = data;
  } else {
    return response.status(400).json({ error: "content missing" });
  }
  response.json(database.products);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

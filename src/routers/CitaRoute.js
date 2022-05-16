const { Router } = require("express");
const route = Router();
const Controller = require("../controllers/CitaController");

route.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

route.post("/", Controller.create);
route.put("/:id", Controller.edit);
route.delete("/:id", Controller.delete);
route.get("/", Controller.getAll);
route.get("/:id", Controller.getById);

module.exports = route;

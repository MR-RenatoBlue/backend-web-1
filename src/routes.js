const { Router } = require("express");
const TaskController = require("./controllers/TaskController");
const CategoryController = require("./controllers/CategoryController")
const AgentController = require("./controllers/AgentController")

const routes = Router();

routes.get("/tasks", TaskController.index);
routes.get("/tasks/:id", TaskController.show);
routes.post("/tasks", TaskController.store);
routes.put("/tasks/:id", TaskController.update);
routes.delete("/tasks/:id", TaskController.delete);

routes.get("/agents", AgentController.index);
routes.post("/agents", AgentController.store);

routes.get("/categories", CategoryController.index);
routes.post("/categories", CategoryController.store);

module.exports = routes;

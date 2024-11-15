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

//rota "/agents" - TIPO POST
 routes.post("/agents", AgentController.store);
//rota "/categories" - TIPO POST
routes.post("/categories", CategoryController.store);

module.exports = routes;

const TaskRepository = require("../repositories/TaskRepository");

class TaskController {
  constructor() {
    this.verifyTaskExists = this.verifyTaskExists.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
  }
  async index(request, response) {
    // Listar todos os registros
    const tasks = await TaskRepository.findAll();
    response.json(tasks);
  }

  async verifyTaskExists(id) {

    const task = await TaskRepository.findById(id);

    if (!task) {
      return null;
    }
    return task;
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;

    const task = await this.verifyTaskExists(id);

    if (!task) {
      return response.status(404).json({ error: "Task not found!" });
    }

    response.json(task);
  }

  async store(request, response) {
    const { name, description, agent_id, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    if (!description) {
      return response.status(400).json({ error: "Description is required" });
    }

    if (!agent_id) {
      return response.status(400).json({ error: "Agent is required" });
    }


    if (!category_id) {
      return response.status(400).json({ error: "Category is required" });
    }

    //Definindo que e-mail deve ser único para cada contato mas não obrigatório
    // if (email) {
    //   const contactByEmail = await TaskRepository.findByEmail(email);
    //   if (contactByEmail) {
    //     return response
    //       .status(400)
    //       .json({ error: "This e-mail is already in use" });
    //   }
    // }

    const task = await TaskRepository.create({
      name,
      description: description,
      agent_id,
      category_id: category_id
    });

    response.status(201).json(task);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, agent_id, category_id } = request.body;

    const task = await this.verifyTaskExists(id);

    if (!task) {
      return response.status(404).json({ error: "Task not found!" });
    }


    const updatedTask = await TaskRepository.update({
      id,
      name,
      description,
      agent_id,
      category_id
    });
    response.status(201).json(updatedTask);
  }

  async delete(request, response) {
    //Deletar um registro específico
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: "Invalid task id" });
    }
    await TaskRepository.delete(id);
    // 204: Not Content
    response.sendStatus(204);
  }
}
module.exports = new TaskController();

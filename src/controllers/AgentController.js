const AgentRepository = require("../repositories/AgentRepository");

class AgentController {

  async index(request, response) {
    const agents = await AgentRepository.findAll();
    response.json(agents);
  }

  async store(request, response) {
    const { name, cpf, email } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    if (!cpf) {
      return response.status(400).json({ error: "CPF is required" });
    }
    if (!email) {
      return response.status(400).json({ error: "Email is required" });
    }

    const agent = await AgentRepository.create({
      name,
      cpf,
      email
    });

    response.status(201).json(agent);
  }
}
module.exports = new AgentController();

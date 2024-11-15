const db = require("../models/ConnectDatabase");

class AgentRepository {

  async create({ name, cpf, email }) {
    const result = await db.query(
      `
      INSERT INTO agent (name, cpf, email)
      VALUES (?,?,?)
      `,
      [name, cpf, email]
    );

    // Retorna o ID do novo contato inserido e os dados inseridos
    const insertedId = result.insertId;
    return {
      id: insertedId,
      name,
      cpf,
      email
    };
  }

}

module.exports = new AgentRepository();

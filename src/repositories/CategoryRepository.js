const db = require("../models/ConnectDatabase");

class CategoryRepository {

  async create({ name }) {
    const result = await db.query(
      `
      INSERT INTO categories (name)
      VALUES (?)
      `,
      [name]
    );

    // Retorna o ID do novo contato inserido e os dados inseridos
    const insertedId = result.insertId;
    return {
      id: insertedId,
      name
    };
  }

}

module.exports = new CategoryRepository();
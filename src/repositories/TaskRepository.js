const db = require("../models/ConnectDatabase");

class TaskRepository {
  async findAll() {
    const rows = await db.query(`
        SELECT tasks.* FROM tasks
        LEFT JOIN categories ON categories.id = tasks.category_id
        `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT tasks.*, categories.name AS category_name
      FROM tasks
      LEFT JOIN categories ON categories.id = tasks.category_id
      WHERE tasks.id = ?;
      `,
      [id]
    );
    return row;
  }

  async findByAgentEmail(email) {
    const [rows] = await db.query(
      `
      SELECT * FROM tasks
      WHERE email = ?;
      `,
      [email]
    );

    return rows;
  }

  async create({ name, description, agent_id, category_id }) {
    const result = await db.query(
      `
      INSERT INTO tasks (name, description, agent_id, category_id)
      VALUES (?, ?, ?, ?)
      `,
      [name, description, agent_id, category_id]
    );

    // Retorna o ID do novo contato inserido e os dados inseridos
    const insertedId = result.insertId;
    return {
      id: insertedId,
      name,
      description,
      agent_id,
      category_id,
    };
  }

  async update({id, name, description, agent_id, category_id }) {
    const updateItem = await db.query(
      `
      UPDATE tasks
      SET name = ?, description = ?, agent_id = ?, category_id = ?
      WHERE id =?
      `,
      [name, description, agent_id, category_id, id]
    );
    return {
      id,
      name,
      description,
      agent_id,
      category_id,
    };
  }

  async delete(id) {
    const deleteItem = await db.query(
      `
        DELETE FROM tasks
        WHERE id = ?;
      `,
      [id]
    );

    return deleteItem;
  }
}

module.exports = new TaskRepository();

const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController {


  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const category = await CategoryRepository.create({
      name
    });

    response.status(201).json(category);
  }
}
module.exports = new CategoryController();

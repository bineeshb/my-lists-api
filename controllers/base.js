const baseController = model => {
  return {
    getAll: async (_, res, next) => {
      try {
        const response = await model.getAll();
        res.json(response);
      } catch (error) {
        next(error);
      }
    },

    getOne: async (req, res, next) => {
      try {
        const response = await model.getOne(req.params.rowNumber);
        res.json(response);
      } catch (error) {
        next(error);
      }
    },

    addOne: async (req, res, next) => {
      try {
        const response = await model.addOne(req.body);
        res.status(201).json(response);
      } catch (error) {
        next(error);
      }
    },

    deleteOne: async (req, res, next) => {
      try {
        const response = await model.deleteOne(req.params.rowNumber);
        res.json(response);
      } catch (error) {
        next(error);
      }
    },

    updateOne: async (req, res, next) => {
      try {
        const response = await model.updateOne(req.params.rowNumber, req.body);
        res.json(response);
      } catch (error) {
        next(error);
      }
    }
  };
};

export default baseController;

import { Router } from 'express';

import baseController from '../controllers/base.js';
import { validateRowNumber } from '../middlewares/requestParamHandler.js';

const createRouter = model => {
  const router = Router();
  const controller = baseController(model);

  router.get('/', controller.getAll);

  router.post('/', model.validateRequest, controller.addOne);

  router.route('/:rowNumber')
    .all(validateRowNumber)
    .get(controller.getOne)
    .delete(controller.deleteOne);

  router.put('/:rowNumber', model.validateRequest, controller.updateOne);

  return router;
};

export default createRouter;

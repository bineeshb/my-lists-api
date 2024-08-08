import { BadRequest } from '../models/error.js';

export const validateRowNumber = (req, _, next) => {
  let error = null;
  const rowNumber = req.params.rowNumber ? parseInt(req.params.rowNumber, 10) : null;

  if (isNaN(rowNumber) || rowNumber < 1) {
    error = new BadRequest(`Invalid request parameter: ${req.params.rowNumber}`);
  }

  next(error);
};

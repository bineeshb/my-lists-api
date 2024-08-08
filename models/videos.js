import { isEmptyString } from '../utils/string.js';
import List from './list.js';
import { BadRequest } from './error.js';

export default class Videos extends List {
  constructor(doc) {
    super(doc, 'videos');
  }

  validateRequest(request, _, next) {
    if (!request.body || isEmptyString(request.body.type) || isEmptyString(request.body.title)) {
      throw new BadRequest('Invalid Request');
    }

    next();
  }
};

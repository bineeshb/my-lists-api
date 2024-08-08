import { isBefore, isValidDate, isValidYear } from '../utils/date.js';
import { isEmptyString } from '../utils/string.js';
import List from './list.js';
import { BadRequest } from './error.js';

class Book {
  constructor(details, rowNumber) {
    this.rowNumber = rowNumber;
    Object.assign(this, details);
  }
}

export default class Books extends List {
  constructor(doc) {
    super(doc, 'books', (details, rowNumber) => new Book(details, rowNumber));
  }

  validateRequest(req, _, next) {
    if (!req.body) {
      throw new BadRequest('Invalid Request');
    }

    const {
      title,
      publishedYear,
      plannedStartDate,
      plannedEndDate,
      actualStartDate,
      actualEndDate
    } = req.body;

    if (isEmptyString(title)) {
      throw new BadRequest('Title is required');
    }

    if (!isEmptyString(publishedYear) && !isValidYear(publishedYear)) {
      throw new BadRequest('Published Year is invalid');
    }

    if (!isEmptyString(plannedStartDate) && !isValidDate(plannedStartDate)) {
      throw new BadRequest('Planned Start Date is invalid');
    }

    if (!isEmptyString(plannedEndDate)) {
      if (!isValidDate(plannedEndDate)) {
        throw new BadRequest('Planned End Date is invalid');
      }

      if (isBefore(plannedEndDate, plannedStartDate)) {
        throw new BadRequest('Planned End Date is before Planned Start Date');
      }
    }

    if (!isEmptyString(actualStartDate) && !isValidDate(actualStartDate)) {
      throw new BadRequest('Actual Start Date is invalid');
    }

    if (!isEmptyString(actualEndDate)) {
      if (!isValidDate(actualEndDate)) {
        throw new BadRequest('Actual End Date is invalid');
      }

      if (isBefore(actualEndDate, actualStartDate)) {
        throw new BadRequest('Actual End Date is before Actual Start Date');
      }
    }

    next();
  }
};

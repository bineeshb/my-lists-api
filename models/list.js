import { getFormattedNow } from '../utils/date.js';

export default class List {
  #sheet;
  #mapperFn = (details, rowNumber) => ({ rowNumber, ...details });

  constructor(doc, sheetTitle, mapperFn = null) {
    this.#sheet = doc.sheetsByTitle[sheetTitle];

    if (typeof mapperFn === 'function') {
      this.#mapperFn = mapperFn;
    }
  }

  async getAll() {
    const rows = await this.#sheet.getRows();
    return rows.map((row, index) => this.#mapAllProps(row, index + 1));
  }

  async getOne(rowNumber) {
    const row = await this.#getRow(rowNumber);
    return this.#mapAllProps(row, rowNumber);
  }

  async addOne(request) {
    const formattedNow = getFormattedNow();
    const newRow = {
      ...this.#sanitizeValues(request),
      createdOn: formattedNow,
      updatedOn: formattedNow
    };
    await this.#sheet.addRow(newRow);

    return { message: 'Record added' };
  }

  async deleteOne(rowNumber) {
    const row = await this.#getRow(rowNumber);
    await row.delete();
    return { message: 'Record deleted' };
  }

  async updateOne(rowNumber, request) {
    const row = await this.#getRow(rowNumber);
    await row.assign({
      ...this.#sanitizeValues(request),
      updatedOn: getFormattedNow()
    });
    await row.save();
    return { message: 'Record updated' };
  }

  async #getRow(rowNumber) {
    let rows = [];
    rowNumber = rowNumber !== null && !isNaN(Number(rowNumber)) ? Number(rowNumber) : 0;

    if (rowNumber > 0) {
      rows = await this.#sheet.getRows({ offset: rowNumber - 1, limit: 1 });
    }

    if (rows.length) {
      return rows[0];
    }

    throw ({ statusCode: 404, message: 'No record found' });
  }

  #mapAllProps(row, rowNumber) {
    const details = row.toObject();
    const detailKeys = Object.keys(details);
    const allDetails = detailKeys.length
      ? detailKeys.reduce((acc, key) => ({
          ...acc,
          [key]: details[key] && details[key] !== '' ? details[key] : null
        }), {})
      : {};

    return this.#mapperFn(allDetails, rowNumber);
  }

  #sanitizeValues(details) {
    const detailKeys = Object.keys(details);
    return detailKeys.length
      ? detailKeys.reduce((acc, key) => ({
          ...acc,
          [key]: details[key] ?? ''
        }), {})
      : {};
  }
};
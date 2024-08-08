export const getFormattedDate = date => {
  if (date instanceof Date && !isNaN(date)) {
    return `${date.getFullYear()}-` + `0${date.getMonth() + 1}`.slice(-2) + '-' + `0${date.getDate()}`.slice(-2)
      + 'T' + `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2) + ':' + `0${date.getSeconds()}`.slice(-2);
  }

  return null;
};

export const getFormattedNow = () => getFormattedDate(new Date());

const dateLength = 'YYYY-MM-DD'.length;

export const isValidDateFormat = value => (!!value && value.trim().length === dateLength
        && /^[0-9]{1,4}-[01][0-9]-[0-3][0-9]$/.test(value));

export const isValidDate = value => isValidDateFormat(value) && !isNaN(Date.parse(value));

export const isValidYear = value => !!value && value.trim().length <= 4 && /^[0-9]+$/.test(value.trim());

export const isBefore = (dateString, compareDateString) => new Date(dateString) < new Date(compareDateString);

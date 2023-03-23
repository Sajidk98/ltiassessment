import moment from 'moment';

export const convertDateToDDMMYYYY = (date) => {
    let validDate = new Date(date)
    if (!date) return '';
    return moment(validDate, 'DD/MM/YYYY').format('DD-MM-YYYY');
  };
  
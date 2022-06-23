import dayjs from 'dayjs';

// Offers
const findTypeOffers = (offerType, allOffers) => allOffers.find(({type}) => type === offerType)?.offers || [];

const findSelectedOffers = (point, allOffers) => findTypeOffers(point.type, allOffers).filter(({id}) => point.offers.includes(id));


// Работа с датами
const formatDate = (date, dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ') => dayjs(date).format(dateFormat);

const getEventDuration = (dateFrom, dateTo) => Math.abs(dayjs(dateFrom).diff(dayjs(dateTo), 'minute'));

const getDateDifference = (date1, date2) => {
  const difference = getEventDuration(date1, date2);

  const days = Math.floor(difference / 60 / 24);
  const hours = Math.floor(difference % (60*24) / 60);
  const minutes = difference % 60;

  const formatedDays = `${days >= 1 ? `${days < 10 ? '0' : ''}${days}D`: ''}`;

  const noHours =  days >= 1 ? '00H' : '';
  const formatedHours = `${hours >= 1
    ? `${hours < 10 ? '0' : ''}${hours}H`
    : noHours}`;

  const formatedMinutes = `${minutes < 10 ? '0' : ''}${minutes}M`;


  return `${formatedDays} ${formatedHours} ${formatedMinutes}`;
};

const isFutureEvent = (event) => dayjs().isBefore(dayjs(event.dateFrom), 'minute');

const isPastEvent = (event) => dayjs().isAfter(dayjs(event.dateFrom), 'minute');

const findStartDate = (points) => points.reduce((startDate, point) => {
  const currentDate = dayjs(point.dateFrom);

  return startDate.isAfter(currentDate) ? currentDate : startDate;
}, dayjs(points[0]?.dateFrom));

const findEndDate = (points) => points.reduce((endDate, point) => {
  const currentDate = dayjs(point.dateTo);

  return endDate.isBefore(currentDate) ? currentDate : endDate;
}, dayjs(points[0]?.dateTo));

const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dayjs(dateB), 'minute');


// Cортировка
const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortByTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'minute');
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'minute');

  let sortValue = durationB - durationA;

  if (sortValue === 0) {
    sortValue = sortByDay(pointA, pointB);
  }

  return sortValue;
};

const sortByPrice = (pointA, pointB) => {
  let sortValue = pointB.basePrice - pointA.basePrice;

  if (sortValue === 0) {
    sortValue = sortByDay(pointA, pointB);
  }

  return sortValue;
};


export {
  findTypeOffers,
  findSelectedOffers,
  formatDate,
  getEventDuration,
  getDateDifference,
  isFutureEvent,
  isPastEvent,
  findStartDate,
  findEndDate,
  sortByDay,
  sortByTime,
  sortByPrice,
  isDatesEqual,
};


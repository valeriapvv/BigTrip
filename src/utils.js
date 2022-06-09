import dayjs from 'dayjs';

const getRandomNumber = (minNumber, maxNumber, digits = 0) => {
  // if (minNumber < 0 || maxNumber < 0) {
  //   throw new RangeError('Диапазон может быть только положительным');
  // }

  let randomNumber = maxNumber - Math.random() * (maxNumber - minNumber);
  randomNumber *= 10**digits;
  randomNumber = Math.round(randomNumber);
  randomNumber /= 10**digits;

  if (randomNumber < Math.min(minNumber, maxNumber) || randomNumber > Math.max(minNumber, maxNumber)) {
    throw new RangeError('Невозможно получить число с таким округлением в заданном диапазоне');
  }

  return randomNumber;
};

const getRandomInteger = (minNumber, maxNumber) => getRandomNumber(minNumber, maxNumber);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateRandomArray = (minLength, maxLength, generateElement) => Array.from(
  {length: getRandomInteger(minLength, maxLength)},
  generateElement,
);

const createRandomUniqueIntegerGenerator = (min, max) => {
  const generatedValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (generatedValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа диапазона');
    }

    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    generatedValues.push(currentValue);
    return currentValue;
  };
};

const findTypeOffers = (offerType, allOffers) => allOffers.find(({type}) => type === offerType).offers;

const findSelectedOffers = (point, allOffers) => findTypeOffers(point.type, allOffers).filter(({id}) => point.offers.includes(id));

// Работа с датами
const formatDate = (date, dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ') => dayjs(date).format(dateFormat);

const defaultStartDate = dayjs().add(getRandomInteger(-60*24*10, 60*24*5), 'minute');

const createNewDateChain = (startDate = defaultStartDate) => {
  // каждая следующая дата после предыдущейы
  let date = startDate;

  return ({
    from(timeBetweenEvents) {
      if (dayjs(date).isSame(dayjs(startDate), 'minute')) {
        return formatDate(date);
      }

      date = dayjs(date).add(timeBetweenEvents, 'minute');

      return formatDate(date);
    },
    to(eventDuration) {
      date = dayjs(date).add(eventDuration, 'minute');

      return formatDate(date);
    }
  });
};

const getEventDuration = (dateFrom, dateTo) => Math.abs(dayjs(dateFrom).diff(dayjs(dateTo), 'minute'));

const getDateDifference = (date1, date2) => {
  const difference = getEventDuration(date1, date2);

  const days = Math.floor(difference / 60 / 24);
  const hours = Math.floor(difference % (60*24) / 60);
  const minutes = difference % 60;

  const formatedDays = `${days >= 1 ? `${days < 10 ? '0' : ''}${days}D`: ''}`;
  const formatedHours = `${hours >= 1
    ? `${hours < 10 ? '0' : ''}${hours}H`
    : days >= 1
      ? '00H'
      : ''}`;
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


//удалить
// const updateItem = (update, items) => {
//   const index = items.findIndex((item) => item.id === update.id);

//   if (index === -1) {
//     return items;
//   }

//   return [...items.slice(0, index), update, ...items.slice(index + 1)];
// };

// сортировка
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
  getRandomArrayElement,
  getRandomInteger,
  generateRandomArray,
  createRandomUniqueIntegerGenerator,
  findTypeOffers,
  findSelectedOffers,
  createNewDateChain,
  formatDate,
  getEventDuration,
  getDateDifference,
  isFutureEvent,
  isPastEvent,
  findStartDate,
  findEndDate,
  // updateItem,
  sortByDay,
  sortByTime,
  sortByPrice,
  isDatesEqual,

};


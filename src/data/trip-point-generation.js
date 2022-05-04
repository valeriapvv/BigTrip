import {getRandomInteger, getRandomArrayElement, generateRandomArray, createRandomUniqueIntegerGenerator} from '../utils.js';
import {types, points} from './data.js';

const dayjs = require('dayjs');

const setOfferListGenerator = (offerType) => {
  let id = 0;

  return () => generateRandomArray([1, 5], () => {
    id++;

    return ({
      'id': id,
      'title': `${offerType} Offer ${id}`,
      'price': getRandomInteger(20, 200)
    });
  });

};

const generateDestination = () => {
  const {description, name, pictures} = getRandomArrayElement(points);

  return ({
    'description': description,
    'name': name,
    'pictures': pictures
  });
};

const generateOffer = (offerType) => {
  const genarateOffers = setOfferListGenerator(offerType);

  return ({
    'type': offerType,
    'offers': genarateOffers()
  });
};

const getTypeOffer = (offerTypes) => {
  const typeOffer = {};

  offerTypes.forEach((it) => {
    typeOffer[it.toUpperCase()] = generateOffer(it);
  });

  return typeOffer;
};

// Cловарь ключами TYPE: {"type": type, offers: [{id, title, price}]}
const TypeOffer = getTypeOffer(types);

const getActiveOffers = (offerType) => {
  const typeKey = offerType.toUpperCase();
  const offerListLength = TypeOffer[typeKey].offers.length;
  const getOfferId = createRandomUniqueIntegerGenerator(1, offerListLength);

  const activeOffersIds = generateRandomArray([0, offerListLength], getOfferId);

  return activeOffersIds.sort((a,b) => a - b);
};

const createNewDateChain = (startDate = dayjs()) => {
  let date = startDate;

  return ({
    from() {
      date = dayjs(date).add(getRandomInteger(60, 60*24), 'minute');

      return date;
    },
    to(eventDuration) {
      date = dayjs(date).add(eventDuration, 'minute');

      return date;
    }
  });
};

const generateDate = createNewDateChain();

const generatePoint = (id) => {
  const destination = generateDestination();
  const type = getRandomArrayElement(types);
  const dateFrom = generateDate.from();
  const duration = getRandomInteger(30, 60*4);
  const dateTo = generateDate.to(duration);

  return ({
    'base_price': getRandomInteger(10, 10**3),
    'date_from': dateFrom,
    'date_to': dateTo,
    'duration': duration,
    'destination': destination,
    'id': id,
    'is_favorite': !getRandomInteger(0, 1),
    'offers': getActiveOffers(type),
    'type': type
  });
};

export {generatePoint, TypeOffer};

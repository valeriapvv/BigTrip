import {getRandomInteger, getRandomArrayElement, generateRandomArray, createRandomUniqueIntegerGenerator} from '../utils.js';
import {TYPES, POINTS} from './data.js';

const dayjs = require('dayjs');

const destinations = POINTS.map((it) => ({
  'name': it,
  'description': `${it}'s description: Iceland is an island, a European country, located midway between North America and mainland Europe. It lies just below the Arctic Circle between 64 and 66 degrees north. The capital is Reykjavik. It is the northernmost capital in the world and is located exactly halfway between New York and Moscow.`,
  'pictures': generateRandomArray([0, 10], () => ({
    'src': `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
    'description': `${it}'s photo`
  })),
}));

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

const generateOffer = (offerType) => {
  const genarateOffers = setOfferListGenerator(offerType);

  return ({
    'type': offerType,
    'offers': genarateOffers()
  });
};

const offers = TYPES.map((it) => generateOffer(it));

const findTypeOffers = (offerType) => offers.find(({type}) => type === offerType).offers;

const getActiveOffers = (offerType) => {
  const typeOffers = findTypeOffers(offerType);
  const offerListLength = typeOffers.length;

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
  const destination = getRandomArrayElement(destinations);
  const type = getRandomArrayElement(TYPES);
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

export {generatePoint, destinations, offers, findTypeOffers};

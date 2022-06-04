import {
  getRandomInteger,
  getRandomArrayElement,
  generateRandomArray,
  createRandomUniqueIntegerGenerator,
  findTypeOffers,
  createNewDateChain,
} from '../utils.js';
import {TYPES, POINTS} from './constants.js';

const destinations = POINTS.map((it) => ({
  'name': it,
  'description': `${it}'s description: Iceland is an island, a European country, located midway between North America and mainland Europe. It lies just below the Arctic Circle between 64 and 66 degrees north. The capital is Reykjavik. It is the northernmost capital in the world and is located exactly halfway between New York and Moscow.`,
  'pictures': generateRandomArray(0, 10,
    () => ({
      'src': `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      'description': `${it}'s photo`
    })
  ),
}));

const getOffersGenerator = (offerType) => {
  let id = 0;

  return () => generateRandomArray(0, 5,
    () => {
      id++;

      return ({
        'id': id,
        'title': `${offerType} Offer ${id}`,
        'price': getRandomInteger(20, 200)
      });
    });
};

const generateOffer = (offerType) => {
  const genarateOffers = getOffersGenerator(offerType);

  return ({
    'type': offerType,
    'offers': genarateOffers()
  });
};

const offers = TYPES.map((it) => generateOffer(it));

const getActiveOffers = (offerType) => {
  const typeOffers = findTypeOffers(offerType, offers);
  const offerListLength = typeOffers.length;

  const getOfferId = createRandomUniqueIntegerGenerator(1, offerListLength);

  const activeOffersIds = generateRandomArray(0, offerListLength, getOfferId);

  return activeOffersIds.sort((a,b) => a - b);
};

const generateDate = createNewDateChain();

const generatePoint = (id) => {
  const destination = getRandomArrayElement(destinations);
  const type = getRandomArrayElement(TYPES);
  const dateFrom = generateDate.from(getRandomInteger(20, 60*24));
  const dateTo = generateDate.to(getRandomInteger(20, 60*24));

  return ({
    'basePrice': getRandomInteger(10, 10**3),
    'dateFrom': dateFrom,
    'dateTo': dateTo,
    'destination': destination,
    'id': id,
    'isFavorite': !getRandomInteger(0, 1),
    'offers': getActiveOffers(type),
    'type': type
  });
};

export {generatePoint, destinations, offers};

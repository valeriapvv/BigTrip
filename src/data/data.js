import {generateRandomArray, getRandomInteger} from '../utils.js';

const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const pointNames = [
  'Reykjavík',
  'Kópavogur',
  'Hafnarfjörður',
  'Reykjanesbær',
  'Akureyri',
  'Garðabær',
  'Mosfellsbær'
];

const points = pointNames.map((it) => ({
  'name': it,
  'description': `${it}'s description: Iceland is an island, a European country, located midway between North America and mainland Europe. It lies just below the Arctic Circle between 64 and 66 degrees north. The capital is Reykjavik. It is the northernmost capital in the world and is located exactly halfway between New York and Moscow.`,
  'pictures': generateRandomArray([0, 10], () => ({
    'src': `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
    'description': `${it}'s photo`
  })),
}));

export {types, points};

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const POINTS = [
  'Reykjavík',
  'Kópavogur',
  'Hafnarfjörður',
  'Reykjanesbær',
  'Akureyri',
  'Garðabær',
  'Mosfellsbær',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export {TYPES, POINTS, FilterType, SortType};

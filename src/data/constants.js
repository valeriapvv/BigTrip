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

const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FormType = {
  EDIT: 'edit',
  CREATE: 'create',
};

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

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  DELETE: 'DELETE',
};

export {TYPES, POINTS, PointMode, FormType, FilterType, SortType, UpdateType, UserAction};

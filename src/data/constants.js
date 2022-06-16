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
  INIT: 'INIT',
};

const UserAction = {
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  DELETE: 'DELETE',
};

export {PointMode, FormType, FilterType, SortType, UpdateType, UserAction};

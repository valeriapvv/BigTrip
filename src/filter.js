import {FilterType} from './data/constants.js';
import {isFutureEvent, isPastEvent} from './utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastEvent(point)),
};

const createFilters = (points) => Object.entries(filter)
  .map(([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length,
  }
  ));

export {filter, createFilters};

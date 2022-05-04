import {generatePoint} from '../data/trip-point-generation.js';

export default class TripEventsModel {
  tripEvents = (() => {
    let id = 0;

    return Array.from({length: 10}, () => {
      id++;
      return generatePoint(id);});
  })();

  getTripEvents = () => this.tripEvents;
}

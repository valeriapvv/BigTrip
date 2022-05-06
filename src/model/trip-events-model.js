import {generatePoint, destinations, offers} from '../data/trip-data-generation.js';

export default class TripEventsModel {
  #tripEvents = (() => {
    let id = 0;

    return Array.from({length: 1}, () => {
      id++;
      return generatePoint(id);
    });
  })();

  #destinations = destinations;
  #offers = offers;

  get tripEvents() {
    return this.#tripEvents;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}

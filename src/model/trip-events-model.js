import {generatePoint, destinations, offers} from '../data/trip-data-generation.js';

export default class TripEventsModel {
  tripEvents = (() => {
    let id = 0;

    return Array.from({length: 10}, () => {
      id++;
      return generatePoint(id);});
  })();

  destinations = destinations;
  offers = offers;

  getTripEvents = () => this.tripEvents;

  getDestinations = () => this.destinations;
  getOffers = () => this.offers;

}

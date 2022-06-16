import Observable from '../framework/observable.js';
import {generatePoint, destinations, offers} from '../data/trip-data-generation.js';

export default class TripEventsModel extends Observable {
  #tripEvents = (() => {
    let id = 0;

    return Array.from({length: 10}, () => generatePoint(++id));
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

  updateTripEvent = (updateType, update) => {
    const index = this.#tripEvents.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Невозможно обновить несуществующую точку маршрута');
    }

    this.#tripEvents = [...this.#tripEvents.slice(0, index), update, ...this.#tripEvents.slice(index + 1)];

    this._notify(updateType, update);
  };

  addTripEvent = (updateType, update) => {
    this.#tripEvents = [update, ...this.#tripEvents];

    this._notify(updateType, update);
  };

  deleteTripEvent = (updateType, update) => {
    const index = this.#tripEvents.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Невозможно удалить несуществующую точку маршрута');
    }

    this.#tripEvents = [...this.#tripEvents.slice(0, index), ...this.#tripEvents.slice(index + 1)];

    this._notify(updateType);
  };
}

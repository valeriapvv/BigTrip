import Observable from '../framework/observable.js';
import {UpdateType} from '../data/constants.js';
// import {generatePoint, destinations, offers} from '../data/trip-data-generation.js';

export default class TripEventsModel extends Observable {
  #tripEventsApiService = null;
  // #tripEvents = (() => {
  //   let id = 0;

  //   return Array.from({length: 10}, () => generatePoint(++id));
  // })();

  // #destinations = destinations;
  // #offers = offers;
  #tripEvents = [];
  #destinations = [];
  #offers = [];

  constructor(tripEventsApiService) {
    super();
    this.#tripEventsApiService = tripEventsApiService;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const points = await this.#tripEventsApiService.tripEvents;
      this.#tripEvents = points.map(this.#adaptToClient);
      this.#destinations = (await this.#tripEventsApiService.destinations).slice();
      this.#offers = await this.#tripEventsApiService.offers;
    } catch {
      this.#tripEvents = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point.base_price,
      dateFrom: point.date_from,
      dateTo: point.date_to,
      isFavorite: point.is_favorite,
    };

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  };

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

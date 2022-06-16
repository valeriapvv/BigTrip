import Observable from '../framework/observable.js';
import {UpdateType} from '../data/constants.js';

export default class TripEventsModel extends Observable {
  #tripEventsApiService = null;

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

  updateTripEvent = async (updateType, update) => {
    const index = this.#tripEvents.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Невозможно обновить несуществующую точку маршрута');
    }

    try {
      const responce = await this.#tripEventsApiService.updateTripEvent(update);
      const updatedPoint = this.#adaptToClient(responce);
      this.#tripEvents = [...this.#tripEvents.slice(0, index), updatedPoint, ...this.#tripEvents.slice(index + 1)];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Не удалось обновить данные');
    }
  };

  deleteTripEvent = async (updateType, update) => {
    const index = this.#tripEvents.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Невозможно удалить несуществующую точку маршрута');
    }

    try {
      await this.#tripEventsApiService.deleteTripEvent(update);
      this.#tripEvents = [...this.#tripEvents.slice(0, index), ...this.#tripEvents.slice(index + 1)];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Не удалось удалить точку маршрута');
    }
  };

  addTripEvent = async (updateType, update) => {
    try {
      const responce = await this.#tripEventsApiService.addTripEvent(update);
      const updatedPoint = this.#adaptToClient(responce);
      this.#tripEvents = [updatedPoint, ...this.#tripEvents];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Не удалось обновить данные');
    }
  };
}

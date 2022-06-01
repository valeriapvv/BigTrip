import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';

import TripEventPresenter from './trip-event-presenter.js';

import {render} from '../framework/render.js';
import {updateItem} from '../utils.js';

export default class TripEventsBodyPresenter {
  #tripEventsBodyContainer = null;
  #tripEventsModel = null;
  #tripEventListComponent = null;
  #tripEvents = null;
  #destinations = null;
  #offers = null;
  #tripEventListContainer = null;
  #emptyTripListMessageComponent = null;
  #tripSortComponent = null;
  #tripSortElement = null;
  #tripEventPresenter = new Map ();

  constructor(tripEventsBodyContainer, tripEventsModel) {
    this.#tripEventsBodyContainer = tripEventsBodyContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  set tripEvents(filteredTripEvents) {
    this.#tripEvents = filteredTripEvents;
  }

  init = () => {

    if (this.#tripEvents === null) {
      this.#tripEvents = this.#tripEventsModel.tripEvents;
      this.#destinations = this.#tripEventsModel.destinations;
      this.#offers = this.#tripEventsModel.offers;

      this.#tripSortComponent = new TripSortView();
      render(this.#tripSortComponent, this.#tripEventsBodyContainer);

      this.#tripEventListComponent = new TripEventListView();
      render(this.#tripEventListComponent, this.#tripEventsBodyContainer);
    } else {
      this.#clearTripEventList();
    }

    this.#renderTripEvents(this.#tripEvents);
  };

  #renderTripEvents = (tripEvents) => {
    tripEvents.forEach((it) => this.#renderTripEvent(it));
  };

  #renderTripEvent = (tripEvent) => {
    const point = new TripEventPresenter(this.#tripEventListComponent, this.#updateTripEvent, this.#resetTripEvents);
    point.init(tripEvent, this.#offers, this.#destinations);
    this.#tripEventPresenter.set(tripEvent.id, point);
  };

  #updateTripEvent = (update) => {
    this.#tripEvents = updateItem(update, this.#tripEvents);
    this.#tripEventPresenter.get(update.id).init(update);
  };

  #resetTripEvents = () => {
    this.#tripEventPresenter.forEach((point) => point.resetView());
  };

  #clearTripEventList = () => {
    this.#tripEventPresenter.forEach((point) => point.destroy());
    this.#tripEventPresenter.clear();
  };
}

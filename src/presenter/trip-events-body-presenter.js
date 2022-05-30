import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import EmptyTripListMessageView from '../view/empty-trip-list-message-view.js';

import TripEventPresenter from './trip-event-presenter.js';

import {render} from '../framework/render.js';

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

    if (!this.#tripEvents) {
      this.#tripEvents = this.#tripEventsModel.tripEvents;
      this.#destinations = this.#tripEventsModel.destinations;
      this.#offers = this.#tripEventsModel.offers;

      this.#tripSortComponent = new TripSortView();

      render(this.#tripSortComponent, this.#tripEventsBodyContainer);
    } else {
      this.#tripEventListComponent.element.remove();
      this.#tripEventListComponent.removeElement();
      this.#tripEventListContainer.remove();
    }

    this.#tripEventListComponent = new TripEventListView();
    render(this.#tripEventListComponent, this.#tripEventsBodyContainer);

    this.#tripEventListContainer = this.#tripEventListComponent.element;

    if (!this.#tripEvents.length) {
      this.#renderEmptyTripListMessage();
      return;
    }

    this.#renderTripEvents(this.#tripEvents);
  };

  #renderTripEvents = (tripEvents) => {
    tripEvents.forEach((it) => this.#renderTripEvent(it));
  };

  #renderTripEvent = (tripEvent) => {
    const point = new TripEventPresenter(this.#tripEventListComponent);
    point.init(tripEvent, this.#offers, this.#destinations);
  };

  #renderEmptyTripListMessage = () => {
    const tripFilters = document.querySelector('.trip-filters')['trip-filter'];
    const tripFilterValue = tripFilters.value.toLowerCase();

    const filterValueToMessage = {
      everything:'Click New Event to create your first point',
      past: 'There are no past events now',
      future:'There are no future events now',
    };

    const message = filterValueToMessage[tripFilterValue];

    this.#emptyTripListMessageComponent = new EmptyTripListMessageView(message);
    const emptyTripListMessage = this.#emptyTripListMessageComponent.element;

    this.#tripEventsBodyContainer.replaceChild(emptyTripListMessage, this.#tripEventListContainer);

    this.#tripSortElement = this.#tripSortComponent.element;
    this.#tripSortElement.remove();
  };
}

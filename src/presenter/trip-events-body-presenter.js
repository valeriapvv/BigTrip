import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import {render} from '../framework/render.js';
import {updateItem, sortByDay, sortByTime, sortByPrice} from '../utils.js';
import {SortType} from '../data/constants.js';


export default class TripEventsBodyPresenter {
  #tripEventsBodyContainer = null;
  #tripEventListComponent = new TripEventListView();
  #tripEventsModel = null;
  #tripEvents = null;
  #destinations = null;
  #offers = null;
  #tripEventPresenter = new Map ();
  #tripSortComponent = new TripSortView();
  #currentSortType = SortType.DAY;
  // #tripEventsToSort = null;

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
      // this.#tripEventsToSort = this.#tripEvents;
      this.#destinations = this.#tripEventsModel.destinations;
      this.#offers = this.#tripEventsModel.offers;

      this.#renderSort();

      render(this.#tripEventListComponent, this.#tripEventsBodyContainer);
    } else {
      this.#clearTripEventList();
    }

    this.#renderTripEvents(this.#tripEvents);
  };

  #renderSort = () => {
    render(this.#tripSortComponent, this.#tripEventsBodyContainer);
    this.#tripSortComponent.setSortChangeHandler(this.#sortChangeHandler);
  };

  #sortChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripEvents(sortType);

    this.#clearTripEventList();

    this.#renderTripEvents(this.#tripEvents);
  };

  #sortTripEvents = (sortType, tripEvents) => {
    this.#currentSortType = sortType;

    switch (sortType) {
      case SortType.TIME:
        this.#tripEvents.sort(sortByTime);
        return;
      case SortType.PRICE:
        this.#tripEvents.sort(sortByPrice);
        return;
      default:
        this.#tripEvents.sort(sortByDay);
    }
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
    // this.#tripEventsToSort = this.#tripEvents;
    this.#tripEventPresenter.get(update.id).init(update);
    // console.log(this.#tripEvents.find(it => update.id === it.id))
  };

  #resetTripEvents = () => {
    this.#tripEventPresenter.forEach((point) => point.resetView());
  };

  #clearTripEventList = () => {
    this.#tripEventPresenter.forEach((point) => point.destroy());
    this.#tripEventPresenter.clear();
  };
}

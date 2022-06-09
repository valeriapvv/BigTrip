import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import {render, remove} from '../framework/render.js';
import {sortByDay, sortByTime, sortByPrice} from '../utils.js';
import {SortType, UpdateType, UserAction} from '../data/constants.js';
import {filter} from '../filter.js';


export default class TripEventsBodyPresenter {
  #tripEventsBodyContainer = null;
  #tripEventListComponent = new TripEventListView();
  #tripEventsModel = null;
  #tripFiltersModel = null;
  // #tripEvents = null;
  #destinations = null;
  #offers = null;
  #tripEventPresenter = new Map ();

  #currentSortType = SortType.DAY;
  #tripSortComponent = null;

  constructor(tripEventsBodyContainer, tripEventsModel, tripFiltersModel) {
    this.#tripEventsBodyContainer = tripEventsBodyContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#tripFiltersModel = tripFiltersModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#tripFiltersModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
    const filterType = this.#tripFiltersModel.filter;
    const tripEvents = this.#tripEventsModel.tripEvents;
    const filteredTasks = filter[filterType](tripEvents);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredTasks.sort(sortByTime);
      case SortType.PRICE:
        return filteredTasks.sort(sortByPrice);
      case SortType.DAY:
        return filteredTasks.sort(sortByDay);
    }

    throw new Error('Ошибка в текущем типе сортировки');
  }

  init = () => {
    this.#destinations = this.#tripEventsModel.destinations;
    this.#offers = this.#tripEventsModel.offers;

    this.#renderItinerary();
  };

  #renderItinerary = () => {
    if (this.#tripSortComponent === null) {
      this.#renderSort();
      // console.log('create Sort');
    }

    render(this.#tripEventListComponent, this.#tripEventsBodyContainer);

    this.#renderTripEvents(this.tripEvents);
  };

  #renderSort = () => {
    this.#tripSortComponent = new TripSortView(this.#currentSortType);
    render(this.#tripSortComponent, this.#tripEventsBodyContainer);
    this.#tripSortComponent.setSortChangeHandler(this.#sortChangeHandler);
  };

  #sortChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTripEventList();

    this.#renderTripEvents(this.tripEvents);
  };

  #renderTripEvents = (tripEvents) => {
    tripEvents.forEach((it) => this.#renderTripEvent(it));
  };

  #renderTripEvent = (tripEvent) => {
    const point = new TripEventPresenter(
      this.#tripEventListComponent,
      this.#handleViewAction,
      this.#resetTripEvents
    );
    point.init(
      tripEvent,
      this.#offers,
      this.#destinations,
      this.#currentSortType
    );
    this.#tripEventPresenter.set(tripEvent.id, point);
  };

  #handleViewAction = (actionType, updateType, update) => {

    switch (actionType) {
      case UserAction.UPDATE:
        this.#tripEventsModel.updateTripEvent(updateType, update);
        break;
      case UserAction.ADD:
        this.#tripEventsModel.addTripEvent(updateType, update);
        break;
      case UserAction.DELETE:
        this.#tripEventsModel.deleteTripEvent(updateType, update);
        break;
    }
    // this.tripEvents = updateItem(update, this.tripEvents);
    // this.#tripEventPresenter.get(update.id).init(update);
    // console.log(this.tripEvents.find(it => update.id === it.id))
  };

  #handleModelEvent = (updateType, update) => {

    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenter.get(update.id).init(update);
        break;
      case UpdateType.MINOR:
        this.#clearTripEventList();
        this.#renderItinerary();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEventList({resetSortType: true});
        this.#renderItinerary();
        break;
    }
  };

  #resetTripEvents = () => {
    this.#tripEventPresenter.forEach((point) => point.resetView());
  };

  #clearTripEventList = ({resetSortType = false} = {}) => {
    if (resetSortType && this.#currentSortType !== SortType.DAY) {
      this.#currentSortType = SortType.DAY;
      remove(this.#tripSortComponent);
      this.#tripSortComponent = null;
      // console.log('delete Sort');
    }

    this.#tripEventPresenter.forEach((point) => point.destroy());
    this.#tripEventPresenter.clear();
  };
}

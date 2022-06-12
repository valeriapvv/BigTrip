import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import EmptyTripListMessageView from '../view/empty-trip-list-message-view.js';
import {render, remove} from '../framework/render.js';
import {sortByDay, sortByTime, sortByPrice} from '../utils.js';
import {SortType, UpdateType, UserAction, FilterType} from '../data/constants.js';
import {filter} from '../filter.js';


export default class TripEventsBodyPresenter {
  #tripEventsBodyContainer = null;
  #tripEventListComponent = new TripEventListView();
  #tripEventsModel = null;
  #tripFiltersModel = null;
  #destinations = null;
  #offers = null;
  #tripEventPresenter = new Map();

  #currentSortType = SortType.DAY;
  #tripSortComponent = null;
  #currentFilter = FilterType.EVETYTHING;

  #noPointsMessageComponent = null;

  constructor(tripEventsBodyContainer, tripEventsModel, tripFiltersModel) {
    this.#tripEventsBodyContainer = tripEventsBodyContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#destinations = this.#tripEventsModel.destinations;
    this.#offers = this.#tripEventsModel.offers;
    this.#tripFiltersModel = tripFiltersModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#tripFiltersModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
    this.#currentFilter = this.#tripFiltersModel.filter;
    const tripEvents = this.#tripEventsModel.tripEvents;
    const filteredPoints = filter[this.#currentFilter](tripEvents);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
    }

    throw new Error('Ошибка в текущем типе сортировки');
  }

  init = () => {

    this.#renderItinerary();
  };

  #renderItinerary = () => {
    if (!this.tripEvents.length) {
      this.#renderNoPointsMessage();
      return;
    }

    if (this.#tripSortComponent === null) {
      this.#renderSort();
      // console.log('create Sort');
    }

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

  #renderNoPointsMessage = () => {
    const filterType = this.#tripEventsModel.tripEvents.length ? this.#currentFilter : FilterType.EVERYTHING;
    this.#noPointsMessageComponent = new EmptyTripListMessageView(filterType);
    render(this.#noPointsMessageComponent, this.#tripEventsBodyContainer);
  };

  #renderTripEvents = (tripEvents) => {
    render(this.#tripEventListComponent, this.#tripEventsBodyContainer);
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
    if (resetSortType && this.#currentSortType !== SortType.DAY || !this.tripEvents.length) {
      this.#currentSortType = SortType.DAY;
      remove(this.#tripSortComponent);
      this.#tripSortComponent = null;
      // console.log('delete Sort');
    }

    if (this.#noPointsMessageComponent) {
      remove(this.#noPointsMessageComponent);
      this.#noPointsMessageComponent = null;
    }

    this.#tripEventPresenter.forEach((point) => point.destroy());
    this.#tripEventPresenter.clear();

    remove(this.#tripEventListComponent);
  };
}

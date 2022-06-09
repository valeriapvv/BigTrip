import TripFiltersView from '../view/trip-filters-view.js';
import {render, replace, remove} from '../framework/render.js';
import {getFilters} from '../filter.js';
import {UpdateType} from '../data/constants.js';

export default class TripFiltersPresenter {
  #tripEventsModel = null;
  #tripFiltersModel = null;

  #tripFiltersContainer = null;
  #tripFiltersComponent = null;

  constructor(tripEventsModel, tripFiltersModel, tripFiltersContainer) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripFiltersModel = tripFiltersModel;
    this.#tripFiltersContainer = tripFiltersContainer;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#tripFiltersModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents () {
    return this.#tripEventsModel.tripEvents;
  }

  get filters() {
    return getFilters(this.tripEvents);
  }

  init = (/*, tripEventListPresenter*/) => {
    const prevTripFiltersComponent = this.#tripFiltersComponent;

    this.#tripFiltersComponent = new TripFiltersView(this.filters, this.#tripFiltersModel.filter);
    this.#tripFiltersComponent.setFiltersChangeHandler(this.#filtersChangeHandler);

    if (prevTripFiltersComponent === null) {
      render(this.#tripFiltersComponent, this.#tripFiltersContainer);
      return;
    }

    replace(this.#tripFiltersComponent, prevTripFiltersComponent);
    remove(prevTripFiltersComponent);
  };

  #handleModelEvent = () => {
    this.init()
  };

  #filtersChangeHandler = (filterType) => {
    this.#tripFiltersModel.setFilter(UpdateType.MAJOR, filterType);
  };

}

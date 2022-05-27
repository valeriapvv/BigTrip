import TripFiltersView from '../view/trip-filters-view.js';
import {render} from '../render.js';


export default class TripFiltersPresenter {
  #tripEvents = null;
  #tripFilters = null;
  #tripFiltersContainer = null;
  #tripFiltersComponent = null;

  constructor(tripEvents, tripFilters, tripFiltersContainer) {
    this.#tripEvents = tripEvents;
    this.#tripFilters = tripFilters;
    this.#tripFiltersContainer = tripFiltersContainer;
  }

  init = (tripEventListPresenter) => {
    this.#tripFiltersComponent = new TripFiltersView(this.#tripFilters);
    this.#tripFiltersComponent.setFiltersChangeHandler(this.#tripEvents, tripEventListPresenter);

    render(this.#tripFiltersComponent, this.#tripFiltersContainer);
  };
}

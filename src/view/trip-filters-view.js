import AbstractView from '../framework/view/abstract-view.js';
import {filter} from '../filter.js';

const createTripFilterItemTemplate = (tripFilter, isChecked) => {
  const {name, count} = tripFilter;

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" 
      ${count === 0 ? 'disabled' : ''}
      ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name.replace(name[0], name[0].toUpperCase())} ${count}</label>
    </div>
  `);
};

const createTripFiltersTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
     ${filters.map((it, index) => createTripFilterItemTemplate(it, index === 0)).join('')}
     <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`
);


export default class TripFiltersView extends AbstractView {
  #filters = null;
  #filterValue = null;
  #tripListPresenter = null;
  #tripEvents = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters);
  }

  setFiltersChangeHandler = (tripEvents, tripListPresenter) => {
    this.#tripListPresenter = tripListPresenter;
    this.#tripEvents = tripEvents;
    this.element.addEventListener('change', this.#filtersChangeHandler);
  };

  #filtersChangeHandler = () => {
    const value = this.element['trip-filter'].value;
    this.#tripListPresenter.tripEvents = filter[value](this.#tripEvents);
    this.#tripListPresenter.init();
  };
}

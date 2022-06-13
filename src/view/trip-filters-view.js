import AbstractView from '../framework/view/abstract-view.js';

const createTripFilterItemTemplate = (tripFilter, currentFilterType) => {
  const {name, count} = tripFilter;

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" 
      ${count === 0 ? 'disabled' : ''}
      ${currentFilterType === name ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name.replace(name[0], name[0].toUpperCase())} ${count}</label>
    </div>
  `);
};

const createTripFiltersTemplate = (filters, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
     ${filters.map((it) => createTripFilterItemTemplate(it, currentFilterType)).join('')}
     <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`
);


export default class TripFiltersView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  removeElement () {
    this.element.removeEventListener('change', this.#filtersChangeHandler);
    super.removeElement();
  }

  get template() {
    return createTripFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  setFiltersChangeHandler = (onChange) => {
    this._callback.onChange = onChange;
    this.element.addEventListener('change', this.#filtersChangeHandler);
  };

  #filtersChangeHandler = (evt) => {
    this._callback.onChange(evt.target.value);
  };
}

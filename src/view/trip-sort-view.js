import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../data/constants.js';

const createTripSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     <div class="trip-sort__item  trip-sort__item--day">
       <input id="sort-day" class="trip-sort__input  visually-hidden" 
       data-sort-type="${SortType.DAY}" ${currentSortType === SortType.DAY ? 'checked' : ''}
       type="radio" name="trip-sort" value="sort-day" >
       <label class="trip-sort__btn" for="sort-day">Day</label>
     </div>

     <div class="trip-sort__item  trip-sort__item--event">
       <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" 
       name="trip-sort" value="sort-event" disabled>
       <label class="trip-sort__btn" for="sort-event">Event</label>
     </div>

     <div class="trip-sort__item  trip-sort__item--time">
       <input id="sort-time" class="trip-sort__input  visually-hidden"
       data-sort-type="${SortType.TIME}" ${currentSortType === SortType.TIME ? 'checked' : ''}
        type="radio" name="trip-sort" value="sort-time">
       <label class="trip-sort__btn" for="sort-time">Time</label>
     </div>

     <div class="trip-sort__item  trip-sort__item--price">
       <input id="sort-price" class="trip-sort__input  visually-hidden"
       data-sort-type="${SortType.PRICE}" ${currentSortType === SortType.PRICE ? 'checked' : ''}
        type="radio" name="trip-sort" value="sort-price">
       <label class="trip-sort__btn" for="sort-price">Price</label>
     </div>

     <div class="trip-sort__item  trip-sort__item--offer">
       <input id="sort-offer" class="trip-sort__input  visually-hidden"
       type="radio" name="trip-sort" value="sort-offer" disabled>
       <label class="trip-sort__btn" for="sort-offer">Offers</label>
     </div>
   </form>`
);

export default class TripSortView extends AbstractView {
  #currentSortType = null;

  constructor(sortType) {
    super();
    this.#currentSortType = sortType;
  }

  removeElement () {
    this.element.removeEventListener('change', this.#sortChangeHandler);
    super.removeElement();
  }

  get template() {
    return createTripSortTemplate(this.#currentSortType);
  }

  setSortChangeHandler = (onChange) => {
    this._callback.change = onChange;
    this.element.addEventListener('change', this.#sortChangeHandler);
  };

  #sortChangeHandler = (evt) => {
    const sortType = evt.target.dataset.sortType;

    this._callback.change(sortType);
  };
}

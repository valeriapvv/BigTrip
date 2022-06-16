import AbstractView from '../framework/view/abstract-view.js';
import {formatDate, getDateDifference, findSelectedOffers} from '../utils.js';
import he from 'he';

const createSelectedOffersTemplate = (selectedOffers) => selectedOffers.map((it) => (
  `<li class="event__offer">
    <span class="event__offer-title">${it.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${it.price}</span>
   </li>`)
).join('');

const createTripEventTemplate = (tripEvent, allOffers) => {
  const {
    basePrice,
    destination,
    dateFrom,
    dateTo,
    isFavorite,
    type
  } = tripEvent;
  const {name} = destination;

  const humanizedDuration = getDateDifference(dateFrom, dateTo);

  const offerList = findSelectedOffers(tripEvent, allOffers);

  return (`<li class="trip-events__item">
         <div class="event">
           <time class="event__date" datetime="${formatDate(dateFrom, 'YYYY-MM-DD')}">${formatDate(dateFrom,'MMM D')}</time>
           <div class="event__type">
             <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
           </div>
           <h3 class="event__title">${type} ${he.encode(name)}</h3>
           <div class="event__schedule">
             <p class="event__time">
               <time class="event__start-time" datetime="${formatDate(dateFrom, 'YYYY-MM-DDTHH:mm')}">
               ${formatDate(dateFrom, 'HH:mm')}</time>
               &mdash;
               <time class="event__end-time" datetime="${formatDate(dateTo, 'YYYY-MM-DDTHH:mm')}">
               ${formatDate(dateTo, 'HH:mm')}</time>
             </p>
             <p class="event__duration">${humanizedDuration}</p>
           </div>
           <p class="event__price">
             &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
           </p>
           <h4 class="visually-hidden">Offers:</h4>
           <ul class="event__selected-offers">
             ${createSelectedOffersTemplate(offerList)}
           </ul>
           <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
             <span class="visually-hidden">Add to favorite</span>
             <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
               <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
             </svg>
           </button>
           <button class="event__rollup-btn" type="button">
             <span class="visually-hidden">Open event</span>
           </button>
         </div>
       </li>`);
};

export default class TripEventView extends AbstractView {
  #tripEvent = null;
  #destinations = null;
  #offers = null;
  #rollupButton = null;
  #favoriteButton = null;

  constructor(tripEvent, allOffers, destinations) {
    super();
    this.#tripEvent = tripEvent;
    this.#destinations = destinations;
    this.#offers = allOffers;
  }

  get template() {
    return createTripEventTemplate(this.#tripEvent, this.#offers);
  }

  removeElement() {
    this.#removeEventListeners();
    super.removeElement();
  }

  setRollupButtonClickHandler = (onClick) => {
    this._callback.click = onClick;
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');

    this.#rollupButton.addEventListener('click', this.#rollupButtonClickHandler);
  };

  setFavoriteButtonClickHandler = (onFavoriteButtonClick) => {
    this._callback.favoriteButtonClick = onFavoriteButtonClick;
    this.#favoriteButton = this.element.querySelector('.event__favorite-btn');
    this.#favoriteButton.addEventListener('click', this.#onFavoriteButtonClick);
  };

  #removeEventListeners = () => {
    this.#rollupButton.removeEventListener('click', this.#rollupButtonClickHandler);
    this.#favoriteButton.removeEventListener('click', this.#onFavoriteButtonClick);
  };

  #rollupButtonClickHandler = () => {
    this._callback.click();
  };

  #onFavoriteButtonClick = () => {
    this._callback.favoriteButtonClick();
  };
}

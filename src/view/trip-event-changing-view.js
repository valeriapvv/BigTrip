import View from './view.js';
import {findTypeOffers} from '../data/trip-data-generation.js';
import {TYPES} from '../data/constants.js';
import {formatDate} from '../utils.js';

const createTripEventChangingTemplate = (tripEvent, allOffers) => {
  const {
    basePrice,
    destination,
    dateFrom,
    dateTo,
    offers, // массив с id
    type
  } = tripEvent;
  const {name, description, pictures} = destination;

  const startTime = formatDate(dateFrom,'DD/MM/YY HH:mm');
  const endTime = formatDate(dateTo,'DD/MM/YY HH:mm');
  const typeOffers = findTypeOffers(type, allOffers);

  const isExistPictureList = !!(pictures && pictures.length);

  return (`
		<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${TYPES.map((it) => (`
                	<div class="event__type-item">
                  	<input id="event-type-${it}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}"
                  	${it === type ? 'checked' : ''}>
                  	<label class="event__type-label  event__type-label--${it}" for="event-type-${it}-1">${it}</label>
                	</div>
                	`)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                    &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
                      &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            	${typeOffers.map(({id, title, price}, index) => (`
            			<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index+1}" type="checkbox" name="event-offer-luggage"
                    	${offers.includes(id) ? 'checked' : ''}>
                    <label class="event__offer-label" for="event-offer-luggage-${index+1}">
                      <span class="event__offer-title">${title}</span>
                              &plus;&euro;&nbsp;
                      <span class="event__offer-price">${price}</span>
                    </label>
                  </div>
            			`)).join('')}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${isExistPictureList ?
      (`
            		<div class="event__photos-container">
          				<div class="event__photos-tape">
          					${pictures.map((it) => (`
          						<img class="event__photo" src="${it.src}" alt="${it.description}">
                      `)).join('')}
            				
          				</div>
        				</div>
        			`) : ''}
          </section>
        </section>
      </form>
    </li>`);
};


export default class TripEventChangingView extends View {
  constructor(tripEvent, destinations, allOffers) {
    super();
    this.tripEvent = tripEvent;
    this.destinations = destinations;
    this.offers = allOffers;
  }

  getTemplate() {
    return createTripEventChangingTemplate(this.tripEvent, this.offers);
  }

  setRollupButtonClickHandler = (onRollup) => {
    this._onRollup = onRollup;
    this.rollupButton = this.getElement().querySelector('.event__rollup-btn');

    this.rollupButton.addEventListener('click', this.#rollupButtonClickHandler);
  };

  setEscapeKeydownHandler = (onKeydown) => {
    this._onKeydown = onKeydown;
    document.addEventListener('keydown', this.#onEscapeKeydown);
  };

  setSubmitHandler = (onSubmit) => {
    this._onSubmit = onSubmit;
    this.form = this.getElement().querySelector('form');

    this.form.addEventListener('submit', this.#submitHandler);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();

    this._onSubmit();
    this.removeEventListeners();
  };

  setDeleteButtonClickHandler = (onDelete) => {
    this._onDelete = onDelete;
    this.deleteButton = this.getElement().querySelector('.event__reset-btn');
    this.deleteButton.addEventListener('click', this.#deleteButtonClickHandler);
  };

  #deleteButtonClickHandler = () => {
    this._onDelete();
    this.removeEventListeners();
    this.getElement().remove();
    this.removeElement();
  };

  #onEscapeKeydown = (evt) => {
    if (evt.code === 'Escape') {
      this._onKeydown();
      this.removeEventListeners();
    }
  };

  #rollupButtonClickHandler = () => {
    this._onRollup();
    this.removeEventListeners();
  };

  removeEventListeners = () => {
    this.rollupButton.removeEventListener('click', this.#rollupButtonClickHandler);
    this.deleteButton.removeEventListener('click', this.#deleteButtonClickHandler);
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    this.form.removeEventListener('submit', this.#submitHandler);
  };
}

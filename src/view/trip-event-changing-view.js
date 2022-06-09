import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {TYPES} from '../data/constants.js';
import {formatDate, findTypeOffers} from '../utils.js';
import {PointMode} from '../data/constants.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEventTypeSelectTemplate = (eventType) =>  TYPES.map((it) => (
  `<div class="event__type-item">
        <input id="event-type-${it}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}"
        ${it === eventType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${it}" for="event-type-${it}-1">${it}</label>
      </div>`
)).join('');

const createAvailableOffersTemplate = (typeOffers, eventOffers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${typeOffers.map(({id, title, price}, index) => (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index+1}" type="checkbox" name="event-offer-luggage"
          ${eventOffers.includes(id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-${index+1}">
          <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`)).join('')}
    </div>
  </section>`
);

const createPhotosContainerTemplate = (pictures) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((it) => (`
        <img class="event__photo" src="${it.src}" alt="${it.description}">
        `)).join('')}
      
    </div>
  </div>`
);

const createTripEventChangingTemplate = (tripEvent, allOffers, destinations) => {
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
  const isExistOfferList = !!(typeOffers && typeOffers.length);

  const pointNames = destinations.map((it) => it.name);

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
                ${createEventTypeSelectTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
            </label>

            <input class="event__input  event__input--destination" id="event-destination-1" 
            type="text" name="event-destination" value="${name}" list="destination-list-1" required>

            <datalist id="destination-list-1">
              ${pointNames.map((it) => `<option value="${it}"></option>`).join('')}
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"  max="2000" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">

          ${isExistOfferList ? createAvailableOffersTemplate(typeOffers, offers) : ''}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${isExistPictureList ? createPhotosContainerTemplate(pictures) : ''}
          </section>
        </section>
      </form>
    </li>`);
};


export default class TripEventChangingView extends AbstractStatefulView {
  #tripEvent = null;
  #destinations = null;
  #offers = null;
  #rollupButton = null;
  #form = null;
  #deleteButton = null;
  #destinationInput = null;
  #typeInputsContainer = null;
  #offersContainer = null;
  #priceInput = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  mode = PointMode.DEFAULT;

  constructor(tripEvent, allOffers, destinations) {
    super();
    this.#tripEvent = tripEvent;
    this._state = {...tripEvent};
    this.#destinations = destinations;
    this.#offers = allOffers;
  }

  get template() {
    return createTripEventChangingTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement () {
    if (this.mode === PointMode.EDITING) {
      console.log('REMOVE')
      this.#removeEventListeners();
      this.#removeInnerEventListeners();
    }
    
    super.removeElement();
  }

  // static parsePointToState = (point) => ({...point});
  // static parseStateToPoint = (state) => ({...state});

  _restoreHandlers = () => {
    if (this.mode === PointMode.EDITING) {
      console.log('RESTORE')
      this.setFormInnerHandlers();
      this.#setFormCloseHandlers();
    }
  };

  #setFormCloseHandlers = () => {
    this.setRollupButtonClickHandler(this._callback.onRollup);
    this.setEscapeKeydownHandler(this._callback.onKeydown);
    this.setSubmitHandler(this._callback.onSubmit);
    this.setDeleteButtonClickHandler(this._callback.onDelete);
  };

  setFormInnerHandlers = () => {
    this.#setDestinationChangeHandler();
    this.#setTypeChangeHandler();
    this.#setOfferChangeHandler();
    this.#setPriceChangeHandler();
    this.#setDatepickers();
  };

  #setDatepickers = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        enableTime: true,
        defaultDate: this._state.dateFrom,
        altInput: true,
        altFormat: 'd/m/y H:i',
        onClose: this.#dateFromChangeHandler,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        enableTime: true,
        defaultDate: this._state.dateTo,
        altFormat: 'd/m/y H:i',
        altInput: true,
        onClose: this.#dateToChangeHandler,
      },
    );
    console.log('datepickers')
  };

  #dateFromChangeHandler = ([newDate]) => {
    this.updateElement({dateFrom: formatDate(newDate)});
  };

  #dateToChangeHandler = ([newDate]) => {
    this.updateElement({dateTo: formatDate(newDate)});
  };

  #setDestinationChangeHandler = () => {
    this.#destinationInput = this.element.querySelector('input[name="event-destination"]');
    this.#destinationInput.addEventListener('change', this.#destinationChangeHandler);
  };

  #destinationChangeHandler = (evt) => {
    const newDestination = this.#destinations.find((it) => it.name === evt.target.value);
    this.updateElement({destination: newDestination});
  };

  #setTypeChangeHandler = () => {
    this.#typeInputsContainer = this.element.querySelector('.event__type-group');
    this.#typeInputsContainer.addEventListener('change', this.#typeChangeHandler);
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: []});
  };

  #setOfferChangeHandler = () => {
    this.#offersContainer = this.element.querySelector('.event__available-offers');
    this.#offersContainer?.addEventListener('change', this.#offerChangeHandler);
  };

  #offerChangeHandler = (evt) => {
    const inputId = evt.target.id;
    const offerId = parseInt(inputId[inputId.length - 1], 10);
    const checkedOffers = [...this._state.offers];

    if (evt.target.checked) {
      checkedOffers.push(offerId);
    } else {
      const index = checkedOffers.indexOf(offerId);
      checkedOffers.splice(index, 1);
    }

    this.updateElement({offers: checkedOffers});
  };

  #setPriceChangeHandler = () => {
    this.#priceInput = this.element.querySelector('input[name="event-price"]');
    this.#priceInput.addEventListener('change', this.#priceChangeHandler);
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({basePrice: evt.target.value});
  };

  setRollupButtonClickHandler = (onRollup) => {
    this._callback.onRollup = onRollup;
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');

    this.#rollupButton.addEventListener('click', this.#rollupButtonClickHandler);
  };

  setEscapeKeydownHandler = (onKeydown) => {
    this._callback.onKeydown = onKeydown;
    document.addEventListener('keydown', this.#onEscapeKeydown);
  };

  setSubmitHandler = (onSubmit) => {
    this._callback.onSubmit = onSubmit;
    this.#form = this.element.querySelector('form');

    this.#form.addEventListener('submit', this.#submitHandler);
  };

  setDeleteButtonClickHandler = (onDelete) => {
    this._callback.onDelete = onDelete;
    this.#deleteButton = this.element.querySelector('.event__reset-btn');
    this.#deleteButton.addEventListener('click', this.#deleteButtonClickHandler);
  };

  reset = (point) => {
    this.mode = PointMode.DEFAULT;
    this.#removeInnerEventListeners();
    this.#removeEventListeners();

    this.updateElement(point);
    console.log('REMOVE')
  };

  #removeEventListeners = () => {
    this.#rollupButton.removeEventListener('click', this.#rollupButtonClickHandler);
    this.#deleteButton.removeEventListener('click', this.#deleteButtonClickHandler);
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    this.#form.removeEventListener('submit', this.#submitHandler);
  };

  #removeInnerEventListeners = () => {
    this.#destinationInput.removeEventListener('change', this.#destinationChangeHandler);
    this.#typeInputsContainer.removeEventListener('change', this.#typeChangeHandler);
    this.#offersContainer?.removeEventListener('change', this.#offerChangeHandler);
    this.#priceInput.removeEventListener('change', this.#priceChangeHandler);

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
      console.log('destroy datepickers')
    }
  };

  #rollupButtonClickHandler = () => {
    this.reset(this.#tripEvent);
   
    this._callback.onRollup();
  };

  #onEscapeKeydown = (evt) => {
    if (evt.code === 'Escape') {
      this.reset(this.#tripEvent);

      this._callback.onKeydown();
    }
  };

  #submitHandler = (evt) => {
    evt.preventDefault();

    this.#removeInnerEventListeners();
    this.#removeEventListeners();
    console.log('REMOVE');
    this._callback.onSubmit(this._state);
  };

  #deleteButtonClickHandler = () => {
    this._callback.onDelete();
  };
}

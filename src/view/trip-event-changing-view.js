import View from './view.js';
import {TypeOffer} from '../data/trip-point-generation.js';
import {types} from '../data/data.js';

const dayjs = require('dayjs');

const createTripEventChangingTemplate = (tripEvent) => {
  const {
    base_price: basePrice,
    destination,
    date_from: dateFrom,
    date_to: dateTo,
    offers, // массив с id
    type
  } = tripEvent;
  const {name, description, pictures} = destination;

  const startTime = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const endTime = dayjs(dateTo).format('DD/MM/YY HH:mm');

  const allOffers = TypeOffer[type.toUpperCase()].offers;

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

                ${types.map((it) => (`
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
            	${allOffers.map((it, index) => (`
            			<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index+1}" type="checkbox" name="event-offer-luggage"
                    	${offers.includes(it.id) ? 'checked' : ''}>
                    <label class="event__offer-label" for="event-offer-luggage-${index+1}">
                      <span class="event__offer-title">${it.title}</span>
                              &plus;&euro;&nbsp;
                      <span class="event__offer-price">${it.price}</span>
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
  constructor(tripEvent) {
    super(tripEvent);
    this.tripEvent = tripEvent;
  }

  getTemplate() {
    return createTripEventChangingTemplate(this.tripEvent);
  }
}

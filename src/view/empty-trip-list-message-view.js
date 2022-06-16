import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../data/constants.js';

const messageByFilter = {
  [FilterType.EVERYTHING]:'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]:'There are no past events now',
};

const createEmptyTripListMessageTemplate = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class EmptyTripListMessageView extends AbstractView {
  #message = null;

  constructor(filterType) {
    super();
    this.#message = messageByFilter[filterType];
  }

  get template() {
    return createEmptyTripListMessageTemplate(this.#message);
  }
}

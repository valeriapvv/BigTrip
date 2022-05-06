import View from './view.js';

const createEmptyTripListMessageTemplate = (message = 'Сообщение') => (`<p class="trip-events__msg">${message}</p>`);

export default class EmptyTripListMessageView extends View {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyTripListMessageTemplate(this.#message);
  }
}

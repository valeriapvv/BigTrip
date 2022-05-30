import AbstractView from '../framework/view/abstract-view.js';

const createEmptyTripListMessageTemplate = (message = 'Сообщение') => (`<p class="trip-events__msg">${message}</p>`);

export default class EmptyTripListMessageView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyTripListMessageTemplate(this.#message);
  }
}

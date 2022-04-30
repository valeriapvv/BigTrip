import {createElement} from '../render.js';

const createTripInfoDatesTemplate = (startDate = 'Mar 18', terminalDate = 'Mar 20') => (
  `<p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${terminalDate}</p>`
);

export default class TripInfoDatesView {
  getTemplate() {
    return createTripInfoDatesTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

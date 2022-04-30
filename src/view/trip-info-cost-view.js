import {createElement} from '../render.js';

const createTripInfoCostTemplate = (cost = 1230) => `<p class="trip-info__cost">
     Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
   </p>`;

export default class TripInfoCostView {
  getTemplate() {
    return createTripInfoCostTemplate();
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

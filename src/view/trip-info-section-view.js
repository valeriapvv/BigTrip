import {createElement} from '../render.js';

const createTripInfoSectionTemplate = () => (
  `<section class="trip-main__trip-info trip-info">
     <div class="trip-info__main"></div>
   </section>`
);

export default class TripInfoSectionView {
  getTemplate() {
    return createTripInfoSectionTemplate();
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

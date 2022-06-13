import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoSectionTemplate = () => (
  `<section class="trip-main__trip-info trip-info">
     <div class="trip-info__main"></div>
   </section>`
);

export default class TripInfoSectionView extends AbstractView {
  #mainElement = this.element.querySelector('.trip-info__main');

  get template() {
    return createTripInfoSectionTemplate();
  }

  get mainElement() {
    return this.#mainElement;
  }
}

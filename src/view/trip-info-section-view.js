import View from './view.js';

const createTripInfoSectionTemplate = () => (
  `<section class="trip-main__trip-info trip-info">
     <div class="trip-info__main"></div>
   </section>`
);

export default class TripInfoSectionView extends View {
  get template() {
    return createTripInfoSectionTemplate();
  }
}

import View from './view.js';

const createTripEventListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventListView extends View {
  get template() {
    return createTripEventListTemplate();
  }
}

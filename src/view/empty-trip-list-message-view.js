import View from './view.js';

const createEmptyTripListMessageTemplate = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class EmptyTripListMessageView extends View {
  get template() {
    return createEmptyTripListMessageTemplate();
  }
}

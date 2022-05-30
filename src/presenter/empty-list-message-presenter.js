import EmptyTripListMessageView from '../view/empty-trip-list-message-view.js';
import {replace} from '../framework/render.js';

export default class EmptyListMessagePresenter {
  #pointListContainer = null;
  #emptyListMessageComponent = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init() {
    const tripFilters = document.querySelector('.trip-filters')['trip-filter'];
    const tripFilterValue = tripFilters.value.toLowerCase();

    const filterValueToMessage = {
      everything:'Click New Event to create your first point',
      past: 'There are no past events now',
      future:'There are no future events now',
    };

    const message = filterValueToMessage[tripFilterValue];

    this.#emptyListMessageComponent = new EmptyTripListMessageView(message);
    replace(this.#emptyListMessageComponent, this.#pointListContainer);

    document.querySelector('.trip-events__trip-sort').remove(); // sortElement
  }
}

import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import {render} from '../render.js';

export default class TripEventsBodyPresenter {
  init = (tripEventsBodyContainer) => {
    this.tripEventListComponent = new TripEventListView();

    render(new TripSortView(), tripEventsBodyContainer);
    render(this.tripEventListComponent, tripEventsBodyContainer);

    this.tripEventListElement = this.tripEventListComponent.getElement();

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.tripEventListElement);
    }
  };
}

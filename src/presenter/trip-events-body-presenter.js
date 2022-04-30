import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventEditView from '../view/trip-event-edit-view.js';
import {render} from '../render.js';

export default class TripEventsBodyPresenter {
  tripEventListComponent = new TripEventListView();

  init = (tripEventsBodyContainer) => {
    render(new TripSortView(), tripEventsBodyContainer);
    render(this.tripEventListComponent, tripEventsBodyContainer);

    // форма создания
    render(new TripEventEditView(), this.tripEventListComponent.getElement(), 'afterbegin');

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.tripEventListComponent.getElement());
    }
  };
}

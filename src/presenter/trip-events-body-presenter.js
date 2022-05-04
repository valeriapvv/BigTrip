import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import TripEventChangingPresenter from './trip-event-changing-presenter.js';
import {render} from '../render.js'; //

export default class TripEventsBodyPresenter {
  init = (tripEventsBodyContainer, tripEventsModel) => {
    this.tripEventListComponent = new TripEventListView();
    this.tripEventsModel = tripEventsModel;
    this.tripEvents = this.tripEventsModel.getTripEvents();

    render(new TripSortView(), tripEventsBodyContainer);
    render(this.tripEventListComponent, tripEventsBodyContainer);

    this.tripEventListElement = this.tripEventListComponent.getElement();

    for (const tripEventData of this.tripEvents) {
      const tripEventComponent = new TripEventPresenter();

      tripEventComponent.init(tripEventData, this.tripEventListElement, new TripEventChangingPresenter);
    }
  };
}

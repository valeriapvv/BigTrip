import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
// import TripEventChangingPresenter from './trip-event-changing-presenter.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import {render} from '../render.js';

export default class TripEventsBodyPresenter {
  constructor() {

  }

  init = (tripEventsBodyContainer, tripEventsModel) => {
    this.tripEventListComponent = new TripEventListView();
    this.tripEventsModel = tripEventsModel;
    this.tripEvents = this.tripEventsModel.getTripEvents();

    this.destinations = this.tripEventsModel.getDestinations();
    this.offers = this.tripEventsModel.getOffers();

    render(new TripSortView(), tripEventsBodyContainer);
    render(this.tripEventListComponent, tripEventsBodyContainer);

    this.tripEventListContainer = this.tripEventListComponent.getElement();

    for (const tripEventData of this.tripEvents) {
      this.#renderTripEvent(tripEventData);
    }
  };

  #renderTripEvent = (tripEventData) => {
    const tripEventComponent = new TripEventView(tripEventData, this.destinations, this.offers);
    const tripEventElement = tripEventComponent.getElement();

    tripEventComponent.setRollupButtonClickHandler(() => {
      const tripEventChangingComponent = new TripEventChangingView(tripEventData, this.destinations, this.offers);

      this.tripEventListContainer.replaceChild(tripEventChangingComponent.getElement(), tripEventElement);
    });

    render(tripEventComponent, this.tripEventListContainer);
  };
}

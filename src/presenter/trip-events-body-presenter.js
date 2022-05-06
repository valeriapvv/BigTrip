import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import {render} from '../render.js';

export default class TripEventsBodyPresenter {
  #tripEventsBodyContainer = null;
  #tripEventsModel = null;
  #tripEventListComponent = null;
  #tripEvents = null;
  #destinations = null;
  #offers = null;
  #tripEventListContainer = null;

  constructor(tripEventsBodyContainer, tripEventsModel) {
    this.#tripEventsBodyContainer = tripEventsBodyContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  init = () => {
    this.#tripEventListComponent = new TripEventListView();
    this.#tripEvents = this.#tripEventsModel.tripEvents;

    this.#destinations = this.#tripEventsModel.destinations;
    this.#offers = this.#tripEventsModel.offers;

    render(new TripSortView(), this.#tripEventsBodyContainer);
    render(this.#tripEventListComponent, this.#tripEventsBodyContainer);

    this.#tripEventListContainer = this.#tripEventListComponent.element;

    for (const tripEventData of this.#tripEvents) {
      this.#renderTripEvent(tripEventData);
    }
  };

  #renderTripEvent = (tripEventData) => {
    const tripEventComponent = new TripEventView(tripEventData, this.#destinations, this.#offers);
    const tripEventElement = tripEventComponent.element;

    tripEventComponent.setRollupButtonClickHandler(() => {
      const tripEventChangingComponent = new TripEventChangingView(tripEventData, this.#destinations, this.#offers);
      const tripEventChangingForm = tripEventChangingComponent.element;

      const onRollupForm = () => {
        this.#tripEventListContainer.replaceChild(tripEventElement, tripEventChangingForm);
      };

      // обраборчики для формы редактирования
      tripEventChangingComponent.setRollupButtonClickHandler(onRollupForm);
      tripEventChangingComponent.setEscapeKeydownHandler(onRollupForm);
      tripEventChangingComponent.setSubmitHandler(onRollupForm);

      tripEventChangingComponent.setDeleteButtonClickHandler(() => {
        tripEventComponent.removeEventListeners();
        tripEventComponent.removeElement();
      });

      this.#tripEventListContainer.replaceChild(tripEventChangingForm, tripEventElement);
    });

    tripEventComponent.setFavoriteButtonClickHandler();

    render(tripEventComponent, this.#tripEventListContainer);
  };
}

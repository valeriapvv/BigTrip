import TripSortView from '../view/trip-sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import EmptyTripListMessageView from '../view/empty-trip-list-message-view.js';
import {render} from '../render.js';

export default class TripEventsBodyPresenter {
  #tripEventsBodyContainer = null;
  #tripEventsModel = null;
  #tripEventListComponent = null;
  #tripEvents = null;
  #destinations = null;
  #offers = null;
  #tripEventListContainer = null;
  #emptyTripListMessageComponent = null;
  #tripSortComponent = null;
  #tripSortElement = null;

  constructor(tripEventsBodyContainer, tripEventsModel) {
    this.#tripEventsBodyContainer = tripEventsBodyContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  init = () => {
    this.#tripEventListComponent = new TripEventListView();
    this.#tripEvents = this.#tripEventsModel.tripEvents;

    this.#destinations = this.#tripEventsModel.destinations;
    this.#offers = this.#tripEventsModel.offers;

    this.#tripSortComponent = new TripSortView();

    render(this.#tripSortComponent, this.#tripEventsBodyContainer);
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

        const tripEventListLength = this.#tripEventListContainer.children.length;

        if (!tripEventListLength) {
          this.#emptyTripListMessageComponent = new EmptyTripListMessageView();
          const emptyTripListMessage = this.#emptyTripListMessageComponent.element;

          this.#tripEventsBodyContainer.replaceChild(emptyTripListMessage, this.#tripEventListContainer);

          this.#tripSortElement = this.#tripSortComponent.element;
          this.#tripSortElement.remove();
        }
      });

      this.#tripEventListContainer.replaceChild(tripEventChangingForm, tripEventElement);
    });

    tripEventComponent.setFavoriteButtonClickHandler();

    render(tripEventComponent, this.#tripEventListContainer);
  };

}

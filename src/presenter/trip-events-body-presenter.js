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

  get tripEvents() {
    return this.#tripEvents;
  }

  set tripEvents(filteredTripEvents) {
    this.#tripEvents = filteredTripEvents;
  }

  init = () => {

    if (!this.#tripEvents) {
      this.#tripEvents = this.#tripEventsModel.tripEvents;
      this.#destinations = this.#tripEventsModel.destinations;
      this.#offers = this.#tripEventsModel.offers;

      this.#tripSortComponent = new TripSortView();

      render(this.#tripSortComponent, this.#tripEventsBodyContainer);
    } else {
      this.#tripEventListComponent.element.remove();
      this.#tripEventListComponent.removeElement();
      this.#tripEventListContainer.remove();
    }

    this.#tripEventListComponent = new TripEventListView();
    render(this.#tripEventListComponent, this.#tripEventsBodyContainer);

    this.#tripEventListContainer = this.#tripEventListComponent.element;

    if (!this.#tripEvents.length) {
      this.#renderEmptyTripListMessage();
      return;
    }

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
          this.#renderEmptyTripListMessage();
        }
      });

      this.#tripEventListContainer.replaceChild(tripEventChangingForm, tripEventElement);
    });

    tripEventComponent.setFavoriteButtonClickHandler();

    render(tripEventComponent, this.#tripEventListContainer);
  };

  #renderEmptyTripListMessage = () => {
    const tripFilters = document.querySelector('.trip-filters')['trip-filter'];
    const tripFilterValue = tripFilters.value.toLowerCase();

    const filterValueToMessage = {
      everything:'Click New Event to create your first point',
      past: 'There are no past events now',
      future:'There are no future events now',
    };

    const message = filterValueToMessage[tripFilterValue];

    this.#emptyTripListMessageComponent = new EmptyTripListMessageView(message);
    const emptyTripListMessage = this.#emptyTripListMessageComponent.element;

    this.#tripEventsBodyContainer.replaceChild(emptyTripListMessage, this.#tripEventListContainer);

    this.#tripSortElement = this.#tripSortComponent.element;
    this.#tripSortElement.remove();
  };
}

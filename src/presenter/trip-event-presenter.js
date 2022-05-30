import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import EmptyListMessagePresenter from './empty-list-message-presenter.js';
import {render, replace} from '../framework/render.js';

export default class TripEventPresenter {
  #pointsContainerComponent = null;
  #pointsContainer = null;
  #tripEvent = null;
  #destinations = null;
  #offers = null;

  #pointComponent = null;
  #formComponent = null;

  constructor(pointsContainerComponent) {
    this.#pointsContainerComponent = pointsContainerComponent;
    this.#pointsContainer = this.#pointsContainerComponent.element;
  }

  init(tripEvent,  offers,  destinations) {
    this.#tripEvent = tripEvent;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointComponent = new TripEventView(tripEvent, offers, destinations);
    this.#pointComponent.setRollupButtonClickHandler(this.#initForm);
    this.#pointComponent.setFavoriteButtonClickHandler();

    render(this.#pointComponent, this.#pointsContainer);
  }

  #rollupButtonClickHandler = () => {
    this.#initForm();
    this.#replacePointToForm();
  };

  #initForm = () => {
    this.#formComponent = new TripEventChangingView(this.#tripEvent, this.#offers, this.#destinations);

    this.#formComponent.setRollupButtonClickHandler(this.#replaceFormToPoint);
    this.#formComponent.setEscapeKeydownHandler(this.#replaceFormToPoint);
    this.#formComponent.setSubmitHandler(this.#replaceFormToPoint);

    this.#formComponent.setDeleteButtonClickHandler(this.#deletePoint);

    this.#replacePointToForm();
  };

  #replacePointToForm = () => {
    replace(this.#formComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formComponent);
  };

  #deletePoint = () => {
    this.#pointComponent.removeElement();

    const pointListLength = this.#pointsContainer.children.length;

    if(!pointListLength) {
      const emptyListMesssagePresenter = new EmptyListMessagePresenter(this.#pointsContainerComponent);
      emptyListMesssagePresenter.init();
    }
  };

}

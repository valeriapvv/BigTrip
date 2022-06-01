import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import EmptyListMessagePresenter from './empty-list-message-presenter.js';
import {render, replace, remove} from '../framework/render.js';

export default class TripEventPresenter {
  #pointsContainerComponent = null;
  #pointsContainer = null;
  #tripEvent = null;
  #destinations = null;
  #offers = null;

  #pointComponent = null;
  #formComponent = null;

  #changeData = null;

  constructor(
    pointsContainerComponent,
    offers,
    destinations,
    changeData,
  ) {
    this.#pointsContainerComponent = pointsContainerComponent;
    this.#pointsContainer = this.#pointsContainerComponent.element;
    this.#destinations = destinations;
    this.#offers = offers ;
    this.#changeData = changeData;
  }

  init(tripEvent) {
    this.#tripEvent = tripEvent;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#formComponent;

    this.#pointComponent = new TripEventView(this.#tripEvent, this.#offers, this.#destinations);
    this.#formComponent = new TripEventChangingView(this.#tripEvent, this.#offers, this.#destinations);

    this.#pointComponent.setRollupButtonClickHandler(this.#initForm);
    this.#pointComponent.setFavoriteButtonClickHandler(this.#favoriteButtonClickHandler);

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#pointsContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#pointsContainer.contains(prevFormComponent.element)) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  }

  #favoriteButtonClickHandler = () => {
    const isFavorite = this.#tripEvent.isFavorite;

    this.#changeData({...this.#tripEvent, isFavorite: !isFavorite});
  };

  #initForm = () => {
    this.#formComponent.setRollupButtonClickHandler(this.#replaceFormToPoint);
    this.#formComponent.setEscapeKeydownHandler(this.#replaceFormToPoint);
    this.#formComponent.setSubmitHandler(this.#replaceFormToPoint);

    this.#formComponent.setDeleteButtonClickHandler(this.#deleteButtonClickHandler);

    this.#replacePointToForm();
  };

  #replacePointToForm = () => {
    replace(this.#formComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formComponent);
  };

  #deleteButtonClickHandler = () => {
    this.destroy();

    const pointListLength = this.#pointsContainer.children.length;

    if(!pointListLength) {
      const emptyListMesssagePresenter = new EmptyListMessagePresenter(this.#pointsContainerComponent);
      emptyListMesssagePresenter.init();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#formComponent);
  };

}

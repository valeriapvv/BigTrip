import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import EmptyListMessagePresenter from './empty-list-message-presenter.js';
import {render, replace, remove} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripEventPresenter {
  #pointsContainerComponent = null;
  #pointsContainer = null;
  #tripEvent = null;
  #destinations = null;
  #offers = null;

  #pointComponent = null;
  #formComponent = null;
  #mode = Mode.DEFAULT;

  #changeData = null;
  #resetPoints = null;

  constructor(pointsContainerComponent, changeData, resetPoints) {
    this.#pointsContainerComponent = pointsContainerComponent;
    this.#pointsContainer = this.#pointsContainerComponent.element;
    this.#changeData = changeData;
    this.#resetPoints = resetPoints;
  }

  init(tripEvent, offers, destinations) {
    this.#tripEvent = tripEvent;
    this.#offers = offers ?? this.#offers;
    this.#destinations = destinations ?? this.#destinations;

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
    this.#formComponent.setSubmitHandler(this.#formSubmitHandler);

    this.#formComponent.setDeleteButtonClickHandler(this.#deleteButtonClickHandler);
    // console.log("Обработчики закрытия")

    this.#resetPoints();
    this.#replacePointToForm();
  };

  #formSubmitHandler = (newPointData) => {
    this.#replaceFormToPoint();
    this.#changeData(newPointData);
  };

  #replacePointToForm = () => {
    replace(this.#formComponent, this.#pointComponent);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formComponent);
    this.#mode = Mode.DEFAULT;
  };

  #deleteButtonClickHandler = () => {
    this.destroy();

    const pointListLength = this.#pointsContainer.children.length;

    if(!pointListLength) {
      const emptyListMesssagePresenter = new EmptyListMessagePresenter(this.#pointsContainerComponent);
      emptyListMesssagePresenter.init();
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formComponent.reset(this.#tripEvent);
      this.#formComponent.removeEventListeners();
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#formComponent);
  };

}

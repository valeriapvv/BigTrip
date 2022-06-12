import TripEventView from '../view/trip-event-view.js';
import TripEventChangingView from '../view/trip-event-changing-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UpdateType, UserAction, SortType, PointMode} from '../data/constants.js';
import {isDatesEqual, getEventDuration} from '../utils.js';

export default class TripEventPresenter {
  #pointsContainerComponent = null;
  #pointsContainer = null;
  #tripEvent = null;
  #destinations = null;
  #offers = null;
  #currentSortType = null;

  #pointComponent = null;
  #formComponent = null;
  #mode = PointMode.DEFAULT;

  #changeData = null;
  #resetPoints = null;

  constructor(pointsContainerComponent, changeData, resetPoints) {
    this.#pointsContainerComponent = pointsContainerComponent;
    this.#pointsContainer = this.#pointsContainerComponent.element;
    this.#changeData = changeData;
    this.#resetPoints = resetPoints;
  }

  init(tripEvent, offers, destinations, currentSortType) {
    this.#tripEvent = tripEvent;
    this.#offers = offers ?? this.#offers;
    this.#destinations = destinations ?? this.#destinations;
    this.#currentSortType = currentSortType ?? this.#currentSortType;

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

    this.#changeData(
      UserAction.UPDATE,
      UpdateType.PATCH,
      {...this.#tripEvent, isFavorite: !isFavorite},
    );
  };

  #initForm = () => {
    this.#formComponent.setRollupButtonClickHandler(this.#replaceFormToPoint);
    this.#formComponent.setEscapeKeydownHandler(this.#replaceFormToPoint);
    this.#formComponent.setSubmitHandler(this.#formSubmitHandler);
    this.#formComponent.setDeleteButtonClickHandler(this.#deleteButtonClickHandler);
    this.#formComponent.setFormInnerHandlers();

    this.#resetPoints();
    this.#replacePointToForm();
  };

  #formSubmitHandler = (update) => {
    const point = this.#tripEvent;
    let isUpdateTypeMinor;

    switch (this.#currentSortType) {
      case SortType.DAY:
        isUpdateTypeMinor = !isDatesEqual(point.dateFrom, update.dateFrom);
        break;
      case SortType.TIME:
        isUpdateTypeMinor = getEventDuration(point.dateFrom, point.dateTo) !== getEventDuration(update.dateFrom, update.dateTo);
        break;
      case SortType.PRICE:
        isUpdateTypeMinor = point.basePrice !== update.basePrice;
        break;
    }

    this.#replaceFormToPoint();
    this.#changeData(
      UserAction.UPDATE,
      UpdateType[
        isUpdateTypeMinor ? 'MINOR' : 'PATCH'
      ],
      update,
    );
  };

  #replacePointToForm = () => {
    this.#mode = PointMode.EDITING;
    this.#formComponent.mode = PointMode.EDITING;
    replace(this.#formComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    this.#mode = PointMode.DEFAULT;
    this.#formComponent.mode = PointMode.DEFAULT;
    replace(this.#pointComponent, this.#formComponent);

  };

  #deleteButtonClickHandler = () => {
    this.#changeData(
      UserAction.DELETE,
      UpdateType.MINOR,
      this.#tripEvent,
    );
  };

  resetView = () => {
    if (this.#mode !== PointMode.DEFAULT) {
      this.#formComponent.reset(this.#tripEvent);
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#formComponent);
  };

}

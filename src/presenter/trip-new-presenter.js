import TripEventChangingView from '../view/trip-event-changing-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {UpdateType, UserAction, PointMode, FormType} from '../data/constants.js';

export default class TripNewPresenter {
  #tripEventListComponent = null;
  #changeData = null;
  #formComponent = null;
  #destroyCallback = null;
  #destinations = null;
  #offers = null;

  constructor(tripEventListComponent, changeData) {
    this.#tripEventListComponent= tripEventListComponent;
    this.#changeData = changeData;
  }

  init = (offers, destinations, callback) => {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destroyCallback = callback;

    this.#formComponent = new TripEventChangingView(null, offers, destinations, FormType.CREATE);
    this.#formComponent.setSubmitHandler(this.#formSubmitHandler);
    this.#formComponent.setDeleteButtonClickHandler(this.destroy);
    this.#formComponent.setEscapeKeydownHandler(this.destroy);
    this.#formComponent.setFormInnerHandlers();
    this.#formComponent.mode = PointMode.EDITING;

    render(this.#formComponent, this.#tripEventListComponent.element, RenderPosition.AFTERBEGIN);
  };

  destroy = () => {
    if (this.#formComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formComponent);
    this.#formComponent = null;
  };

  #formSubmitHandler = (point) => {
    this.#changeData(
      UserAction.ADD,
      UpdateType.MINOR,
      point,
    );

    this.destroy();
  };
}

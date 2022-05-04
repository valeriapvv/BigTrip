import TripEventChangingView from '../view/trip-event-changing-view.js';
import {render, RenderPosition} from '../render.js';

export default class TripEventChangingPresenter {
  init = (tripEventItem, tripEventData, removeItemEventListeners) => {
    this.tripEventChangingView = new TripEventChangingView(tripEventData);
    render(this.tripEventChangingView, tripEventItem.getElement(), RenderPosition.AFTEREND);

    this.tripEventChangingForm = this.tripEventChangingView.getElement();
    this.rollupButton = this.tripEventChangingForm.querySelector('.event__rollup-btn');
    this.deleteButton = this.tripEventChangingForm.querySelector('.event__reset-btn');

    this.setRollupButtonClick(tripEventItem);
    this.setDeleteButtonClick(tripEventItem, removeItemEventListeners);
    this.setEscapeKeydown(tripEventItem);
  };

  removeEventListeners = () => {
    this.rollupButton.removeEventListener('click', this.onRollupButtonClick);
    this.deleteButton.removeEventListener('click', this.onDeleteButtonClick);
    document.removeEventListener('keydown', this.onEscapeKeydown);
  };

  rollupForm = (tripEventItem) => {
    render(tripEventItem, this.tripEventChangingForm, RenderPosition.BEFOREBEGIN);

    this.tripEventChangingForm.remove();

    this.removeEventListeners();
  };

  setRollupButtonClickHandler = (tripEventItem) => {
    this.onRollupButtonClick = () => {
      this.rollupForm(tripEventItem);
    };

    return this.onRollupButtonClick;
  };

  setRollupButtonClick = (tripEventItem) => {
    this.rollupButton.addEventListener('click', this.setRollupButtonClickHandler(tripEventItem));
  };

  setEscapeKeydownHandler = (tripEventItem) => {
    this.onEscapeKeydown = (evt) => {
      if (evt.code === 'Escape') {
        this.rollupForm(tripEventItem);
      }
    };

    return this.onEscapeKeydown;
  };

  setEscapeKeydown = (tripEventItem) => {
    document.addEventListener('keydown', this.setEscapeKeydownHandler(tripEventItem));
  };

  setDeleteButtonClickHandler = (tripEventItem, removeItemEventListeners) => {
    this.onDeleteButtonClick = () => {
      this.removeEventListeners();
      this.tripEventChangingForm.remove();
      this.tripEventChangingView.removeElement();

      removeItemEventListeners();
      tripEventItem.removeElement();
    };

    return this.onDeleteButtonClick;
  };

  setDeleteButtonClick = (tripEventItem, removeItemEventListeners) => {
    this.deleteButton.addEventListener('click', this.setDeleteButtonClickHandler(tripEventItem, removeItemEventListeners));
  };
}

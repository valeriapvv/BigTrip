import TripEventView from '../view/trip-event-view.js';
import {render} from '../render.js';

export default class TripEventPresenter {
  init = (tripEventData, destinations, offers, tripEventContainer, tripEventChangingForm) => { //////
    this.tripEventComponent = new TripEventView(tripEventData, destinations, offers); //////
    this.tripEventItem = this.tripEventComponent.getElement();

    this.setRollupButtonClick(tripEventChangingForm, tripEventData, destinations, offers);

    // класс добавляется/удаляется, а цвет звездочек
    // непонятно как меняется:
    this.setFavoriteButtonClick();

    render(this.tripEventComponent, tripEventContainer);
  };

  setRollupButtonClickHandler = (tripEventChangingForm, tripEventData, destinations, offers) => { //////
    this.onRollupButtonClick = () => {
      tripEventChangingForm.init(this.tripEventComponent, tripEventData, destinations, offers, this.removeEventListeners); /////

      this.tripEventItem.remove();
    };

    return this.onRollupButtonClick;
  };

  setRollupButtonClick = (tripEventChangingForm, tripEventData, destinations, offers) => { ///////
    this.rollupButton = this.tripEventItem.querySelector('.event__rollup-btn');

    this.rollupButton.addEventListener('click', this.setRollupButtonClickHandler(tripEventChangingForm, tripEventData, destinations, offers));
  };

  onFavoriteButtonClick = () => {
    this.favoriteButton.classList.toggle('event__favorite-btn--active');
  };

  setFavoriteButtonClick = () => {
    this.favoriteButton = this.tripEventItem.querySelector('.event__favorite-btn');
    this.favoriteButton.addEventListener('click', this.onFavoriteButtonClick);
  };

  // когда удаляем с помощью формы
  removeEventListeners = () => {
    this.rollupButton.removeEventListener('click', this.onRollupButtonClick);
    this.favoriteButton.removeEventListener('click', this.onFavoriteButtonClick);
  };
}

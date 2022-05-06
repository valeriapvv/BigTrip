import TripEventEditView from '../view/trip-event-creation-view.js';
import {render, RenderPosition} from '../render.js';

export default class TripEventEditPresenter {
  setFormResetHadler = (onReset) => {
    const formResetHandler = () => {
      onReset();

      this.tripEventForm.removeEventListener('reset', formResetHandler);
      this.tripEventForm.remove();
    };

    return formResetHandler;
  };

  init = (tripEventEditContainer, onReset) => {
    this.tripEventEditComponent = new TripEventEditView();
    this.tripEventForm = this.tripEventEditComponent.element;

    this.tripEventForm.addEventListener('reset', this.setFormResetHadler(onReset));

    render(this.tripEventEditComponent, tripEventEditContainer, RenderPosition.AFTERBEGIN);
  };
}

import TripEventEditView from '../view/trip-event-edit-view.js';
import {render} from '../render.js';

export default class TripEventEditPresenter {
  getEditFormSite() {
    return document.querySelector('.trip-events__list');
  }

  init = () => {
    render(new TripEventEditView(), this.getEditFormSite(), 'afterbegin');
  };
}

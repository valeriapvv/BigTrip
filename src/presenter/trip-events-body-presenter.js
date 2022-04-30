import TripSortView from '../view/trip-sort-view.js';
import {render} from '../render.js';

export default class TripEventsBodyPresenter {


  init = (tripEventsBodyContainer) => {
    render(new TripSortView(), tripEventsBodyContainer);
  };
}

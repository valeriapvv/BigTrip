import TripFiltersView from '../view/trip-filters-view.js';
import {render} from '../render.js';

export default class TripFiltersPresenter {
  init = (tripFiltersContainer) => {
    render(new TripFiltersView, tripFiltersContainer);
  };
}

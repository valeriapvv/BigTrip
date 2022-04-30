import {render} from './render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsBodyPresenter from './presenter/trip-events-body-presenter.js';
import TripEventEditPresenter from './presenter/trip-event-edit-presenter.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripEventsBodySite = document.querySelector('.trip-events');
const eventAddButton = tripMainSite.querySelector('.trip-main__event-add-btn');

const tripInfoPresenter = new TripInfoPresenter();
const tripEventsBodyPresenter = new TripEventsBodyPresenter();
const tripEventEditPresenter = new TripEventEditPresenter();

render(new TripFiltersView(), tripFiltersSite);

tripInfoPresenter.init(tripMainSite);

tripEventsBodyPresenter.init(tripEventsBodySite);

eventAddButton.addEventListener('click', () => {
  tripEventEditPresenter.init();
  eventAddButton.disabled = true;
});

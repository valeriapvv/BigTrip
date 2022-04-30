import {render} from './render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsBodyPresenter from './presenter/trip-events-body-presenter.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripInfoPresenter = new TripInfoPresenter();
const tripEventsBodySite = document.querySelector('.trip-events');
const tripEventsBodyPresenter = new TripEventsBodyPresenter();

render(new TripFiltersView(), tripFiltersSite);

tripInfoPresenter.init(tripMainSite);

tripEventsBodyPresenter.init(tripEventsBodySite);



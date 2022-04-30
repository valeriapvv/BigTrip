import {render} from './render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripInfoPresenter = new TripInfoPresenter();

tripInfoPresenter.init(tripMainSite);

render(new TripFiltersView(), tripFiltersSite);


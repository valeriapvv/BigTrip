import {render} from './render.js';
import TripFiltersView from './view/trip-filters-view.js';

const tripFiltersSite = document.querySelector('.trip-controls__filters');

render(new TripFiltersView(), tripFiltersSite);

import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsBodyPresenter from './presenter/trip-events-body-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import TripFiltersModel from './model/trip-filters-model.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripEventsBodySite = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel();
const tripFiltersModel = new TripFiltersModel();

const tripInfoPresenter = new TripInfoPresenter(tripMainSite, tripEventsModel);

tripInfoPresenter.init();


const tripEventsBodyPresenter = new TripEventsBodyPresenter(tripEventsBodySite, tripEventsModel, tripFiltersModel);
const tripFiltersPresenter = new TripFiltersPresenter(tripEventsModel, tripFiltersModel, tripFiltersSite);


tripFiltersPresenter.init();

tripEventsBodyPresenter.init();


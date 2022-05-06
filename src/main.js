import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsBodyPresenter from './presenter/trip-events-body-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import AddEventButtonPresenter from './presenter/add-event-button-presenter.js';
import TripEventsModel from './model/trip-events-model.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripEventsBodySite = document.querySelector('.trip-events');

const tripFiltersPresenter = new TripFiltersPresenter();
const tripInfoPresenter = new TripInfoPresenter();
const tripEventsBodyPresenter = new TripEventsBodyPresenter(tripEventsBodySite, new TripEventsModel());
const addEventButtonPresenter = new AddEventButtonPresenter();

tripFiltersPresenter.init(tripFiltersSite);
tripInfoPresenter.init(tripMainSite);

tripEventsBodyPresenter.init();

addEventButtonPresenter.init(document.querySelector('.trip-events__list'));

import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsBodyPresenter from './presenter/trip-events-body-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import AddEventButtonPresenter from './presenter/add-event-button-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import TripFiltersModel from './model/trip-filters-model.js';
import {getFilters} from './filter.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripEventsBodySite = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel();
const tripFiltersModel = new TripFiltersModel();

const tripEvents = tripEventsModel.tripEvents;
const filters = getFilters(tripEvents);


const tripInfoPresenter = new TripInfoPresenter(tripMainSite, tripEventsModel);
const addEventButtonPresenter = new AddEventButtonPresenter();

tripInfoPresenter.init();


const tripEventsBodyPresenter = new TripEventsBodyPresenter(tripEventsBodySite, tripEventsModel, tripFiltersModel);
const tripFiltersPresenter = new TripFiltersPresenter(tripEventsModel, tripFiltersModel, tripFiltersSite);


tripFiltersPresenter.init();

tripEventsBodyPresenter.init();

addEventButtonPresenter.init(document.querySelector('.trip-events__list'));

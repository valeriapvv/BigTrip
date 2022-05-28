import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsBodyPresenter from './presenter/trip-events-body-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import AddEventButtonPresenter from './presenter/add-event-button-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import {createFilters} from './filter.js';

const tripMainSite = document.querySelector('.trip-main');
const tripFiltersSite = tripMainSite.querySelector('.trip-controls__filters');
const tripEventsBodySite = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel();

const tripEvents = tripEventsModel.tripEvents;
const filters = createFilters(tripEvents);


const tripInfoPresenter = new TripInfoPresenter(tripMainSite, tripEventsModel);
const addEventButtonPresenter = new AddEventButtonPresenter();

tripInfoPresenter.init();


const tripEventsBodyPresenter = new TripEventsBodyPresenter(tripEventsBodySite, tripEventsModel);
const tripFiltersPresenter = new TripFiltersPresenter(tripEvents, filters, tripFiltersSite);

//передаю презентер, чтоб перерисовать точки по
// выбранному фильтру
tripFiltersPresenter.init(tripEventsBodyPresenter);

//отрисовывает точки
tripEventsBodyPresenter.init();

addEventButtonPresenter.init(document.querySelector('.trip-events__list'));

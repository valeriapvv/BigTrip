import AbstractView from '../framework/view/abstract-view.js';
import {sortByDay} from '../utils.js';

const createTripInfoTitleTemplate = (tripEvents) => {
  const points = tripEvents.sort(sortByDay).map(({destination}) => destination.name);

  const taskPath = `${points.length <= 3 ? points.join(' &mdash; ')
    : `${points[0]  } &mdash; . . . &mdash; ${  points[points.length - 1]}`}`;

  return `<h1 class="trip-info__title">${taskPath}</h1>`;
};

export default class TripInfoTitleView extends AbstractView {
  #tripEvents;

  constructor(tripEvents) {
    super();
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoTitleTemplate(this.#tripEvents);
  }
}

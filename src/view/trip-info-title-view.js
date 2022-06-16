import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTitleTemplate = (tripEvents) => {
  const points = tripEvents.map(({destination}) => destination.name);
  points.forEach((it, index) => {
    if (points[index-1] === it) {
      points.splice(index, 1);
    }
  });

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

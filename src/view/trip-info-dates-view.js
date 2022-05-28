import View from './view.js';
import {findStartDate, findEndDate, formatDate} from '../utils.js';
import dayjs from 'dayjs';

const createTripInfoDatesTemplate = (tripEvents) => {
  const startDate = findStartDate(tripEvents);
  const terminalDate = findEndDate(tripEvents);
  const humanizeStartDate = formatDate(startDate, 'MMM D');
  const humanizeTerminalDate = formatDate(terminalDate, `${dayjs(terminalDate).isSame(dayjs(startDate), 'month') ? '' : 'MMM'} D`);

  return `<p class="trip-info__dates">${humanizeStartDate}&nbsp;&mdash;&nbsp;${humanizeTerminalDate}</p>`;
};

export default class TripInfoDatesView extends View {
  #tripEvents;

  constructor(tripEvents) {
    super();
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoDatesTemplate(this.#tripEvents);
  }
}

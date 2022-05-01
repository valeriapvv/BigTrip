import View from './view.js';

const createTripInfoDatesTemplate = (startDate = 'Mar 18', terminalDate = 'Mar 20') => (
  `<p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${terminalDate}</p>`
);

export default class TripInfoDatesView extends View {
  getTemplate() {
    return createTripInfoDatesTemplate();
  }
}

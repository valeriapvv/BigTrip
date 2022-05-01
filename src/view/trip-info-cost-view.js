import View from './view.js';

const createTripInfoCostTemplate = (cost = 1230) => `<p class="trip-info__cost">
     Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
   </p>`;

export default class TripInfoCostView extends View {
  getTemplate() {
    return createTripInfoCostTemplate();
  }
}

import View from './view.js';
import {findSelectedOffers} from '../utils.js';

const createTripInfoCostTemplate = (tripEvents, allOffers) => {
  const basePriceTotal = tripEvents.reduce((total, {basePrice}) => total + basePrice, 0);

  const offerPriceTotal = tripEvents.reduce((total, tripEvent) => {
    const selectedOffers = findSelectedOffers(tripEvent, allOffers);

    return total + selectedOffers.reduce((offerTotal, {price}) => offerTotal + price, 0);
  }, 0);

  const cost = basePriceTotal + offerPriceTotal;
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
          </p>`;
};

export default class TripInfoCostView extends View {
  #tripEvents;
  #allOffers;

  constructor(tripEvents, allOffers) {
    super();
    this.#allOffers = allOffers;
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoCostTemplate(this.#tripEvents, this.#allOffers);
  }
}

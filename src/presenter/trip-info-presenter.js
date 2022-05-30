import TripInfoSectionView from '../view/trip-info-section-view.js';
import TripInfoTitleView from '../view/trip-info-title-view.js';
import TripInfoDatesView from '../view/trip-info-dates-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import {render, RenderPosition} from '../framework/render.js';

export default class TripInfoPresenter {
  #tripInfoContainerSite;
  #tripEventModel;

  constructor(tripInfoContainerSite, tripEventModel) {
    this.#tripInfoContainerSite = tripInfoContainerSite;
    this.#tripEventModel = tripEventModel;
  }

  init = () => {
    const tripEvents = this.#tripEventModel.tripEvents;
    const offers = this.#tripEventModel.offers;

    this.tripInfoComponent = new TripInfoSectionView();
    this.tripInfoContainer = this.tripInfoComponent.element;
    this.mainTripInfoContainer = this.tripInfoContainer.querySelector('.trip-info__main');

    render(new TripInfoTitleView(tripEvents), this.mainTripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new TripInfoDatesView(tripEvents), this.mainTripInfoContainer, RenderPosition.BEFOREEND);
    render(new TripInfoCostView(tripEvents, offers), this.tripInfoContainer, RenderPosition.BEFOREEND);
    render(this.tripInfoComponent, this.#tripInfoContainerSite, RenderPosition.AFTERBEGIN);
  };
}

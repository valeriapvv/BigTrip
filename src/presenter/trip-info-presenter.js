import TripInfoSectionView from '../view/trip-info-section-view.js';
import TripInfoTitleView from '../view/trip-info-title-view.js';
import TripInfoDatesView from '../view/trip-info-dates-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import {render, RenderPosition} from '../render.js';

export default class TripInfoPresenter {
  tripInfoComponent = new TripInfoSectionView();
  tripInfoContainer = this.tripInfoComponent.getElement();
  mainTripInfoContainer = this.tripInfoContainer.querySelector('.trip-info__main');

  init = (tripInfoContainer) => {
    render(new TripInfoTitleView(), this.mainTripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new TripInfoDatesView(), this.mainTripInfoContainer, RenderPosition.BEFOREEND);
    render(new TripInfoCostView(), this.tripInfoContainer, RenderPosition.BEFOREEND);
    render(this.tripInfoComponent, tripInfoContainer, RenderPosition.AFTERBEGIN);
  };
}

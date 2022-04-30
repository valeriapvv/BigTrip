import TripInfoSectionView from '../view/trip-info-section-view.js';
import TripInfoTitleView from '../view/trip-info-title-view.js';
import TripInfoDatesView from '../view/trip-info-dates-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import {render} from '../render.js';

export default class TripInfoPresenter {
  tripInfoComponent = new TripInfoSectionView();
  tripInfoContainer = this.tripInfoComponent.getElement();
  mainTripInfoContainer = this.tripInfoContainer.querySelector('.trip-info__main');

  init = (tripInfoContainer) => {
    render(new TripInfoTitleView(), this.mainTripInfoContainer, 'afterbegin');
    render(new TripInfoDatesView(), this.mainTripInfoContainer, 'beforeend');
    render(new TripInfoCostView(), this.tripInfoContainer, 'beforeend');
    render(this.tripInfoComponent, tripInfoContainer, 'afterbegin');
  };
}

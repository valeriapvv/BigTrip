import TripInfoSectionView from '../view/trip-info-section-view.js';
import TripInfoTitleView from '../view/trip-info-title-view.js';
import TripInfoDatesView from '../view/trip-info-dates-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import {render, replace, remove, RenderPosition} from '../framework/render.js';

export default class TripInfoPresenter {
  #tripInfoContainerSite = null;
  #tripEventModel = null;
  #tripInfoComponent = null;
  #tripInfoContainer = null;
  #mainTripInfoContainer = null;
  #tripEvents = null;
  #offers = null;
  #tripInfoTitleView = null;
  #tripInfoDatesView = null;
  #tripInfoCostView = null;

  constructor(tripInfoContainerSite, tripEventModel) {
    this.#tripInfoContainerSite = tripInfoContainerSite;
    this.#tripEventModel = tripEventModel;

    this.#tripEventModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#tripEvents = this.#tripEventModel.tripEvents;

    if (!this.#tripEvents.length) {
      if (this.#tripInfoTitleView ||  this.#tripInfoDatesView || this.#tripInfoCostView) {
        this.#removeTripInfoElements();
      }

      return;
    }

    this.#offers = this.#tripEventModel.offers;

    const prevTitleView = this.#tripInfoTitleView;
    const prevDatesView = this.#tripInfoDatesView;
    const prevCostView = this.#tripInfoCostView;

    this.#tripInfoTitleView = new TripInfoTitleView(this.#tripEvents);
    this.#tripInfoDatesView = new TripInfoDatesView(this.#tripEvents);
    this.#tripInfoCostView = new TripInfoCostView(this.#tripEvents, this.#offers);

    if (prevCostView === null || prevDatesView === null || prevTitleView === null) {
      this.#tripInfoComponent = new TripInfoSectionView();
      const tripInfoContainer = this.#tripInfoComponent.element;
      const mainTripInfoContainer = this.#tripInfoComponent.mainElement;

      render(this.#tripInfoTitleView, mainTripInfoContainer, RenderPosition.AFTERBEGIN);
      render(this.#tripInfoDatesView, mainTripInfoContainer, RenderPosition.BEFOREEND);
      render(this.#tripInfoCostView, tripInfoContainer, RenderPosition.BEFOREEND);
      render(this.#tripInfoComponent, this.#tripInfoContainerSite, RenderPosition.AFTERBEGIN);

      return;
    }

    replace(this.#tripInfoTitleView, prevTitleView);
    replace(this.#tripInfoDatesView, prevDatesView);
    replace(this.#tripInfoCostView, prevCostView);

    remove(prevTitleView);
    remove(prevDatesView);
    remove(prevCostView);
  };

  #removeTripInfoElements = () => {
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;

    remove (this.#tripInfoTitleView);
    this.#tripInfoTitleView = null;

    remove (this.#tripInfoDatesView);
    this.#tripInfoDatesView = null;

    remove(this.#tripInfoCostView);
    this.#tripInfoCostView = null;
  };

  #handleModelEvent = () => {
    this.init();
  };
}

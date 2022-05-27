import TripEventEditPresenter from './trip-event-creation-presenter.js';

const eventAddButton = document.querySelector('.trip-main__event-add-btn');

export default class AddEventButtonPresenter {

  init = (tripEventEditContainer) => {
    eventAddButton.addEventListener('click', () => {
      const tripEventEditPresenter = new TripEventEditPresenter();

      tripEventEditPresenter.init(
        tripEventEditContainer,
        () => { eventAddButton.disabled = false; },
      );

      eventAddButton.disabled = true;
    });
  };
}

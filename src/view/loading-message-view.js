import AbstractView from '../framework/view/abstract-view.js';

const createLoadingMessageView = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingMessageView extends AbstractView {
  get template () {
    return createLoadingMessageView();
  }
}

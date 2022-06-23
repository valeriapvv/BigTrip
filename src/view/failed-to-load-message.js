import AbstractView from '../framework/view/abstract-view.js';

const createFailedToLoadMessageTemplate = () => '<p class="trip-events__msg">Failed to load :(</p>';

export default class FailedToLoadMessageView extends AbstractView {
  get template () {
    return createFailedToLoadMessageTemplate();
  }
}

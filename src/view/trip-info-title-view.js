import {createElement} from '../render.js';

const createTripInfoTitleTemplate = (points = ['Amsterdam', 'Chamonix', 'Geneva']) => {
  const taskPath = points.join(' &mdash; ');

  return `<h1 class="trip-info__title">${taskPath}</h1>`;
};

export default class TripInfoTitleView {
  getTemplate() {
    return createTripInfoTitleTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

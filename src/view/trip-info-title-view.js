import View from './view.js';

const createTripInfoTitleTemplate = (points = ['Amsterdam', 'Chamonix', 'Geneva']) => {
  const taskPath = points.join(' &mdash; ');

  return `<h1 class="trip-info__title">${taskPath}</h1>`;
};

export default class TripInfoTitleView extends View {
  getTemplate() {
    return createTripInfoTitleTemplate();
  }
}

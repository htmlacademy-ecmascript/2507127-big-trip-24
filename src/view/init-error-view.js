import AbstractView from '../framework/view/abstract-view.js';

const MESSAGE = 'Failed to load latest route information';

function createInitErrorTemplate() {
  return `
    <p class="trip-events__msg">${MESSAGE}</p>
  `;
}

export default class InitErrorView extends AbstractView {
  get template() {
    return createInitErrorTemplate();
  }
}

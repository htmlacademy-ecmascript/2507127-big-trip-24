import AbstractView from '../framework/view/abstract-view.js';

const MESSAGE = 'ERROR: Failed to load data';

function createInitErrorTemplate() {
  return `
    <p class="trip-events__msg" style="color:crimson;">${MESSAGE}</p>
  `;
}

export default class InitErrorView extends AbstractView {

  get template() {
    return createInitErrorTemplate();
  }
}

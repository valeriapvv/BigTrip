const eventAddButton = document.querySelector('.trip-main__event-add-btn');

export default class AddButtonView {
  #element = eventAddButton;

  get element () {
    return this.#element;
  }

  setClickHandler = (callback) => {
    this.#element.addEventListener('click', () => {
      this.#element.disabled = true;
      callback();
    });
  };
}

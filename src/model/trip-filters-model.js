import Observable from '../framework/observable.js';
import {FilterType} from '../data/constants.js';


export default class TripFiltersModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}

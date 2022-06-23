import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

export default class TripEventsApiService extends ApiService {
  get tripEvents () {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateTripEvent = async (point) => {
    const responce = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(responce);

    return parsedResponse;
  };

  deleteTripEvent = async (point) => {
    const responce = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return responce;
  };

  addTripEvent = async (point) => {
    const responce = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(responce);

    return parsedResponse;
  };

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  };
}

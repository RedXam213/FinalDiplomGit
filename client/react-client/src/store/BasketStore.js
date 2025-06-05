import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._showBasket = false;
    this._items = [];

    makeAutoObservable(this);
  }

  setShowBasket(show) {
    this._showBasket = show;
  }

  setItems(items) {
    this._items = items;
  }

  get showBasket() {
    return this._showBasket;
  }

  get items() {
    return this._items;
  }
}

import { makeAutoObservable } from "mobx";
import { Item } from "./Item";

export class ItemCache {
    private _items: Item[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getItems() {
        return this._items;
    }

    hasItems() {
        return this._items.length > 0;
    }

    addItem(item: Item) {
        this._items.push(item);
    }

    deleteItem(item: Item) {
        this._items = this._items.filter(currentItem => currentItem.id !== item.id);
    }
}

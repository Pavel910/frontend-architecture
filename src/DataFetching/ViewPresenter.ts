import { makeAutoObservable } from "mobx";
import { ItemRepository } from "./ItemRepository";

export class ViewPresenter {
    private repository: ItemRepository;

    constructor(repository: ItemRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    loadItems() {
        this.repository.listItems();
    }

    get viewModel() {
        return {
            items: this.repository.items,
            isListing: this.repository.isListing,
            isCreating: this.repository.isCreating
        };
    }
}

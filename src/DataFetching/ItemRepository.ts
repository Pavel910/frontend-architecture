import { makeAutoObservable } from "mobx";
import { Item } from "./Item";
import { ItemCache } from "./ItemCache";

class LoadingState {
    private state = new Map<string, boolean>();

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(name: string, flag: boolean) {
        this.state.set(name, flag);
    }

    isLoading(name: string) {
        return Boolean(this.state.get(name));
    }
}

// We'll simulate the initial API call with this data
const demoItems = [new Item("1", "Item 1"), new Item("2", "Item 2")];

export class ItemRepository {
    private loading = new LoadingState();
    private cache = new ItemCache();

    constructor() {
        makeAutoObservable(this);
    }

    get isListing() {
        return this.loading.isLoading("list");
    }

    get isCreating() {
        return this.loading.isLoading("create");
    }

    get items() {
        return this.cache.getItems();
    }

    async listItems() {
        // Simulate an API call
        if (this.cache.hasItems()) {
            return;
        }

        this.loading.setLoading("list", true);
        setTimeout(() => {
            for (const item of demoItems) {
                this.cache.addItem(item);
            }
            this.loading.setLoading("list", false);
        }, 2000);
    }

    createItem(item: Item): void {
        this.loading.setLoading("create", true);
        setTimeout(() => {
            this.cache.addItem(item);
            this.loading.setLoading("create", false);
        }, 2000);
    }

    delete(item: Item) {
        this.cache.deleteItem(item);
    }
}

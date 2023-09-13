import { ItemRepository } from "./ItemRepository";
import { Item } from "./Item";

export class ItemController {
    private itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }

    addRandomItem() {
        const id = this.generateId();
        this.itemRepository.createItem(new Item(id, `Item ${id}`));
    }

    deleteItem(item: Item) {
        this.itemRepository.delete(item);
    }

    private generateId() {
        // @ts-ignore
        return window.crypto.getRandomValues(new Uint32Array(1))[0].toString();
    }
}

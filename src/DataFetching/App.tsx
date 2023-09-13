import "./styles.css";
import View from "./View";
import { ViewPresenter } from "./ViewPresenter";
import { ItemRepository } from "./ItemRepository";
import { ItemController } from "./ItemController";
import { CustomView } from "./CustomView";

// Composition root
const itemRepository = new ItemRepository();
const itemController = new ItemController(itemRepository);
const presenter = new ViewPresenter(itemRepository);

export default function App() {
    return (
        <div className="App">
            <View presenter={presenter} controller={itemController} />
            <CustomView controller={itemController} />
        </div>
    );
}

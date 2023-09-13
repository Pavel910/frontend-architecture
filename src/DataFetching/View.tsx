import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ViewPresenter } from "./ViewPresenter";
import type { ItemController } from "./ItemController";

interface ViewProps {
    presenter: ViewPresenter;
    controller: ItemController;
}

const View = ({ presenter, controller }: ViewProps) => {
    useEffect(() => {
        setTimeout(() => {
            presenter.loadItems();
        }, 2000);
    }, [presenter]);

    const { isListing, isCreating, items } = presenter.viewModel;

    return (
        <div>
            {isListing ? <p>Loading...</p> : null}
            {isCreating ? <p>Creating item...</p> : null}
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.label} <button onClick={() => controller.deleteItem(item)}>x</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => controller.addRandomItem()}>Add random item</button>
        </div>
    );
};

export default observer(View);

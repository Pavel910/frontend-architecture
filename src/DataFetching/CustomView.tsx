import { ItemController } from "./ItemController";

export const CustomView = ({ controller }: { controller: ItemController }) => {
    return <button onClick={() => controller.addRandomItem()}>Another CTA</button>;
};

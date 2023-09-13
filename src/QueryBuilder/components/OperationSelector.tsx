import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export type Operation = "AND" | "OR";
const operations = ["AND", "OR"];

interface OperationSelectorProps {
    name: string;
    value?: Operation;
    onChange?: (value: Operation) => void;
}

export const OperationSelector = (props: OperationSelectorProps) => {
    return (
        <ToggleButtonGroup
            type="radio"
            name={props.name}
            defaultValue={operations[0]}
            value={props.value}
            onChange={props.onChange}
        >
            {operations.map(operation => (
                <ToggleButton key={operation} id={`${props.name}.${operation}`} value={operation}>
                    {operation}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

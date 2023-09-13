import React from "react";
import { FilterGroupControls } from "./FilterGroupControls";

interface FilterGroupProps {
    name: string;
    onDelete?: () => void;
    onAddFilter?: () => void;
    children?: React.ReactNode;
}

export const FilterGroup = ({ name, onAddFilter, onDelete, children }: FilterGroupProps) => {
    return (
        <>
            <FilterGroupControls
                name={`${name}.operation`}
                onAddFilter={onAddFilter}
                onDelete={onDelete}
            />
            {children}
        </>
    );
};

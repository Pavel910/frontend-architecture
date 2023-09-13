import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Bind } from "@webiny/form";
import { OperationSelector } from "./OperationSelector";

interface FilterGroupControlsProps {
    name: string;
    onDelete?: () => void;
    onAddFilter?: () => void;
    onAddGroup?: () => void;
}

export const FilterGroupControls = ({
    name,
    onDelete,
    onAddGroup,
    onAddFilter
}: FilterGroupControlsProps) => {
    return (
        <Row>
            <Col xs={"auto"}>
                <Bind name={name}>
                    <OperationSelector name={name}/>
                </Bind>
            </Col>
            {onAddFilter ? (
                <Col xs={"auto"}>
                    <Button onClick={onAddFilter}>+ Filter</Button>
                </Col>
            ) : null}
            {onAddGroup ? (
                <Col xs={"auto"}>
                    <Button onClick={onAddGroup}>+ Group</Button>
                </Col>
            ) : null}
            {onDelete ? (
                <Col xs={"auto"}>
                    <Button onClick={onDelete}>x</Button>
                </Col>
            ) : null}
        </Row>
    );
};

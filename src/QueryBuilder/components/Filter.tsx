import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Bind } from "@webiny/form";
import { FilterDTO } from "../domain";

interface FilterProps {
    name: string;
    filter: FilterDTO;
    onDelete?: () => void;
}

export const Filter = ({ name, onDelete }: FilterProps) => {
    return (
        <Row>
            <Col md={3}>
                <Bind name={`${name}.field`}>
                    {({ value, onChange }) => (
                        <Form.Control
                            type="field"
                            placeholder="Field name"
                            value={value || ""}
                            onChange={e => onChange(e.target.value)}
                        />
                    )}
                </Bind>
            </Col>
            <Col md={3}>
                <Bind name={`${name}.condition`}>
                    {({ value, onChange }) => (
                        <Form.Control
                            type="field"
                            placeholder="Condition"
                            value={value || ""}
                            onChange={e => onChange(e.target.value)}
                        />
                    )}
                </Bind>
            </Col>
            <Col md={3}>
                <Bind name={`${name}.value`}>
                    {({ value, onChange }) => (
                        <Form.Control
                            type="field"
                            placeholder="Value"
                            value={value || ""}
                            onChange={e => onChange(e.target.value)}
                        />
                    )}
                </Bind>
            </Col>
            {onDelete ? (
                <Col md={3}>
                    <Button onClick={onDelete}>x</Button>
                </Col>
            ) : null}
        </Row>
    );
};

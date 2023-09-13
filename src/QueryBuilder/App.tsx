import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { FluidLayout } from "./Layout";
import { QueryBuilder } from "./components/QueryBuilder";
import { QueryBuilderPresenter } from "./adapters/QueryBuilderPresenter";

const presenter = new QueryBuilderPresenter();

export default function App() {
    return (
        <FluidLayout>
            <QueryBuilder presenter={presenter} />
        </FluidLayout>
    );
}

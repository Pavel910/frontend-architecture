import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { FluidLayout } from "./Layout";
import { QueryBuilder } from "./components/QueryBuilder";
import { QueryBuilderPresenter } from "./adapters/QueryBuilderPresenter";

export default function App() {
    return (
        <FluidLayout>
            <QueryBuilderRoot />
        </FluidLayout>
    );
}

const QueryBuilderRoot = () => {
    const [presenter, setPresenter] = useState<QueryBuilderPresenter | undefined>();

    useEffect(() => {
        // Prepare all dependencies, then instantiate the Presenter
        const fields = [{ id: 1, fieldId: "name", type: "boolean" }];

        setPresenter(new QueryBuilderPresenter());
    }, []);

    if (!presenter) {
        return null;
    }

    return <QueryBuilder presenter={presenter} />;
};

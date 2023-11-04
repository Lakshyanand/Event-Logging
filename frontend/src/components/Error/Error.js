import React from "react";
import { useRouteError } from "react-router-dom";
import PageContent from "../PageContent";
import MainNavigation from "../Navigation/MainNavigation";

function Error() {

    const error = useRouteError();

    let title = 'An error occurred';
    let message = 'something went wrong';

    if(error.status === 500) {
        message = error.data.message;
    }

    if(error.status === 404) {
        title = 'Not found';
        message = 'unknown page found';
    }

    return(
        <> 
            <MainNavigation />
            <PageContent title={title}>
                {message}
            </PageContent>
        </>
    );
};

export default Error;
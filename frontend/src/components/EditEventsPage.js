import React from 'react';
import EventForm from './EventForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditEventsPage() {

    const data = useRouteLoaderData('event-detail');
    
    return <EventForm method='PATCH' event={data.event}/>
}

export default EditEventsPage;
import React from 'react';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from './EventItem';

function EventsDetails() {

    // const params = useParams();
    const data = useRouteLoaderData('event-detail');

    return <EventItem event={data.event}/>
}

export default EventsDetails;

export async function loader({request, params}) {
    const response = await fetch('http://localhost:3000/events/' + params.id);

    if(!response.ok) {
        throw json({message:'could not find the data'}, {status: 500})
    } else {
        return response;
    }
}

export async function action({request, params}) {
    const response = await fetch('http://localhost:3000/events/' + params.id, {
        method: request.method
    });

    if(!response.ok) {
        throw json({message:'could not delete the data'}, {status: 500})
    } else {
        return redirect('/events');
    }
}
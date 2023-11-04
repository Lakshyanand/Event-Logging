import EventsList from '../components/EventsList';
import { json, useLoaderData } from 'react-router-dom';

function EventsPage() {
    
    const events = useLoaderData();
    return <EventsList events={events} />
}

export default EventsPage;

export async function loader() {
    const response = await fetch('http://localhost:3000/events');
    if (!response.ok) {
        // throw new Response(JSON.stringify({message:'something went wrong'}), {status: 500});
        throw json({message:'something went wrong'}, {status: 500});
    } else {
    const resData = await response.json();
    return resData.events;
    }
}
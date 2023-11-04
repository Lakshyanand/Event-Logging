import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "./components/HomePage";
import EventsPage, {loader as useLoader} from "./components/EventsPage";
import EventsDetails, {loader as eventDetailsLoader, action as deleteEventAction} from "./components/EventDetails";
import NewEventPage from "./components/NewEventPage";
import EditEventsPage from "./components/EditEventsPage";
import RootLayout from "./components/Navigation/Root";
import EventRootLayout from "./components/Navigation/EventRoot";
import Error from "./components/Error/Error";
import { action as newEventAction} from "./components/EventForm";
function App() {

  const routes = createBrowserRouter([
    {path: '/', element: <RootLayout />, errorElement: <Error />, children: [
      {index: true, element: <HomePage />},
      {path: 'events', element: <EventRootLayout />, end:true, children: [
        {index: true, element: <EventsPage />, loader: useLoader},
        {path: ':id', id:'event-detail', loader: eventDetailsLoader , children: [
          {index: true, element: <EventsDetails />, action: deleteEventAction},
          {path: 'edit', element: <EditEventsPage />, action: newEventAction},
        ]},
        {path: 'new', element: <NewEventPage />, action: newEventAction},
      ]}
    ]}, 
  ])
  return <div>
    <RouterProvider router={routes} />
  </div>;
}

export default App;

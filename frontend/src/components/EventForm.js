import { Form, useNavigate, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method='POST' className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}) {

  const event = await request.formData();
  const method = await request.method;

  const data = {
      title: event.get('title'),
      image: event.get('image'),
      date: event.get('date'),
      description: event.get('description')
  }

  let url = 'http://localhost:3000/events';

  if(method === 'PATCH') {
    url = 'http://localhost:3000/events' + params.id;
  }

  const response = await fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })

  if(!response.ok) {
      throw json({message: 'Could not save data'}, {status: 500})
  }

  return redirect('/events');
}

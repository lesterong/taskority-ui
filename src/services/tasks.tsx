import { TaskBase } from '../types/Task';

const baseUrl = 'https://taskority-api.fly.dev/api/tasks/';

const getAll = () => {
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') || ''),
    },
  };
  const request = fetch(baseUrl, init);
  return request.then((response) => response.json());
};

const create = (taskObject: TaskBase) => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') || ''),
    },
    body: JSON.stringify(taskObject),
  };
  const request = fetch(baseUrl, init);
  return request.then((response) => response.json());
};

const update = (id: number, taskObject: TaskBase) => {
  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') || ''),
    },
    body: JSON.stringify(taskObject),
  };
  const request = fetch(`${baseUrl}/${id}`, init);
  return request.then((response) => response.json());
};

const remove = (id: number) => {
  const init = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') || ''),
    },
  };
  const request = fetch(`${baseUrl}/${id}`, init);
  return request;
};

const servicesObject = { getAll, create, update, remove };

export default servicesObject;

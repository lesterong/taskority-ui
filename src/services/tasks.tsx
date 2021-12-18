const baseUrl = "http://localhost:3001/tasks/";

const getAll = () => {
  const init = { 
    method: 'GET'
  };
  const request = fetch(baseUrl, init)
  return request
    .then(response => response.json())
    .then()
};

const create = (newObject: any) => {
  const init = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObject)
  };
  const request = fetch(baseUrl, init);
  return request
    .then(response => response.json())
    .then();
};

const update = (id: number, newObject: any) => {
  const init = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObject)
  };
  const request = fetch(`${baseUrl}/${id}`, init);
  return request
    .then(response => response.json())
    .then();
};

const remove = (id: number) => {
  const init = {
    method: "DELETE",
  };
  const request = fetch(`${baseUrl}/${id}`, init);
  return request.then();
};

const servicesObject = { getAll, create, update, remove };

export default servicesObject;
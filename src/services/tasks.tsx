const baseUrl = "http://localhost:8000/api/tasks/";

const auth = sessionStorage.getItem('token') || "";

const getAll = () => {
  const init = { 
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(auth)
    }
  };
  const request = fetch(baseUrl, init)
  return request
    .then(response => response.json())
};

const create = (newObject: any) => {
  const init = {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(auth)
    },
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
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(auth)
    },
    body: JSON.stringify(newObject)
  };
  const request = fetch(`${baseUrl}/${id}`, init);
  return request
    .then(response => response.json())
};

const remove = (id: number) => {
  const init = {
    method: "DELETE",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(auth)
    }
  };
  const request = fetch(`${baseUrl}/${id}`, init);
  return request;
};

const servicesObject = { getAll, create, update, remove };

export default servicesObject;
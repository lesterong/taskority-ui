const baseUrl = "http://localhost:8000/api";

const login = (userObject: any) => {
  const init = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  }
  const request = fetch(`${baseUrl}/login`, init);
  return request
    .then(response => response)
}

const signup = (userObject: any) => {
  const init = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  }
  const request = fetch(`${baseUrl}/signup`, init);
  return request
    .then(response => response)
}

const logout = () => {
  const init = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem('token') || "")
    }
  }
  const request = fetch(`${baseUrl}/logout`, init);
  return request
}

const servicesObject = { login, signup, logout };

export default servicesObject;
const baseUrl = "http://localhost:8000/api";

const auth = sessionStorage.getItem('token') || "";

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
    .then(response => response.headers.get('Authorization'))
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
    .then(response => response.json())
}

const logout = () => {
  const init = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(auth)
    }
  }
  const request = fetch(`${baseUrl}/logout`, init);
  sessionStorage.clear()
  return request
}

const servicesObject = { login, signup, logout };

export default servicesObject;
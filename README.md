## Steps for connecting the frontend with backend
1. axios => server call
    npm install axios
2. react-toastify => for message displaying
    npm install react-toastify

server url => 
    BASE_URL = http://localhost:9090
    BASE_URL/api/v1/auth/register

    how to access error message:
        errorObject.response.data.password

    usestate
        error.errors.response.data.name

login url =>
    BASE_URL = http://localhost:9090
    BASE_URL/api/v1/auth/login

    {
        username:"",
        password:""
    }
    In return get a token and store it in localhost.
    
    POST


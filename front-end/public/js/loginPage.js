import axios from 'axios';

function onSubmit()
{
    axios.post('http://localhost:8080/api/login/user', 
    {
        email: email,
        password: password,
    });
}
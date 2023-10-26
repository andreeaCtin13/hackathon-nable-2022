"use strict";

const userButton = document.getElementById("userButton");
const orgButton = document.getElementById("orgButton");
const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");

userButton.addEventListener("click", function () {
    registerButton.setAttribute(
        "href",
        "http://localhost:8080/registerUser"
    );
    loginButton.setAttribute(
        "href",
        "http://localhost:8080/login"
    );
    userButton.setAttribute("style", "text-decoration:underline");
    orgButton.setAttribute("style", "text-decoration:none");
});

orgButton.addEventListener("click", function () {
    registerButton.setAttribute(
        "href",
        "http://localhost:8080/registerOrg"
    );
    loginButton.setAttribute(
        "href",
        "http://localhost:8080/login"
    );
    orgButton.setAttribute("style", "text-decoration:underline");
    userButton.setAttribute("style", "text-decoration:none");
});

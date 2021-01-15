var ajaxService = null;

function init() {
    document.getElementById("loginBtn").addEventListener("click", signIn);
    ajaxService = new AjaxService();
}

function signIn() {
    var login = document.getElementById("login").value;
    ajaxService.post({
        url: "http://127.0.0.1:8085/auth/login",
        data: {
            login: login,
            password: document.getElementById("password").value
        },
        success: function (response) {
            if (response.logged === true) {
                showUserDetails(login);
            } else {
                showMessage(response.message);
            }
        }
    });
}

function showUserDetails(login) {
    ajaxService.get({
        url: `http://127.0.0.1:8085/userDetails/${login}`,
        data: {
            login: login
        },
        success: function (response) {
            document.getElementById("loginPanel").style.display = "none";
            document.getElementById("appPanel").style.display = "block";
            document.getElementById("userDetails").textContent = `${response.name} ${response.surname}`;
        }
    });
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

document.addEventListener("DOMContentLoaded", init);
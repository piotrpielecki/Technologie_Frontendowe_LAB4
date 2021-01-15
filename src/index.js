var ajaxService = null;

function init() {
    document.getElementById("loginBtn").addEventListener("click", signIn);
    document.getElementById("showUsersBtn").addEventListener("click", showAllUsers);
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

function showAllUsers(login) {
    ajaxService.get({
        url: `http://127.0.0.1:8085/allUsers`,
        success: function (response) {
            console.log();
            console.log(Object.values(response));
            if (typeof response == "object") {
                response = Object.values(response);
            }
            var table = document.getElementById("tableContent");
            response.forEach(element => {
                console.log(element);
                var row = document.createElement("tr");
                var nameNode = document.createElement("td");
                nameNode.innerText = element["name"];
                var surnameNode = document.createElement("td");
                surnameNode.innerText = element["surname"];
                var emailNode = document.createElement("td");
                emailNode.innerText = element["email"];

                row.appendChild(nameNode);
                row.appendChild(surnameNode);
                row.appendChild(emailNode);
                table.appendChild(row);
            });
            document.getElementById("tableContent").innerHTML
        }
    });
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

document.addEventListener("DOMContentLoaded", init);
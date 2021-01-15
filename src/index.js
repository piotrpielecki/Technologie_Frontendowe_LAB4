var ajaxService = new AjaxService;

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
            if (typeof response == "object") {
                response = Object.values(response);
            }
            var table = document.getElementById("tableContent");
            response.forEach(element => {
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

function add(A, B) {
    ajaxService.post({
        url: "http://127.0.0.1:8085/calc/add",
        data: {
            a: A,
            b: B
        },
        success: function (response) {
            $("#input-C").val(parseInt(response));
        }
    });
}

function substract(A, B) {
    ajaxService.post({
        url: "http://127.0.0.1:8085/calc/subtract",
        data: {
            a: A,
            b: B
        },
        success: function (response) {
            $("#input-C").val(parseInt(response));
        }
    });
}

function multiply(A, B) {
    ajaxService.post({
        url: "http://127.0.0.1:8085/calc/multiply",
        data: {
            a: A,
            b: B
        },
        success: function (response) {
            $("#input-C").val(parseInt(response));
        }
    });
}

function divide(A, B) {
    ajaxService.post({
        url: "http://127.0.0.1:8085/calc/divide",
        data: {
            a: A,
            b: B
        },
        success: function (response) {
            $("#input-C").val(parseInt(response));
        }
    });
}

function escalate(A, B) {
    ajaxService.post({
        url: "http://127.0.0.1:8085/calc/power",
        data: {
            a: A,
            b: B
        },
        success: function (response) {
            $("#input-C").val(parseInt(response));
        }
    });
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function error(x = null) {
    switch(x) {
        case "A":
            $("#error-A").attr("class", "alert alert-danger");
            break;
        case "B":
            $("#error-B").attr("class", "alert alert-danger");
            break;
        default:
            $("#error-A").attr("class", "alert alert-danger");
            $("#error-B").attr("class", "alert alert-danger");
            break;
    }
}

function unError(x = null) {
    switch(x) {
        case "A":
            $("#error-A").attr("class", "alert alert-danger d-none");
            break;
        case "B":
            $("#error-B").attr("class", "alert alert-danger d-none");
            break;
        default:
            $("#error-A").attr("class", "alert alert-danger d-none");
            $("#error-B").attr("class", "alert alert-danger d-none");
            break;
    }
}

jQuery(function () {
    $("#submit").click(function () {
        var A = parseInt($("#input-A").val());
        var B = parseInt($("#input-B").val());

        if (isNumeric(A) && isNumeric(B)) {
            switch (window.location.pathname) {
                case "/src/adding.html":
                    add(A, B);
                    break;
                case "/src/subtraction.html":
                    substract(A, B);
                    break;
                case "/src/multiplication.html":
                    multiply(A, B);
                    break;
                case "/src/division.html":
                    divide(A, B);
                    break;
                case "/src/escalate.html":
                    escalate(A, B)
                    break;
                default:
                    add(A, B);
                    break;
            }
            unError("A");
            unError("B");
        } else if (!isNumeric(A) && isNumeric(B)) {
            error("A");
            unError("B");
            $("#input-C").val(0);
        } else if (!isNumeric(B) && isNumeric(A)) {
            error("B");
            unError("A");
            $("#input-C").val(0);
        } else {
            error();
            $("#input-C").val(0);
        }
    });
})
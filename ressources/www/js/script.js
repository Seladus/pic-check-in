function createCollectionElement(user) {
    var child = document.createElement("li");
        var workingMessage = user.isWorking ? "oui" : "non";
        var innerHTML = `
        <li class="collection-item avatar user">
            <img src="images/placeholder.jpg" alt="" class="circle">
            <span class="title">${user.name}</span>
            <p>${user.isWorking ? "Est en train de travailler" : "Ne travaille pas"}<br>
            ${user.isWorking ? `Depuis ${Math.floor(user.sessionLength/1000/60)} minutes` : ""}</p>
            <a href="#!" class="secondary-content black-text">
                <i class="material-icons">${user.isWorking ? (user.isDistance ? "contactless" : "event_seat") : "king_bed"}</i>
                <span class="dot ${user.isWorking ? "green" : "red"}"></span>
            </a>
        </li>`;
        child.innerHTML = innerHTML;
    return child;
}

function clearUserCollection(element) {
    while (element.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling) {
        element.removeChild(element.lastChild);
    }
}

function clearAllChildren(element) {
    while(element.firstChild.nextSibling) {
        element.removeChild(element.lastChild);
    }
}

function reqListener () {
    var element = document.getElementById("collection");
    clearUserCollection(element);
    var users = JSON.parse(this.responseText);
    for (u in users) {
        var user = users[u];
        var child = createCollectionElement(user); 
        element.appendChild(child);
    }
    if (!usersListUpdated) {
        usersListUpdated = true;
        updateUsersListInForms(users);
    }
}

function updateCollection() {
    var request = new XMLHttpRequest();
    request.onload = reqListener;
    request.open("get", "/api?type=users_info", true);
    request.send();
}

function updateUsersListInForms(users) {
    var listForms = document.getElementsByClassName("user_select");
    for (element in listForms) {
        clearAllChildren(listForms.item(element));
        for (user in users) {
            var child = document.createElement("option");
            child.value = users[user].name;
            child.innerHTML = users[user].name;
            listForms.item(element).appendChild(child);
        }
    }
}

function displayForm(formID, sourceID) {
    var source = document.getElementById(sourceID);
    var target = document.getElementById(formID);
    if (source.value == "not displayed") {
        target.style.display='block';
        source.value = "displayed"
    } else {
        target.style.display='None';
        source.value = "not displayed"
    }
}

function sendStartSessionRequest() {
    var name = document.querySelector("#form_start > div > .user_select").value;
    var isDistance = document.querySelector("#form_start > div > .user_distance > label > input").checked;

    var request = new XMLHttpRequest();
    request.onload = function () {
        document.location.reload();
    };
    request.open("post", `/api?type=start_session&name=${name}&isDistance=${!isDistance}`, true);
    request.send();
}

function sendEndSessionRequest() {
    var name = document.querySelector("#form_end > div > .user_select").value;

    var request = new XMLHttpRequest();
    request.onload = function () {
        document.location.reload();
    };
    request.open("post", `/api?type=end_session&name=${name}`, true);
    request.send();
}

var usersListUpdated = false;

(function(){
    updateCollection();
    setTimeout(arguments.callee, 10000);
})();
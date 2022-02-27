// create user data in database by getting data from user and posting it to server side
// listener
document
  .getElementById("submitBtn")
  .addEventListener("click", handlerInsertData);

// handler
function handlerInsertData() {
  const usernameData = document.getElementById("usernameCreate").value;
  const passwordData = document.getElementById("passwordCreate").value;
  const birthdayData = document.getElementById("birthdayCreate").value;
  usernameData.value = "";
  usernameData.value = "";
  usernameData.value = "";

  fetchApiInsert(usernameData, passwordData, birthdayData);
}

// api-call -> fetch() method is used in client side
// app.post() method of 'express.js' will be used in server side to realize 'create/insert' action in database

const fetchApiInsert = (usernameData, passwordData, birthdayData) => {
  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: usernameData,
      password: passwordData,
      birthday: birthdayData,
    }),
  });
};

// read needed data from database
// listener
document.getElementById("searchBtn").addEventListener("click", handlerSearch);

// handler
function handlerSearch() {
  const name = document.getElementById("search").value;
  fetchApiSearch(name);
}

// api-call -> fetch() method is used in client side
// app.get() method of 'express.js' will be used in server side to realize 'read/get' action from database
const fetchApiSearch = (userInput) => {
  fetch(`http://localhost:5000/username/${userInput}`)
    .then((response) => response.json())
    .then((data) => renderSearchResult(data));
};

// render data which came from database
const renderSearchResult = (data) => {
  document.getElementById(
    "searchResult"
  ).innerHTML = `<p>${data[0].birthday}</p>`;
};

// update user data in database by getting updated data from user and posting it to server side
// listener
document.getElementById("updateBtn").addEventListener("click", handlerUpdate);

// handler
function handlerUpdate() {
  const usernameUpdate = document.getElementById("usernameUpdate").value;
  const passwordUpdate = document.getElementById("passwordUpdate").value;
  const birthdayUpdate = document.getElementById("birthdayUpdate").value;

  usernameUpdate.value = "";
  passwordUpdate.value = "";
  birthdayUpdate.value = "";

  fetchApiUpdate(usernameUpdate, passwordUpdate, birthdayUpdate);
}

// api-call -> fetch() in client side and patch() in server side are used
// app.patch() method of 'express.js' will be used in server side to realize 'update' action in database
const fetchApiUpdate = (userInput1, userInput2, userInput3) => {
  fetch("http://localhost:5000/update", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: userInput1,
      password: userInput2,
      birthday: userInput3,
    }),
  });
};

// delete user data from database by getting username from user and send delete call to server side
// listener
document.getElementById("deleteBtn").addEventListener("click", handlerDelete);

// handler
function handlerDelete() {
  const username = document.getElementById("deleteInput").value;
  fetchApiDelete(username);
  document.getElementById("deleteInput").value = "";
}

// api-call -> fetch() method is used in client side
// app.delete() method of 'express.js' will be used in server side to realize 'delete' action from database
const fetchApiDelete = (userInput) => {
  fetch("http://localhost:5000/delete/" + userInput, {
    method: "DELETE",
  });
};

// read all data from database
// listener
document.getElementById("shoAllBtn").addEventListener("click", handlerShowAll);

// handler
function handlerShowAll() {
  fetchApiShowAllData();
}

// api-call -> fetch() method is used in client side
// app.get() method of 'express.js' will be used in server side to realize 'read/get' action from database
const fetchApiShowAllData = () => {
  fetch(`http://localhost:5000/showAll`)
    .then((response) => response.json())
    .then((data) => renderShowAllData(data));
};

// render data which came from database
const renderShowAllData = (data) => {
  const outerDiv = document.createElement("div");
  outerDiv.className = "outer";
  document.getElementById("showAllResult").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const innerDiv = document.createElement("div");
    innerDiv.className = "inner";
    innerDiv.innerHTML = `<h4>Username:</h4>
                      <p>${data[i].username}</p>
                      <h4>Password:</h4>
                      <p>${data[i].password}</p>
                      <h4>Birthday:</h4>
                      <p>${data[i].birthday}</p>`;
    outerDiv.appendChild(innerDiv);
  }

  document.getElementById("showAllResult").appendChild(outerDiv);
};

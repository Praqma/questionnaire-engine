import { getUsers, deleteUser } from "./api/user-api";

getUsers().then(result => {
  let usersBody = "";
  result.forEach(user => {
    usersBody += `<tr>
            <td><a href="#" data-id="${user.id}" class="deleteUser">${user.id}</a></td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            </tr>`;
  });
  global.document.getElementById("users").innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName("deleteUser");

  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  });
});

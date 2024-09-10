const baseUrl = "http://localhost:3600/todos";
const inputs = document.querySelectorAll(".inputs");
const elName = document.querySelector("#name");
const elEmail = document.querySelector("#email");

const userList = document.querySelector("#userList");
const userForm = document.querySelector("#userForm");

function getData() {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => render(data));
}
getData();
function render(data) {
  userList.innerHTML = data
    .map((item) => {
      return `<li class="flex justify-between"><p>${item.title} , ${item.description}</p> <div>
          <button data-edit=${item.id} class="bg-green-500 py-1 px-3 rounded-md text-white font-bold">edit</button>
          <button data-delete=${item.id} class="bg-red-500 py-1 px-3 rounded-md text-white font-bold">Delete</button>
      </div></li>`;
    })
    .join("");
}

userList.addEventListener("click", (e) => {
    let editId = e.target.dataset.edit;
    let deleteId = e.target.dataset.delete;
    
    if (editId) {
      fetch(`${baseUrl}/${editId}`)
        .then((res) => res.json())
        .then((data) => {
          elName.value = data.title;  
          elEmail.value = data.description;   
          document.getElementById('userForm').onsubmit = (event) => {
            event.preventDefault(); 
            const updatedUser = {
              title: elName.value,
              description: elEmail.value
            };
  
            fetch(`${baseUrl}/${editId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Updated user:", data);
                getData(); 
              });
          };
        });
    }
  
    if (deleteId) {
      fetch(`${baseUrl}/${deleteId}`, {
        method: "DELETE"
      }).then(() => getData()); 
    }
  });
  
userForm.addEventListener("submit", (e) => {
e.preventDefault()

data = {title:elName.value ,description:elEmail.value}
   fetch(`${baseUrl}`,{
       headers:{
        "Content-type": "application/json; charset=UTF-8"
       },
    method:"POST",
    body: JSON.stringify(data)
   })
});





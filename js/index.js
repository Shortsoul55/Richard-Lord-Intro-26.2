const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
const footer = document.createElement("footer");
copyright.textContent = `© ${thisYear} Richard Lord — All Rights Reserved`;

footer.appendChild(copyright);
document.body.appendChild(footer);

// Create an array of your technical skills
const skills = ["JavaScript", "HTML", "CSS", "Git", "Visual Studio Code", "PowerShell", "GitHub"];

const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.forms["leave_message"];

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  const messageList = document.querySelector("#messages ul");
  const newMessage = document.createElement("li");

  newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage}</span>`;

  /*Edit Button*/
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.type = "button";

  editButton.addEventListener("click", function () {
    const messageContent = newMessage.querySelector("span");
    const currentMessage = messageContent.textContent;
    const newMessageText = prompt("Edit your message:", currentMessage);

    if (newMessageText !== null) {
      messageContent.textContent = newMessageText;
    }
  });
  
  newMessage.appendChild(editButton);

  /*Remove Button*/
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    messageList.removeChild(newMessage);

    if (messageList.children.length === 0) {
  messageList.parentNode.style.display = "none";
}

  });
  
  newMessage.appendChild(removeButton);

  /*Add to List*/
  messageList.appendChild(newMessage);
  messageList.parentNode.style.display = "block";


  console.log(usersName, usersEmail, usersMessage);

  messageForm.reset();
});
fetch("https://api.github.com/users/Shortsoul55/repos");
  .then((response) => response.json())
  .then((repositories) => {
    console.log(repositories); // REQUIRED

    const projectSection = document.querySelector("#Projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i];

      const projectItem = document.createElement("li");
      const projectLink = document.createElement("a");

      projectLink.href = repo.html_url;
      projectLink.textContent = repo.name;
      projectLink.target = "_blank";

      projectItem.appendChild(projectLink);
      projectList.appendChild(projectItem);
    }
  })
  .catch((error) => {
    const projectSection = document.querySelector("#Projects");
    projectSection.innerHTML = "<p>Could not load repositories.</p>";
    console.error("Error fetching repositories:", error);
  });














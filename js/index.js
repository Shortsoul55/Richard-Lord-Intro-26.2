const today = new Date();
const thisYear = today.getFullYear();

const body = document.body;
const footer = document.createElement("footer");

footer.textContent = `© ${thisYear} Richard Lord — All Rights Reserved`;
body.appendChild(footer);

// Create an array of your technical skills
const skills = ["JavaScript", "HTML", "CSS", "Git", "Visual Studio Code", "PowerShell", "GitHub"];

const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

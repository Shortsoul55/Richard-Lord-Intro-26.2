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










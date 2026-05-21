const today = new Date();
const thisYear = today.getFullYear();

const body = document.body;
const footer = document.createElement("footer");

footer.textContent = `© ${thisYear} Richard Lord — All Rights Reserved`;
body.appendChild(footer);

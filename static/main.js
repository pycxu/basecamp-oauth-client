const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get("token");

// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = "block";
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = "none";
};

const showToken = (selector, token) => {
  document.querySelector(selector).innerText = token;
};

if (TOKEN) {
  hide(".content.unauthorized");
  show(".content.authorized");
  showToken(".token", TOKEN);
}

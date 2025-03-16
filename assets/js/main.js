/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
}

if (navClose) {
  navClose.addEventListener("click", () => navMenu.classList.remove("show-menu"));
}

document.querySelectorAll(".nav__link").forEach((link) =>
    link.addEventListener("click", () => navMenu.classList.remove("show-menu"))
);

/*==================== QUALIFICATION TABS ====================*/
document.querySelectorAll("[data-target]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    document.querySelectorAll("[data-content]").forEach((content) => {
      content.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    document.querySelectorAll("[data-target]").forEach((t) => {
      t.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__button"),
    modalCloses = document.querySelectorAll(".services__modal-close");

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modalViews[i].classList.add("active-modal");
    document.body.classList.add("disable-scroll");
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
      document.body.classList.remove("disable-scroll");
    });
  });
});

/*==================== PORTFOLIO SWIPER ====================*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const { offsetHeight: sectionHeight, offsetTop: sectionTop } = current;
    const sectionId = current.getAttribute("id");

    const isInView = scrollY > sectionTop - 50 && scrollY <= sectionTop + sectionHeight;
    const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    link.classList.toggle("active-link", isInView);
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  nav.classList.toggle("scroll-header", window.scrollY >= 80);
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  scrollUp.classList.toggle("show-scroll", window.scrollY >= 560);
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// Initialize theme if set by user
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== CONTACT ME ====================*/
const sendLink = document.getElementById("send-message-link");
sendLink.addEventListener("click", (event) => event.preventDefault());

function sendMail() {
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    project: document.getElementById("project").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_68qcitg";
  const templateID = "template_przv175";

  emailjs.send(serviceID, templateID, params)
      .then(
          res => {
            document.querySelectorAll("#name, #email, #project, #message").forEach(input => input.value = "");
            console.log(res);
            alert("Your message was sent successfully");
          },
          err => console.error(err)
      );
}

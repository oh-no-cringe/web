const sections = document.querySelectorAll(".content-section");
const tocLinks = document.querySelectorAll(".toc a");
const navLinks = document.querySelectorAll(".main-nav a");

function activateLinks() {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 160;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      currentId = section.id;
    }
  });

  tocLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", activateLinks);
window.addEventListener("load", activateLinks);

window.addEventListener("load", () => {
  const logoImage = document.getElementById("logoImage");
  const logoPlaceholder = document.getElementById("logoPlaceholder");

  if (logoImage && logoImage.getAttribute("src") && !logoImage.complete) {
    logoImage.style.display = "none";
    logoPlaceholder.style.display = "flex";
  }

  logoImage.addEventListener("load", () => {
    logoImage.style.display = "block";
    logoPlaceholder.style.display = "none";
  });

  logoImage.addEventListener("error", () => {
    logoImage.style.display = "none";
    logoPlaceholder.style.display = "flex";
  });
});

// ===== Скрытие верхней полоски только на телефоне =====
(function() {
  // Проверяем, что это мобильное устройство (ширина экрана <= 768px)
  if (window.innerWidth > 768) return; // на широких экранах ничего не делаем

  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  let lastScrollTop = 0;
  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Прокрутка вниз и не в самом верху
        if (scrollTop > lastScrollTop && scrollTop > 50) {
          topbar.classList.add('hide-on-scroll');
        } else {
          topbar.classList.remove('hide-on-scroll');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
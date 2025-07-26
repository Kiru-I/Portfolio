// Typing Animation
var typed = new Typed(".typing", {
  strings: ["", "Web Developer", "Python Developer", "Fullstack Developer"],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});

var typed = new Typed(".typing2", {
  strings: ["", "Web Developer", "Python Developer", "Fullstack Developer"],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});

// Navigation Logic
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();

    for (let j = 0; j < totalNavList; j++) {
      const link = navList[j].querySelector("a");
      if (link.classList.contains("active")) {
        addBackSection(j);
      }
      link.classList.remove("active");
    }

    this.classList.add("active");
    showSection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSection(num) {
  allSection[num].classList.add("back-section");
}

function showSection(element) {
  const target = element.getAttribute("href").split("#")[1];
  const targetSection = document.getElementById(target);

  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active", "slide-from-left");

    if (allSection[i].id === target) {
      allSection[i].classList.add("slide-from-left", "active");
      updateDots(i); // ← update dots here when section is shown
    }
  }
}


function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    const link = navList[i].querySelector("a");
    link.classList.remove("active");

    const target = element.getAttribute("href").split("#")[1];
    if (target === link.getAttribute("href").split("#")[1]) {
      link.classList.add("active");
    }
  }
}

// Hire Me button
document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
});

// Aside toggle
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

let startX = 0;
let endX = 0;

document.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
  }
}, { passive: true });

document.addEventListener("touchend", function (e) {
  if (e.changedTouches.length === 1) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }
}, { passive: true });

function handleSwipe() {
  const diffX = endX - startX;
  const threshold = 100; // Make it more responsive (was 100 before)
  const activeIndex = getCurrentSectionIndex();

  if (diffX > threshold) {
    // Swipe right → previous
    const prevIndex = (activeIndex - 1 + totalSection) % totalSection;
    navigateToSection(prevIndex);
  } else if (diffX < -threshold) {
    // Swipe left → next
    const nextIndex = (activeIndex + 1) % totalSection;
    navigateToSection(nextIndex);
  }
}

function updateDots(index) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

function navigateToSection(index) {
  removeBackSection();
  addBackSection(getCurrentSectionIndex());

  allSection.forEach(section => section.classList.remove("active"));
  allSection[index].classList.add("active");

  updateNav(navList[index].querySelector("a"));
  updateDots(index); // ← Add this

  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active", "slide-from-left");
  }

  allSection[index].classList.add("active", "slide-from-left");

  const targetId = allSection[index].getAttribute("id");
  const navLink = document.querySelector(`.nav a[href="#${targetId}"]`);
  if (navLink) updateNav(navLink);
}

function getCurrentSectionIndex() {
  for (let i = 0; i < totalSection; i++) {
    if (allSection[i].classList.contains("active")) {
      return i;
    }
  }
  return 0;
}

// Dot Navigation (add this to make dots clickable)
const navDots = document.querySelectorAll(".nav-dots .dot");

navDots.forEach((dot, index) => {
  dot.addEventListener("click", function (e) {
    e.preventDefault();
    navigateToSection(index); // Reuse your existing function
  });
});

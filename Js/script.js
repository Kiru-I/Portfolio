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
  const targetIndex = Array.from(allSection).findIndex(sec => sec.id === target);
  const currentIndex = getCurrentSectionIndex();

  allSection.forEach(section =>
    section.classList.remove("active", "slide-left", "slide-right")
  );

  if (targetIndex < currentIndex) {
    allSection[targetIndex].classList.add("slide-left");
  } else if (targetIndex > currentIndex) {
    allSection[targetIndex].classList.add("slide-right");
  }

  allSection[targetIndex].classList.add("active");

  updateDots(targetIndex);
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

//Swipe
function handleSwipe() {
  const diffX = endX - startX;
  const threshold = 100;
  const activeIndex = getCurrentSectionIndex();

  if (diffX > threshold) {
    const prevIndex = (activeIndex - 1 + totalSection) % totalSection;
    navigateToSection(prevIndex, "right");
  } else if (diffX < -threshold) {
    const nextIndex = (activeIndex + 1) % totalSection;
    navigateToSection(nextIndex, "left");
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

// Slide left or right
function navigateToSection(index, direction) {
  const currentIndex = getCurrentSectionIndex();

  removeBackSection();
  addBackSection(currentIndex);

  allSection.forEach(section =>
    section.classList.remove("active", "slide-from-left", "slide-from-right")
  );

  allSection.forEach(section => {
    section.classList.remove("slide-left", "slide-right", "active");
  });

  allSection[index].classList.add("active");

  if (direction === "left") {
    allSection[index].classList.add("slide-right");
  } else if (direction === "right") {
    allSection[index].classList.add("slide-left");
  }

  updateNav(navList[index].querySelector("a"));
  updateDots(index);

  const targetId = targetSection.getAttribute("id");
  const navLink = document.querySelector(`.nav a[href="#${targetId}"]`);
  if (navLink) updateNav(navLink);
}


// Dots

function updateDots(index) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) {
    dots[index].classList.add("active");
  }
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
    const currentIndex = getCurrentSectionIndex();

    let direction = "left";
    if (index < currentIndex) direction = "right";

    navigateToSection(index, direction);
  });
});

      if (!window.location.href.startsWith("https://kiru-i.netlify.app")) {
        const meta = document.createElement("meta");
        meta.httpEquiv = "refresh";
        meta.content = "0;url=https://kiru-i.netlify.app/";
        document.head.appendChild(meta);
      }
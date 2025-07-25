  // Get elements
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // Attach click event to all portfolio images
  document.querySelectorAll(".portfolio-img img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
    });
  });

  // Close lightbox when X is clicked
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Optional: close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
console.log("Portfolio website loaded");

function showSection(sectionId) {
  const sections = document.querySelectorAll(".work-section");

  sections.forEach(function(section) {
    section.classList.remove("active");
  });

  const selectedSection = document.getElementById(sectionId);

  if (selectedSection) {
    selectedSection.classList.add("active");
  }
}

function toggleCard(card) {
  card.classList.toggle("open");

  const videos = card.querySelectorAll("video");

  videos.forEach(function(video) {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    if (card.classList.contains("open")) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}

const urlParams = new URLSearchParams(window.location.search);
const selectedSectionId = urlParams.get("section");

if (selectedSectionId) {
  showSection(selectedSectionId);
}

const contactLink = document.querySelector(".top-nav a[href='#contact']");

if (contactLink) {
  contactLink.addEventListener("click", function(event) {
    event.preventDefault();

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });

      window.history.replaceState(null, "", window.location.pathname);
    }
  });
}

/* Card open and close */

const workCards = document.querySelectorAll(".work-card");

workCards.forEach(function(card) {
  const cardSummary = card.querySelector(".card-summary");
  const closeButton = card.querySelector(".card-close-button");

  if (cardSummary) {
    cardSummary.addEventListener("click", function(event) {
      event.stopPropagation();
      toggleCard(card);
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function(event) {
      event.stopPropagation();

      card.classList.remove("open");

      const videos = card.querySelectorAll("video");

      videos.forEach(function(video) {
        video.pause();
        video.currentTime = 0;
      });

      card.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  }
});

/* Image lightbox */

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.querySelector(".lightbox-content");
const lightboxClose = document.querySelector(".lightbox-close");
const zoomInButton = document.querySelector(".lightbox-zoom-in");
const zoomOutButton = document.querySelector(".lightbox-zoom-out");
const lightboxImages = document.querySelectorAll(".lightbox-image");

let currentZoom = 1;

function openLightbox(image) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  currentZoom = 1;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  lightboxImage.style.transform = "scale(" + currentZoom + ")";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";
  lightboxImage.alt = "Expanded portfolio work";

  currentZoom = 1;
  lightboxImage.style.transform = "scale(1)";
  document.body.style.overflow = "";
}

function zoomLightbox(amount) {
  if (!lightbox || !lightbox.classList.contains("active")) {
    return;
  }

  currentZoom = currentZoom + amount;

  if (currentZoom < 1) {
    currentZoom = 1;
  }

  if (currentZoom > 3) {
    currentZoom = 3;
  }

  lightboxImage.style.transform = "scale(" + currentZoom + ")";
}

lightboxImages.forEach(function(image) {
  image.addEventListener("click", function(event) {
    event.stopPropagation();
    openLightbox(image);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", function(event) {
    event.stopPropagation();
    closeLightbox();
  });
}

if (zoomInButton) {
  zoomInButton.addEventListener("click", function(event) {
    event.stopPropagation();
    zoomLightbox(0.2);
  });
}

if (zoomOutButton) {
  zoomOutButton.addEventListener("click", function(event) {
    event.stopPropagation();
    zoomLightbox(-0.2);
  });
}

if (lightbox) {
  lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("wheel", function(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      zoomLightbox(0.2);
    } else {
      zoomLightbox(-0.2);
    }
  });
}

if (lightboxImage) {
  lightboxImage.addEventListener("click", function(event) {
    event.stopPropagation();
  });
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

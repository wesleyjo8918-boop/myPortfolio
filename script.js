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
let imageX = 0;
let imageY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let startImageX = 0;
let startImageY = 0;
let movedWhileDragging = false;

function updateLightboxTransform() {
  if (!lightboxImage) {
    return;
  }

  lightboxImage.style.transform =
    "translate(" + imageX + "px, " + imageY + "px) scale(" + currentZoom + ")";
}

function resetLightboxPosition() {
  currentZoom = 1;
  imageX = 0;
  imageY = 0;
  updateLightboxTransform();

  if (lightboxImage) {
    lightboxImage.style.cursor = "zoom-in";
  }
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  currentZoom = 1;
  imageX = 0;
  imageY = 0;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  updateLightboxTransform();
  lightboxImage.style.cursor = "zoom-in";
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
  imageX = 0;
  imageY = 0;
  updateLightboxTransform();

  document.body.style.overflow = "";
}

function zoomLightbox(amount) {
  if (!lightbox || !lightbox.classList.contains("active")) {
    return;
  }

  currentZoom = currentZoom + amount;

  if (currentZoom < 1) {
    currentZoom = 1;
    imageX = 0;
    imageY = 0;
  }

  if (currentZoom > 3) {
    currentZoom = 3;
  }

  if (lightboxImage) {
    if (currentZoom > 1) {
      lightboxImage.style.cursor = "grab";
    } else {
      lightboxImage.style.cursor = "zoom-in";
    }
  }

  updateLightboxTransform();
}

function toggleImageZoom() {
  if (!lightbox || !lightbox.classList.contains("active")) {
    return;
  }

  if (currentZoom === 1) {
    currentZoom = 1.8;
    imageX = 0;
    imageY = 0;

    if (lightboxImage) {
      lightboxImage.style.cursor = "grab";
    }
  } else {
    resetLightboxPosition();
  }

  updateLightboxTransform();
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

    if (movedWhileDragging) {
      movedWhileDragging = false;
      return;
    }

    toggleImageZoom();
  });

  lightboxImage.addEventListener("mousedown", function(event) {
    if (currentZoom <= 1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    isDragging = true;
    movedWhileDragging = false;

    dragStartX = event.clientX;
    dragStartY = event.clientY;
    startImageX = imageX;
    startImageY = imageY;

    lightboxImage.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", function(event) {
    if (!isDragging) {
      return;
    }

    const moveX = event.clientX - dragStartX;
    const moveY = event.clientY - dragStartY;

    if (Math.abs(moveX) > 3 || Math.abs(moveY) > 3) {
      movedWhileDragging = true;
    }

    imageX = startImageX + moveX;
    imageY = startImageY + moveY;

    updateLightboxTransform();
  });

  window.addEventListener("mouseup", function() {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    if (currentZoom > 1) {
      lightboxImage.style.cursor = "grab";
    } else {
      lightboxImage.style.cursor = "zoom-in";
    }
  });
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

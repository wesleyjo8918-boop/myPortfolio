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

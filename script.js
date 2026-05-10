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

const urlParams = new URLSearchParams(window.location.search);
const selectedSection = urlParams.get("section");

if (selectedSection) {
  showSection(selectedSection);
}

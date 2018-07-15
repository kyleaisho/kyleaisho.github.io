const SELECTED = 'selected';
const HIDDEN = 'hidden';
const Sections = [
  '#about',
  '#projects',
  '#contact',
];

function getElementByInnerText(text) {
  return document.querySelector(`#${text.toLowerCase()}`);
}

function updateSections(selectedSection) {
  // Get all non-selected sections
  const sectionsExceptCurr = Array.from(document.querySelectorAll(Sections.join(', ')))
                                  .filter(item => !selectedSection || item !==selectedSection);
  sectionsExceptCurr.forEach(section => {
    section.classList.add(HIDDEN);
  });

  if (selectedSection) {
    selectedSection.classList.remove(HIDDEN);
  }
}

function unselectNavigationItems(currentElem) {
  // Get the other buttons
  const items = Array.from(document.querySelectorAll(".navbar .navbar-item"))
                      .filter(item => !currentElem || item !== currentElem);

  // select the current item
  if (currentElem) {
    currentElem.classList.add(SELECTED);
  }

  // Make sure none of the other items are selected
  items.forEach(item => item.classList.remove(SELECTED));
}

function navbarItemClick(e) {
  const unselected = !e.classList.contains(SELECTED);

  unselectNavigationItems(unselected ? e: null);
  updateSections(unselected ? getElementByInnerText(e.innerText) : null); 
}

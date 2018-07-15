const SELECTED = 'selected';
const FADEOUTDOWN = 'fadeOutDown';
const FADEINUP = 'fadeInUp';
const MAIN_SECTION = 'main-section';
const HIDDEN = 'hidden';

function getElementByInnerText(text) {
  return document.querySelector(`#${text.toLowerCase()}`);
}

function updateSections(selectedSection) {
  // Get the previous visible section
  const prevElem = document.querySelector('.main-section:not(.hidden), .main-section.fadeInUp');
  const fadeIn = () => {
    if (selectedSection) {
      selectedSection.classList.remove(HIDDEN);
      selectedSection.classList.remove(FADEOUTDOWN);
      selectedSection.classList.add(FADEINUP);
    }
  }

  if (prevElem) {
    prevElem.classList.remove(FADEINUP);
    prevElem.addEventListener('animationend', () => {
      prevElem.classList.add(HIDDEN);
      fadeIn();
    }, {once: true});

    prevElem.classList.add(FADEOUTDOWN);
  } else {
    fadeIn();
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

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenuOne = document.querySelector('.hamburger_menu_left');
  const hamburgerMenuTwo = document.querySelector('.hamburger_menu_right');
  const offScreenMenuLeft = document.querySelector('.off_screen_menu_left');
  const offScreenMenuRight = document.querySelector('.off_screen_menu_right');

  if (hamburgerMenuOne && offScreenMenuLeft) {
    hamburgerMenuOne.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerMenuOne.classList.toggle('active');
      offScreenMenuLeft.classList.toggle('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (offScreenMenuLeft && hamburgerMenuOne &&
        !offScreenMenuLeft.contains(e.target) && !hamburgerMenuOne.contains(e.target)) {
      hamburgerMenuOne.classList.remove('active');
      offScreenMenuLeft.classList.remove('active');
    }
  });

  if (hamburgerMenuOne) {
    hamburgerMenuOne.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburgerMenuOne.click();
      }
    });
  }

  if (hamburgerMenuTwo && offScreenMenuRight) {
    hamburgerMenuTwo.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerMenuTwo.classList.toggle('active');
      offScreenMenuRight.classList.toggle('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (offScreenMenuRight && hamburgerMenuTwo &&
        !offScreenMenuRight.contains(e.target) && !hamburgerMenuTwo.contains(e.target)) {
      hamburgerMenuTwo.classList.remove('active');
      offScreenMenuRight.classList.remove('active');
    }
  });

  if (hamburgerMenuTwo) {
    hamburgerMenuTwo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburgerMenuTwo.click();
      }
    });
  }
});
const burgerBtn = document.querySelector('#burger');
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.hamburger__btn');

function switcher(elem, className) {
  elem.classList.toggle(className);
}

burgerBtn.addEventListener('click', e => {
  e.preventDefault();
  hamburger.classList.remove('hidden');
  setTimeout(function() {
    switcher(hamburger, 'isActive');
  }, 500);
});

closeBtn.addEventListener('click', e => {
  e.preventDefault();
  hamburger.classList.remove('isActive');
  setTimeout(function() {
    switcher(hamburger, 'hidden');
  }, 500);
});
const burgerBtn = document.querySelector('#burger');
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.hamburger__btn');

function switcher(elem, className) {
  elem.classList.toggle(className);
}

let flag = true;

burgerBtn.addEventListener('click', e => {
  e.preventDefault();
  
  if(flag) {
    flag = false;
    hamburger.classList.remove('hidden');
    setTimeout(function() {
      switcher(hamburger, 'isActive');
      flag = true;
    }, 500);
  }
});

closeBtn.addEventListener('click', e => {
  e.preventDefault();

  if(flag) {
    flag = false;
    hamburger.classList.remove('isActive');
    setTimeout(function() {
      switcher(hamburger, 'hidden');
      flag = true;
  }, 500);
  }
  
});
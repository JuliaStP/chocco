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


//team
const team = document.querySelector('.team');
const teamLink = document.querySelector('.team__link');

team.addEventListener('click', e => {
  e.preventDefault();
  const link = e.target;
  const listItem = e.currentTarget;

  if(link.classList.contains('team__link')) {
    const active = listItem.querySelector('.team__item.team__item--is-active');
    console.log(active);

    if(active) {
      let activeInfo = active.querySelector('.team__info');
      activeInfo.style.height = '0px';
      active.classList.remove('team__item--is-active');
    }

    if(!active || active.querySelector('.team__link') !== link) {
              let current = link.closest('.team__item');
              current.classList.add('team__item--is-active');
              let currentText = current.querySelector('.team__info');
              currentText.style.height = currentText.scrollHeight + 'px';
  }
}
});
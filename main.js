// BURGER MENU /////////////////////////////////////////////

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


// TEAM //////////////////////////////////////////////////

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

//SLIDER/////////////////////////////////////////////////////////////////

const slider = $('.goods-list').bxSlider({
  pager: false,
  controls: false
});

$('.arrow__link--left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})

$('.arrow__link--right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})


// REVIEWS ///////////////////////////////////////////////
//JQuerry////////////////////////////////////////////////
// const findBlockByAlias = (alias) => {
//   return $('.review__container').filter((ndx, item) => {
//     return $(item).attr('data-linked-with') == alias;
//   });
// };

// $('.avatar-menu__link').click((e) => {
//   e.preventDefault();

//   const $this = $(e.currentTarget);
//   const target = $this.attr('data-open');
//   const itemToShow = findBlockByAlias(target);
//   const curItem = $this.closest('.avatar-menu');

//   itemToShow.addClass('active').siblings().removeClass('active');
//   curItem.addClass('active').siblings().removeClass('active');
// });

// NATIVE JS////////////////////////////////////////////////
const reviewBtn = document.querySelectorAll('.avatar-menu');
const reviewTabs = document.querySelectorAll('.review__container');

for (let i=0; i<reviewBtn.length; i++) {
  reviewBtn[i].addEventListener('click', function (e) {
    e.preventDefault();
    for (let index=0; index<reviewBtn.length; index++) {
      reviewBtn[index].classList.remove('active')
      reviewTabs[index].classList.remove ('active')
    };
    e.currentTarget.classList.add('active');
    reviewTabs[i].classList.add('active');
  });
}

// FORM /////////////////////////////////////////////

const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach((field) => {
    field.removeClass('input-error');
    if(field.val().trim() === '') {
      field.addClass('input-error')
    }
  });

  const errorFields = form.find('.input-error');

  return errorFields.length === 0;
}


$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const popup = $('#popup');
  const content = popup.find('.popup__text');
  popup.removeClass('error-popup');

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const request = $.ajax({
      url:'https://webdev-api.loftschool.com/sendmail', 
      method: 'post',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      error: data => {}
    });

    request.done(data => {
      content.text(data.message);
    });

    request.fail(data => {
      const message = data.responseJSON.message;
        content.text(message);
        popup.addClass('error-popup'); 
    });

    request.always(() => {
      $.fancybox.open({
        src: '#popup',
        type: 'inline',
      });
    })
  }
});

$('.js-btn-submit').click(e => {
  e.preventDefault();

  $.fancybox.close();
});

// ACCORD ///////////////////////////////////////////

function Accord(selector) {
  const accord = document.querySelector(selector);
  const items = accord.querySelector('[data-list]').children;
  const closeButton = document.querySelector('.accord__btn');


  accord.addEventListener('click', function(e) {
    e.preventDefault ();
    const target = e.target.closest('[data]');

    if(!target) return;

    const item = target.parentNode;
    // if(target == closeButton) {
    //   item.classList.remove('item-active');
    // }
    if (item.classList.contains('item-active')) {
      item.classList.remove('item-active');
    }else {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('item-active');
      }

      item.classList.add('item-active');
    }
  });
}

new Accord ('#accord-menu')
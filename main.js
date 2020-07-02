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


//team//////////////////////////////////////////////////

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
// const leftBtn = document.querySelector('.arrow--left');
// const rightBtn = document.querySelector('.arrow--right');
// const slider = document.querySelector('.goods-list');
// const computedStyles = getComputedStyle(slider);

// leftBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   let currentRight = parseInt(computedStyles.right);

//   if (currentRight > 0) {
//       slider.style.right = `${currentRight - 940}px`;
//   }
// });

// rightBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   let currentRight = parseInt(computedStyles.right)

//   if(currentRight < 940) {
//       slider.style.right = `${currentRight + 940}px`;
//   }
// });

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


// reviews ///////////////////////////////////////////////

const findBlockByAlias = (alias) => {
  return $('.review__container').filter((ndx, item) => {
    return $(item).attr('data-linked-with') == alias;
  });
};

$('.avatar-menu__link').click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-open');
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.avatar-menu');

  itemToShow.addClass('active').siblings().removeClass('active');
  curItem.addClass('active').siblings().removeClass('active');
});

// form  /////////////////////////////////////////////////////////

// const myForm = document.querySelector('#form');
// const sendBtn = document.querySelector('#send');
// const xhr = new XMLHttpRequest();


// xhr.addEventListener('load', () => {
//   if (xhr.response.status) {
//       console.log('correct!');
//   }
// });

// sendBtn.addEventListener('click', function(e) {
//   e.preventDefault();

//   if (validateForm(myForm)) {

//     const data = {
//       name: myForm.elements.name.value,
//       phone: myForm.elements.phone.value,
//       comment: myForm.elements.email.value
//   }

//   const xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';
//     xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
//     xhr.send(JSON.stringify(data));
//     xhr.addEventListener('load', () => {
//       if (xhr.response.status) {
//         console.log('correct!');
//     }
// });
// }
// });


// function validateForm(form) {
//   let valid = true; 

//   if (!validateField(form.elements.name)) {
//     valid = false;
// }

// if (!validateField(form.elements.phone)) {
//   valid = false;
// }

// if (!validateField(form.elements.street)) {
//   valid = false;
// }

// if (!validateField(form.elements.house)) {
//   valid = false;
// }

// if (!validateField(form.elements.apt)) {
//   valid = false;
// }

// if (!validateField(form.elements.comment)) {
//   valid = false;
// }

// if (!validateField(form.elements.radio)) {
//   valid = false;
// }

// return valid;
// }


// popup///////////////////////////////////////////

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
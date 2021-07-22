// BURGER MENU /////////////////////////////////////////////



// TEAM //////////////////////////////////////////////////



//SLIDER/////////////////////////////////////////////////////////////////




// REVIEWS ///////////////////////////////////////////////


// FORM /////////////////////////////////////////////


// ACCORD //////////////////////////////////////////////////////////


// VIDEO //////////////////////////////////////////////////////



// MAP ///////////////////////////////////////////////////////////



// ONEPAGE SCROLL ////////////////////////////////////////////////////

const mesureWidth = itemAc => {

    let reqItemWidth = 0;
  
    const screenWidth = $(window).width();
    const containerAc = itemAc.closest('.accord');
    const titleBlocks = containerAc.find('.accord__link');
    
  
    const textContainer = itemAc.find('.accord__text');
    const paddingLeft = parseInt(textContainer.css('padding-left'));
    const paddingRight = parseInt(textContainer.css('padding-right'));
  
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isSmallMobile = window.matchMedia('(max-width: 480px)').matches;
  
    const titleWidth = isSmallMobile ? titleBlocks.width() : titleBlocks.width() * titleBlocks.length;
    if(isMobile) {
      reqItemWidth = screenWidth - titleWidth;
    } else {
      reqItemWidth = 500;
    }
  
    if(isSmallMobile) {
      reqItemWidth = screenWidth - titleWidth;
    } else {
      reqItemWidth = 500;
    }
  
    return {
      container: reqItemWidth,
      textContainer: reqItemWidth - paddingLeft - paddingRight
    }
  };
  
  const closeItem = (container) => {
    const itemsAc = container.find('.accord__item');
    const content = container.find('.accord__content');
  
    itemsAc.removeClass('item-active');
    content.width(0);
  }
  
  const openItem = (itemAc) => {
    const hiddenContent = itemAc.find('.accord__content');
    const reqWidth = mesureWidth(itemAc);
    const textBlock = itemAc.find('.accord__text');
  
    itemAc.addClass('item-active');
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
  };
  
  $('.accord__link').on('click', (e) => {
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const itemAc = $this.closest('.accord__item');
    const itemOpened = itemAc.hasClass('item-active');
    const container = $this.closest('.accord');
  
    if(itemOpened) {
      closeItem(container);
    } else {
      closeItem(container);
      openItem(itemAc);
    }
  });
  
  $('.accord__btn').on('click', e => {
    e.preventDefault();
  
    closeItem($('.accord'));
  });;const burgerBtn = document.querySelector('#burger');
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
  
});;const validateFields = (form, fieldsArray) => {

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
  ;// BURGER MENU /////////////////////////////////////////////



// TEAM //////////////////////////////////////////////////



//SLIDER/////////////////////////////////////////////////////////////////




// REVIEWS ///////////////////////////////////////////////


// FORM /////////////////////////////////////////////


// ACCORD //////////////////////////////////////////////////////////


// VIDEO //////////////////////////////////////////////////////



// MAP ///////////////////////////////////////////////////////////



// ONEPAGE SCROLL ////////////////////////////////////////////////////

;function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.749410, 37.601060],
      zoom: 14,
      controls: []
        });
    
        myCollection = new ymaps.GeoObjectCollection({}, {
          draggable: false,
          iconLayout: 'default#image',
          iconImageHref: './img/icons/marker.svg',
          iconImageSize: [46, 57],
          iconImageOffset: [-35, -52]
        });
    
        myPoints = [
            { coords: [55.749798, 37.605695], text: 'CHOCCO Первый магазин' },
            { coords: [55.758729, 37.583145], text: 'CHOCCO Второй магазин' },
            { coords: [55.742804, 37.580576], text: 'CHOCCO Третий магазин' },
            { coords: [55.757064, 37.622157], text: 'CHOCCO Четвертый магазин'} 
        ];
  
    for (let i = 0, l = myPoints.length; i < l; i++) {
        let point = myPoints[i];
        myCollection.add(new ymaps.Placemark(
            point.coords, {
                balloonContentBody: point.text
            }
        ));
    }
  
    myMap.geoObjects.add(myCollection);
  
    const mySearchControl = new ymaps.control.SearchControl({
        options: {
            provider: new CustomSearchProvider(myPoints),
            noPlacemark: true,
            resultsPerPage: 4
        }});
  }
  
  function CustomSearchProvider(points) {
    this.points = points;
  }
  
  
  CustomSearchProvider.prototype.geocode = function (request, options) {
    const deferred = new ymaps.vow.defer(),
        geoObjects = new ymaps.GeoObjectCollection(),
        offset = options.skip || 0,
        limit = options.results || 4;
        
    const points = [];
    for (let i = 0, l = this.points.length; i < l; i++) {
        let point = this.points[i];
        if (point.text.toLowerCase().indexOf(request.toLowerCase()) != -1) {
            points.push(point);
        }
    }
    points = points.splice(offset, limit);
    for (let i = 0, l = points.length; i < l; i++) {
        let point = points[i],
            coords = point.coords,
                    text = point.text;
  
        geoObjects.add(new ymaps.Placemark(coords, {
            name: text + ' name',
            description: text + ' description',
            balloonContentBody: '<p>' + text + '</p>',
            boundedBy: [coords, coords]
        }));
    }
  
    deferred.resolve({
        geoObjects: geoObjects,
        metaData: {
            geocoder: {
                request: request,
                found: geoObjects.getLength(),
                results: limit,
                skip: offset
            }
        }
    });
  
    return deferred.promise();
  };
  
  ymaps.ready(init);;const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.dots-menu');
const menuItems = sideMenu.find('.dots-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('active-sect');

const countSection = (sectionEq) => {
  const position = sectionEq * -100;
  
  if(isNaN(position)) {
    console.error('incorrect value in countSection');
    return 0;
  }
  return position;
}

const changeMenuColor = sectionEq => {
      const currentSection = sections.eq(sectionEq);
      const menuColor = currentSection.attr('data-dotsmenu-color');
      const activeClass = 'dots-menu--dark';

      if(menuColor === 'dark') {
        sideMenu.addClass(activeClass);
      } else {
        sideMenu.removeClass(activeClass);
      }
};

const resetActiveClass = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTrans = (sectionEq) => {

  if(inScroll) return;

  const transitionOver = 1000;
  const mouseOver = 300;

    inScroll = true;

    const position = countSection(sectionEq);

    changeMenuColor(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClass(sections, sectionEq, 'active-sect');

    setTimeout(() => {
      inScroll = false;
      resetActiveClass(menuItems, sectionEq, 'dots-menu__item--active');
    }, transitionOver + mouseOver);
};

const scroll = () => {
  const activeSection = sections.filter('.active-sect');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if(nextSection.length) {
        performTrans(nextSection.index());
      }
    },
    prev() {
      if(prevSection.length) {
        performTrans(prevSection.index());
      }
    },
  };
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = scroll();

  if (deltaY > 0) {
    scroller.next();
  }
  
  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const typingInputs = tagName ==='input' || tagName === 'textarea';
  const scroller = scroll();

  if (typingInputs) return;

    switch (e.keyCode) {
      case 38:
        scroller.prev();
      break;
  
      case 40:
        scroller.next();
      break;
    }
});

$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);
  $('.hamburger').addClass('hidden');

  performTrans(reqSection.index());
});

// PHONES ////////////////////////////////////////////
if (isMobile) {
  $('body').swipe({
    swipe: function(event, direction) {
      const scroller = scroll();
      let scrollDirection = '';
  
      if (direction === 'up') scrollDirection = 'next';
      if (direction === 'down') scrollDirection = 'prev';
      
      scroller[scrollDirection]();
    },
  });
};;// JQuerry////////////////////////////////////////////////
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
};const slider = $('.goods-list').bxSlider({
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
  });const team = document.querySelector('.team');
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
});;const player = document.querySelector('.video__player');
const video = document.querySelector('.video__mp4');
const juice = document.querySelector('.video__playback-btn');
const playBtn = document.getElementById('play-pause');
const seekTooltip = document.getElementById('seek-tooltip');

const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');



function togglePlayPause() {
  if(video.paused) {
    playBtn.className = 'pause';
    video.play();
  }
  else {
    playBtn.className = 'play';
    video.pause();
  }
};

playBtn.onclick = function () {
  togglePlayPause();
};

player.addEventListener('click', togglePlayPause);

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return {
    hour: h,
    minutes: m,
    sec: s
  };
};

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  seek.setAttribute('max', videoDuration);
  progressBar.setAttribute('max', videoDuration);
  const time = formatTime(videoDuration);
  seekTooltip.innerText = `${time.minutes}:${time.sec}`;
  seekTooltip.setAttribute('datetime', `${time.minutes}m ${time.sec}s`)
};

document.addEventListener("DOMContentLoaded", initializeVideo);


function updateProgress() {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
};

video.addEventListener('timeupdate', updateProgress);

function updateSeekTooltip(event) {
  const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
  seek.setAttribute('data-seek', skipTo);
  const t = formatTime(skipTo);
  seekTooltip.textContent = `${t.minutes}:${t.sec}`;
  const rect = video.getBoundingClientRect();
  seekTooltip.style.left = `${event.pageX - rect.left}px`;
};

seek.addEventListener('mousemove', updateSeekTooltip);

function skipAhead(event) {
  const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
};

seek.addEventListener('input', skipAhead);

const volumeButton = document.querySelector('.video__volume');
const volumeIcons = document.querySelectorAll('.video__volume-pic');
const volumeMute = document.querySelector('.volume-mute');
const volumeHigh = document.querySelector('.volume-unmute');
const volume = document.querySelector('.video__volume-scale');

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
};

volume.addEventListener('input', updateVolume);

function updateVolumeIcon() {
  volumeIcons.forEach(icon => {
    icon.classList.add('hidden-pic');
  });

  volumeButton.setAttribute('data-title', 'Mute (m)')

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden-pic');
    volumeButton.setAttribute('data-title', 'Unmute (m)')
  } else {
    volumeHigh.classList.remove('hidden-pic');
  }
};

video.addEventListener('volumechange', updateVolumeIcon);

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
};

volumeButton.addEventListener('click', toggleMute);
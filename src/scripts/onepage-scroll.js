const sections = $('section');
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
};
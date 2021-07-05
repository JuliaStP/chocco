// NATIVE JS ///////////////////////////////////////////////////////
// function Accord(selector) {
//   const accord = document.querySelector(selector);
//   const items = accord.querySelector('[data-list]').children;
//   const closeButton = document.querySelector('.accord__btn');
  
//   accord.addEventListener('click', function(e) {
//     e.preventDefault ();
//     const target = e.target.closest('[data]');

//     if(!target) return;

//     const item = target.parentNode;
    
//     if (item.classList.contains('item-active')) {
//       item.classList.remove('item-active');
//     }else {
//       for (let i = 0; i < items.length; i++) {
//         items[i].classList.remove('item-active');
//       }
//       item.classList.add('item-active');
//     }

//     closeButton.addEventListener('click', e => {
//       e.preventDefault();
//       item.classList.remove('item-active');
//     });
//   });
// };

// new Accord ('#accord-menu');

// JQUERY ///////////////////////////////////////////////////////
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
  });
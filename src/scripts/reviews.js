// JQuerry////////////////////////////////////////////////
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
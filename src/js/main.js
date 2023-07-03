const hamburger = document.querySelector(".header__hamburger"),
  menu = document.querySelector(".menu"),
  closeElem = document.querySelector(".menu__close"),
  overlay = document.querySelector(".header__overlay");

hamburger.addEventListener("click", () => {
  menu.classList.add("menu_active");
  overlay.classList.add("header__overlay_active");
});

closeElem.addEventListener("click", () => {
  menu.classList.remove("menu_active");
  overlay.classList.remove("header__overlay_active");
});

overlay.addEventListener("click", () => {
  menu.classList.remove("menu_active");
  overlay.classList.remove("header__overlay_active");
});

$(document).ready(function () {
  $(".reviews__carousel").slick({
    slidesToShow: 1,
    speed: 1500,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 15000,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../img/svg/carousel/arrow-prev.svg" alt="prev"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../img/svg/carousel/arrow-next.svg" alt="next"></button>',
  });
});

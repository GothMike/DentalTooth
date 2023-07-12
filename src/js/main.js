window.addEventListener("DOMContentLoaded", () => {
  // Меню
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

  // Карусель
  $(document).ready(function () {
    $(".reviews__carousel").slick({
      slidesToShow: 1,
      speed: 1500,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 15000,
      prevArrow:
        '<button type="button" class="slick-prev"><img src="../img/svg/carousel/arrow-prev.svg" alt="prev"></button>',
      nextArrow:
        '<button type="button" class="slick-next"><img src="../img/svg/carousel/arrow-next.svg" alt="next"></button>',
    });
  });

  // Валидация
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: {
          required: true,
          minlength: 11,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Обязательно минимум {0} символа!"),
        },
        phone: {
          required: "Пожалуйста, введити свой номер телефона",
          minlength: jQuery.validator.format("Обязательно минимум {0} символа!"),
        },
      },
    });
  }

  validateForms("[data-form]");

  // Маска для номера телефона
  $("input[name=phone").mask("+7 (999) 999-99-99");

  // Модальное окно
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function openModal() {
    modal.classList.add("modal_show");
    overlay.classList.add("header__overlay_active");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.remove("modal_show");
    overlay.classList.remove("header__overlay_active");
    document.body.style.overflow = "";
  }

  function openModalThanks() {
    modal.classList.add("modal_show");
    overlay.classList.add("header__overlay_active");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModalThanks() {
    modal.classList.remove("modal_show");
    overlay.classList.remove("header__overlay_active");
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal, closeModalThanks);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) closeModal();
  });

  const modalTimerId = setTimeout(openModal, 15000);

  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const resetForm = setTimeout(form.reset(), 5000); // Сбросить значения формы
    });
  });

  // Функция для вызова модального окна, когда юзер долистает до конца
  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
});

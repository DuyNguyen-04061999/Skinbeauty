window.addEventListener("load", function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const menuBar = $("#npd-menu-bar");
  const navList = $("#npd-header-navbar-item");
  const navPages = navList.querySelector("li:last-child");
  const subNav = navPages.querySelector("ul");

  function start() {
    handleSetHeightProduct();
    if (sliderWrapper) {
      handleLoadSliderImg();
    }
  }
  function handleMenuBar(e) {
    navList.style.overflow = "hidden";
    subNav.style.height = `0px`;
    subNav.classList.remove("active");
    navList.classList.toggle("active");
    if (navList.classList.contains("active")) {
      navList.style.height = `${navList.scrollHeight}px`;
    } else {
      navList.style.height = `${0}px`;
    }
  }

  function handleClickNavPages(e) {
    subNav.classList.toggle("active");
    if (subNav.classList.contains("active")) {
      navList.style.overflow = "visible";
      subNav.style = `height: ${subNav.scrollHeight}px;`;
      navList.style.height = ` ${
        parseInt(navList.style.height) + parseInt(subNav.scrollHeight)
      }px`;
    } else {
      navList.style.height = `${
        parseInt(navList.style.height) - parseInt(subNav.scrollHeight)
      }px`;
      subNav.style.height = `${0}px`;
    }
  }

  function handleClickDocument(e) {
    if (!menuBar.contains(e.target) && !navPages.contains(e.target)) {
      subNav.classList.remove("active");
      subNav.style.height = `0px`;
      navList.style.height = `0px`;
      navList.style.overflow = "hidden";
      navList.classList.remove("active");
    }
  }
  // media query change
  if (matchMedia) {
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }
  function WidthChange(mq) {
    if (mq.matches) {
      navList.style.overflow = "hidden";
      if (menuBar) {
        menuBar.addEventListener("click", handleMenuBar);
      }

      if (navPages) {
        navPages.addEventListener("click", handleClickNavPages);
      }
      document.addEventListener("click", handleClickDocument);
    } else {
      navList.style.overflow = "visible";
      menuBar.removeEventListener("click", handleMenuBar);
      navPages.removeEventListener("click", handleClickNavPages);
      document.removeEventListener("click", handleClickDocument);
    }
  }

  // ================== Cart ==========================
  const cart = $("#npd-cart");
  const cartStatus = $("#npd-cart-basket");
  const cartHeader = $("#npd-cart-header");
  const cartBody = cartStatus.querySelector("#npd-cart-body");
  const cartProduct = cartBody.querySelector("form #npd-cart-product");
  const cartCheckOut = cartBody.querySelector("form #npd-cart-checkout");
  const cartClose = $("#npd-cart-close");
  const overlay = $("#npd-overlay");

  function handleClickCart(e) {
    cartStatus.style = `opacity: 1; visibility: visible; transform: translateX(0)`;
    overlay.style = `opacity: 1; visibility: visible`;
  }

  function handleClickClose(e) {
    cartStatus.style = `opacity: 0; visibility: hidden; transform: translateX(25%)`;
    overlay.style = `opacity: 0; visibility: hidden;`;
  }

  cart.addEventListener("click", handleClickCart);
  cartClose.addEventListener("click", handleClickClose);
  overlay.addEventListener("click", handleClickClose);

  // === setHeight CartProduct ===
  function handleSetHeightProduct(e) {
    if (cartProduct && cartCheckOut) {
      cartHeader.style.height = `${cartHeader.scrollHeight}px`;
      cartCheckOut.style.height = `${cartCheckOut.scrollHeight}px`;
      const vh = document.documentElement.clientHeight;
      cartProduct.style.height = `${
        vh -
        parseInt(cartHeader.offsetHeight) -
        parseInt(cartCheckOut.offsetHeight) -
        24
      }px`;
    }
  }
  window.onload = handleSetHeightProduct;
  window.onresize = handleSetHeightProduct;
  // ================ End of Header & Cart UI ======================

  // =================== Slider & About ======================

  const sliderWrapper = $("#npd-slider-img-wrapper");
  if (sliderWrapper) {
    const sliderImg = $("#npd-slider-img");
    const aboutImgs = $$(".npd-about-img");
    function handleChangeSliderSize(e) {
      const scroll = window.pageYOffset;
      sliderImg.style.width = `${parseInt(100 + scroll / 50)}%`;
      sliderImg.style.height = `${parseInt(100 + scroll / 50)}%`;
    }
    let oldValue = 0;
    let newValue = 0;

    window.addEventListener("scroll", function (e) {
      handleChangeSliderSize();

      newValue = this.pageYOffset;
      if (newValue > oldValue) {
        // up
        [...aboutImgs].forEach((aboutImg) => {
          aboutImg.style.transform = `translateY(${-newValue / 100}%)`;
        });
      } else {
        //  down
        [...aboutImgs].forEach((aboutImg) => {
          aboutImg.style.transform = `translateY(${newValue / 100}%)`;
        });
      }
      oldValue = newValue;
    });

    function handleLoadSliderImg() {
      setTimeout(() => {
        sliderWrapper.style = `transform: scale(1); visibility: visible; opacity: 1`;
      }, 1000);
    }
  }

  // ================= brand =========================
  const brandImgs = $$(".npd-brand-img");
  const brandContent = $$(".npd-brand-item");

  [...brandImgs].forEach((img) => {
    img.addEventListener("click", function (e) {
      [...brandImgs].forEach((img) => img.classList.remove("active"));
      e.target.classList.add("active");
      const contentNum = e.target.dataset.brand;

      [...brandContent].forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.brand === contentNum) {
          item.classList.add("active");
        }
      });
    });
  });
  start();
});

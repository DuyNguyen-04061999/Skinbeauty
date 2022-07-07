window.addEventListener("load", function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const menuBar = $("#npd-menu-bar");
  const navList = $("#npd-header-navbar-item");
  const navPages = navList.querySelector("li:last-child");
  const subNav = navPages.querySelector("ul");

  let fixedHeight;
  function start() {
    handleSetHeightProduct();
  }
  function handleMenuBar(e) {
    navList.style.overflow = "hidden";
    subNav.style.height = `0px`;
    subNav.classList.remove("active");
    navList.classList.toggle("active");
    if (navList.classList.contains("active")) {
      navList.style.height = `${navList.scrollHeight}px`;
      fixedHeight = navList.scrollHeight;
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
      subNav.style.height = `${0}px`;
      navList.style.height = `${fixedHeight}px`;
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
      menuBar.removeEventListener("click", handleMenuBar);
      navPages.removeEventListener("click", handleClickNavPages);
      document.removeEventListener("click", handleClickDocument);
      navList.style.overflow = "visible";
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
    cartStatus.style = `opacity: 0; visibility: hidden; transform: translateX(100%)`;
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
  start();
  // ================ Header & Cart UI ======================
});

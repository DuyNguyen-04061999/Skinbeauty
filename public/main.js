const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const menuBar = $("#npd-menu-bar");
const navList = $("#npd-header-navbar-item");
const navPages = navList.querySelector("li:last-child");
const subNav = navPages.querySelector("ul");

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
    const vh = document.documentElement.clientHeight;
    cartProduct.style.height = `${
      parseInt(vh) -
      parseInt(cartHeader.offsetHeight) -
      parseInt(cartCheckOut.offsetHeight)
    }px`;
  }
}

window.onload = handleSetHeightProduct;
window.onresize = handleSetHeightProduct;
handleSetHeightProduct();
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
  handleLoadSliderImg();
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

/*============================ Product Page ============================== */
const productInfos = $$(".npd-product-info");
const productContents = $$(".npd-product-content");
const productInfoIcons = $$(".npd-product-info-icon");

if (productInfos) {
  [...productInfos].forEach((productInfo) => {
    productInfo.addEventListener("click", function (e) {
      const contentClick = e.target.dataset.item;
      const icon = e.target.querySelector(".npd-product-info-icon");
      productInfos.forEach((productInfo) =>
        productInfo.classList.remove("active")
      );

      this.classList.add("active");

      productInfoIcons.forEach((icon) => {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      });

      if (this.classList.contains("active")) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      }

      productContents.forEach((productContent) => {
        productContent.style.display = "none";
        if (productContent.dataset.item === contentClick) {
          productContent.style.display = "block";
        }
      });
    });
  });
}

// ========================= Cart thumb ========================

const cartThumbs = $("#npd-cart-thumb");
const cartThumbGallery = $("#npd-thumb-gallery");
const thumbContent = $("#npd-thumb-content");
const thumbNextBtn = $(".swiper-button-next");
const thumbPrevBtn = $(".swiper-button-prev");
const mySwiper2 = $(".mySwiper2");
const mySwiper = $(".mySwiper");

if (cartThumbs) {
  cartThumbs.addEventListener("click", (e) => {
    cartThumbGallery.style = `visibility:visible; opacity:1`;
  });

  cartThumbGallery.addEventListener("click", (e) => {
    if (
      !thumbNextBtn.contains(e.target) &&
      !thumbPrevBtn.contains(e.target) &&
      !mySwiper2.contains(e.target) &&
      !mySwiper.contains(e.target)
    ) {
      cartThumbGallery.style = `visibility:hidden; opacity:0`;
    }
  });
}

// ============================ Product Cart ========================
import { data } from "./data.js";

const cartEmpty = $("#npd-cart-empty");
const cartWrap = $("#npd-cart-wrap");
const formProduct = $(".npd-form-product");
const formAccount = $("#npd-form-account");
const inputQuantity = $("input[name='number']");
const select = $("select[name='options']");
const cartDOMNum = cart.querySelector("span");
let html = "";

if (data) {
  let totalCost = JSON.parse(localStorage.getItem("totalCost")) || 0;
  let cartNumber = JSON.parse(localStorage.getItem("cartNumber")) || 0;
  let productInCart = JSON.parse(localStorage.getItem("productInCart")) || {};

  function productData() {
    localStorage && localStorage.setItem("data", JSON.stringify(data));
  }

  function total() {
    localStorage &&
      localStorage.setItem("totalCost", JSON.stringify(totalCost));
  }

  function cartNum() {
    localStorage &&
      localStorage.setItem("cartNumber", JSON.stringify(cartNumber));
  }

  function setProductInCart() {
    localStorage &&
      localStorage.setItem("productInCart", JSON.stringify(productInCart));
  }

  function renderCartInfo() {
    if (cartNumber > 0) {
      cartEmpty.style.display = "none";
      cartWrap.style.display = "flex";
      const valueCarts = Object.values(productInCart);

      html = html.replace(html, "");
      valueCarts.forEach((value) => {
        html += `
          <div class="npd-cart-item py-3 px-6 flex justify-between snap-start animate-appear">
            <div class="flex justify-center shrink-0 gap-4">
              <div
                  class="w-[60px] h-[60px] rounded-[10px] overflow-hidden border-color-sub-bg border-[1px]">
                  <img src="${value.link}" class="w-full h-full object-cover"
                      alt="">
              </div>
              <div class="text-[14px]">
                  <h2 class="font-bold">${value.name}</h2>
                  <p class="" >$ ${value.price}.00 USD</p>
                  <p class="">Size: ${value.size}ml</p>
                  <span data-tag="${value.tag}" class="npd-remove-account text-sub-text mt-2 transition-all border-[1.25px] border-transparent duration-200 hover:border-b-sub-text cursor-pointer">Remove</span>
              </div>
            </div>
            <input type="number" name="subnumber" data-tag="${value.tag}" value="${value.incart}" min="1"
              class="py-2 pr-[6px] pl-3 w-[60px] h-[38px] bg-color-sub-bg rounded-[10px] text-[14px]">
          </div>`;
      });
      cartProduct.innerHTML = html;

      cartCheckOut.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <span class="text-[14px] text-black">Subtotal</span>
            <p class="text-[14px] text-black font-bold">$ ${totalCost}.00 USD</p>
        </div>
        <button type="submit"
            class="w-full px-[15px] py-[9px] text-white text-[14px] rounded-[5px] bg-sub-text hover:bg-black transition-all duration-500">
            Continue to Checkout
        </button>`;
    } else {
      cartEmpty.style.display = "flex";
      cartWrap.style.display = "none";
    }
    cartDOMNum.innerText = cartNumber;
    handleSetHeightProduct();
  }
  if (formProduct)
    formProduct.addEventListener("submit", function (e) {
      e.preventDefault();
      const tagProduct = select.options[select.selectedIndex].dataset.tag;
      const index = data.findIndex((obj) => obj.tag === tagProduct);
      const inCart = parseInt(inputQuantity.value);

      data[index].incart += inCart;
      productData();

      cartNumber += inCart;
      cartNum();

      totalCost += inCart * data[index].price;
      total();

      // productInCart = {
      //   ...productInCart,
      //   [data[index]["tag"]]: data[index],
      // };

      productInCart[tagProduct] = data[index];
      setProductInCart();

      // =========== Render Cart ==========
      setTimeout(() => {
        renderCartInfo();
        handleClickCart();
      }, 500);
      handleSetHeightProduct();
    });

  // ============ formAccount ========
  if (formAccount) {
    formAccount.addEventListener("submit", function (e) {
      const inputAccounts = this.querySelectorAll("input[name='subnumber']");
      e.preventDefault();
      let newQuantity = 0;
      let newTotal = 0;
      // ===== regulate cartNumber (up & down) =====
      [...inputAccounts].forEach((input) => {
        const tagProduct = input.dataset.tag;
        const index = data.findIndex((obj) => obj.tag === tagProduct);

        newQuantity += parseInt(input.value);
        data[index].incart = parseInt(input.value);
        productData();

        productInCart[tagProduct].incart = parseInt(input.value);
        setProductInCart();

        newTotal += parseInt(input.value) * data[index].price;
      });
      cartNumber = newQuantity;
      cartNum();

      totalCost = newTotal;
      total();
      setTimeout(() => {
        renderCartInfo();
      }, 500);
    });

    // ================ remove ===================
    cartProduct.addEventListener("click", function (e) {
      if (e.target.matches(".npd-remove-account")) {
        const cartItem = e.target.closest(".npd-cart-item");
        const tagProduct = e.target.dataset.tag;
        const index = data.findIndex((obj) => obj.tag === tagProduct);
        cartNumber -= data[index].incart;
        cartNum();

        totalCost -= data[index].incart * data[index].price;
        total();

        data[index].incart = 0;
        productData();

        delete productInCart[tagProduct];
        setProductInCart();

        setTimeout(() => {
          cartItem.remove();
          renderCartInfo();
        }, 500);
      }
    });
  }
  productData();
  total();
  cartNum();
  renderCartInfo();
}

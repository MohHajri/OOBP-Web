function AddDivs(MyData) {
  for (let i = 0; i < MyData.length; i++) {
    let cartrow = document.createElement("div");
    cartrow.classList.add("single-perfume");
    let cartitems = document.getElementsByClassName("container")[0];
    let cartrowcontents = `
          <div class="single-perfume-bg">
            <img src="${MyData[i].PerfumeImage}" class="perfume-images" c />

            <div class="perfume-cart">
              <p> 
                <a href="#"class="add-to-cart">add to cart</a>
              </p>
            </div>
          </div>
          <h4><a href="#">${MyData[i].PerfumeCompany}</a></h4>
          <h4 class="perfume-name">${MyData[i].PerfumeName}</h4>
          <h4>${MyData[i].PerfumeFrench}</h4>
          <p class="perfume-price">${MyData[i].PerfumePrice}</p>
  `;
    cartrow.innerHTML = cartrowcontents;
    cartitems.append(cartrow);
    //console.log(cartrow);
  }
}
AddDivs(MyData);

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let RemoveItem = document.getElementsByClassName("removal-option");
  for (let i = 0; i < RemoveItem.length; i++) {
    let button = RemoveItem[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("product-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  let addToCartButton = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }
}
//}
function removeCartItem(event) {
  buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  updateCartTotal();
  CountUp();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("perfume-name")[0].innerText;
  let price = shopItem.getElementsByClassName("perfume-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("perfume-images")[0].src;

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("tr");
  cartRow.classList.add("product-info");
  let cartItems = document.getElementsByClassName("entire-shop")[0];
  let cartItemsNames = cartItems.getElementsByClassName("product-name");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      //alret("Already added");
      return;
    }
  }
  let cartRowContents = `
          <td>
            <div class="cart-info">
              <img src="${imageSrc}" class="product-img" />
              <div>
                <p class="product-name">${title}</p>
                <small>Price: £${price}</small>
              </div>
            </div>
          </td>
          <td><input type="number" value="1" class="product-quantity" /></td>
          <td class="product-price">${price}</td>
          <td><a href="#" class="removal-option">Romve</a></td>
        
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("removal-option")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("product-quantity")[0]
    .addEventListener("change", quantityChanged);

  CountDown();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("entire-shop")[0];
  let PerfumeInfo = cartItemContainer.getElementsByClassName("product-info");
  let total = 0;
  for (let i = 0; i < PerfumeInfo.length; i++) {
    let cartRow = PerfumeInfo[i];
    let priceElement = cartRow.getElementsByClassName("product-price")[0];
    let quantityElement = cartRow.getElementsByClassName("product-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("£", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("sum-price")[0].innerText = "£" + total;
}

let PressBasket = document.querySelector(".basket");
let CartInput = document.querySelector(".product-info");
let PressAddToCard = document.getElementsByClassName("add-to-cart");
for (let i = 0; i < PressAddToCard.length; i++) {
  let AddingButton = PressAddToCard[i];
  AddingButton.addEventListener("cilick", CountUp);
}
function CountDown() {
  let item = Number(PressBasket.getAttribute("data-count") || 0);
  PressBasket.setAttribute("data-count", item + 1);
  PressBasket.classList.add("on");
}
function CountUp() {
  let item = Number(PressBasket.getAttribute("data-count") || 0);
  PressBasket.setAttribute("data-count", item - 1);
  PressBasket.classList.add("on");
}

const cartContainer = document.getElementsByClassName("cart-container")[0];
document.getElementsByClassName("cart-btn")[0].addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart-container");
});

/*   

*/

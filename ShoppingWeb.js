//information is loaded this file
let MyDataList = [
  {
    PerfumeName: "BLEU DE CHANEL",
    PerfumeCompany: "CHANEL",
    PerfumeImage: "pics/BLEU-DE-CHANEL.jpg",
    PerfumeFrench: "Eau De Toilette Spray",
    PerfumePrice: "£72.00",
    PerfumeDescription:
      "An ode to masculine freedom expressed in an aromatic-woody fragrance with a captivating trail. A timeless scent housed in a bottle of deep and mysterious blue.BLEU DE CHANEL Parfum is an accomplished composition with a pure, deep character. An intensely masculine signature that exudes self-confidence",
  },
  {
    PerfumeName: "BOSS BOTTLED. NIGHT.",
    PerfumeCompany: "HUGO BOSS",
    PerfumeImage: "pics/BOSS-BOTTLED-NIGHT.jpg",
    PerfumeFrench: "Eau De Toilette Spray",
    PerfumePrice: "£50.00",
    PerfumeDescription:
      "BOSS Bottled Night is destined to become the secret weapon in the BOSS man’s armoury of seduction. It brings success both during the night and day.",
  },
  {
    PerfumeName: "CK One",
    PerfumeCompany: "Calvin Klein ",
    PerfumeImage: "pics/calvin-klein.jpg",
    PerfumeFrench: "Eau De Toilette Spray",
    PerfumePrice: "£29.00",
    PerfumeDescription:
      "Purity. Unity. Fresh. The revolutionary first ck fragrance is designed for men and women to share.",
  },
  {
    PerfumeName: "Diamonds",
    PerfumeCompany: "Armani",
    PerfumeImage: "pics/Diamonds.jpg",
    PerfumeFrench: "EA Diamonds For Men 75ml EDT",
    PerfumePrice: "£43.50",
    PerfumeDescription:
      "Emporio Armani Diamonds for Men by Giorgio Armani, Introduced on the market in august 2008. Its bottle was designed by Giorgio Armani himself; it contains gourmet woody aromatic juicy, with an unusual gourmet reversal in the top notes. The perfume opens with sparkling, sweet aromas of bergamot, with guaiac, vetiver, cedar, szechuan pepper, cocoa and ambroxan.",
  },
  {
    PerfumeName: "Eros",
    PerfumeCompany: "Versace",
    PerfumeImage: "pics/Eros.jpg",
    PerfumeFrench: "Eau De Toilette 100ml Spray",
    PerfumePrice: "£69.00",
    PerfumeDescription:
      "Masculine and confident, the new Eros Eau de Parfum is a fragrance for a bold, passionate man. The sensual scent fuses woody, oriental and fresh notes, creating a powerful perfume that evokes Eros the god of love. The new fragrance is presented in a blue and gold geometric bottle boasting tactile Medusa and Greca details.",
  },
  {
    PerfumeName: "Gucci Guilty For Him",
    PerfumeCompany: "Gucci",
    PerfumeImage: "pics/Gucci-Guilty-For-Him.jpg",
    PerfumeFrench: "Black EDT 50ml Spray",
    PerfumePrice: "£40.00",
    PerfumeDescription:
      "Launched by the design house of gucci.This Woody Aromatic Spicy fragrance has a blend of Rose and Chili Pepper, red pepper, vinegar and salt, Orange Blossom Absolute, Neroli and French Lavender, Patchouli and Cedarwood.",
  },
  {
    PerfumeName: "Homme",
    PerfumeCompany: "JOOP!",
    PerfumeImage: "pics/Homme.jpg",
    PerfumeFrench: "For Him Eau de Toilette 125ml Spray",
    PerfumePrice: "£25.00",
    PerfumeDescription: "",
  },
  {
    PerfumeName: "Invictus",
    PerfumeCompany: "Paco Rabanne",
    PerfumeImage: "pics/Invictus.jpg",
    PerfumeFrench: "Eau De Toilette 100ml Spray",
    PerfumePrice: "£65.00",
    PerfumeDescription:
      "JOOP! by Joop! for MEN EDT SPRAY 4.2 OZ Launched by the design house of Joop! in 1989, JOOP! by Joop! possesses a blend of exotic spice and florals, with woods, patchouli and honey, very masculine.. It is recommended for evening wear.",
  },
  {
    PerfumeName: "Luna Rossa Ocean",
    PerfumeCompany: "Prada",
    PerfumeImage: "pics/Luna-Rossa-Ocean.jpg",
    PerfumeFrench: "Eau De Toilette 50ml Spray",
    PerfumePrice: "£55.00",
    PerfumeDescription:
      "MBODY THE INVINCIBLE. This woody aquatic fragrance appears with sea notes, grapefruit, and mandarin orange, drying to an earthy finish of oakmoss, guiac wood, and patchouli.",
  },
  {
    PerfumeName: "Ombre Leather",
    PerfumeCompany: "Tom Ford",
    PerfumeImage: "pics/Ombre-Leather.jpg",
    PerfumeFrench: "Eau De Parfum 100ml Spray",
    PerfumePrice: "£130.00",
    PerfumeDescription:
      "Launched by the design house of Tom Ford. Released in the year of 2018.",
  },
  {
    PerfumeName: "Sauvage",
    PerfumeCompany: "DIOR",
    PerfumeImage: "pics/Sauvage.jpg",
    PerfumeFrench: "Eau De Parfum 60ml Spray",
    PerfumePrice: "£69.00",
    PerfumeDescription:
      "A new, highly concentrated interpretation of Sauvage, melding extreme freshness with warm oriental tones and wild beauty that comes to life on the skin. François Demachy, Dior Perfumer-Creator, drew inspiration from unspoiled expanses of wilderness beneath a blue-tinged night sky, as the intense aromas of a crackling fire rise into the air. The fragrance of a new frontier: an interpretation with a rich, heady trail that celebrates the magic of wide-open spaces.",
  },
];

function AddProductData(MyDataList) {
  for (let i = 0; i < MyDataList.length; i++) {
    let CreatedDiv = document.createElement("div");
    CreatedDiv.classList.add("single-perfume");
    let ProductDivsConainer = document.getElementsByClassName("container")[0];
    let CreatedDivcontents = `
          <div class="single-perfume-bg">
            <img src="${MyDataList[i].PerfumeImage}" class="perfume-images" c />

            <div class="perfume-cart">
              <p> 
                <a href="#"class="add-to-cart">add to cart</a>
              </p>
            </div>
          </div>
          <h4 class="perfume-company"><a href="#">${MyDataList[i].PerfumeCompany}</a></h4>
          <h4 class="perfume-name">${MyDataList[i].PerfumeName}</h4>
          <h4>${MyDataList[i].PerfumeFrench}</h4>
          <p class="perfume-price">${MyDataList[i].PerfumePrice}</p>
  `;
    CreatedDiv.innerHTML = CreatedDivcontents;
    ProductDivsConainer.append(CreatedDiv);
  }
}
AddProductData(MyDataList);

function showDetailView(MyDataList) {
  let target = document.getElementsByClassName("detail-container")[0];

  window.localStorage.setItem("activeUserId", JSON.stringify(MyDataList));

  target.innerHTML = `
      <div class="row">
        <div class="col-2">
          <img
            src="${MyDataList.PerfumeImage}"
            alt=""
            id="productPic"
             </div>
        <div class="col-2">
          <p>Home / Perfume</p>
          <h1>${MyDataList.PerfumeName}</h1>
          <h4>${MyDataList.PerfumePrice}</h4>
          <br />
          <h3>Product Details</h3>
          <p> ${MyDataList.PerfumeDescription} </p>
          <br />
        </div>
          <button class="hide"  onclick="backToMain()" >Hide</button>
        `;
}

function backToMain() {
  window.localStorage.removeItem("activeUserId");
  start();
}

function start() {
  let target = document.getElementsByClassName("detail-container")[0];
  target.innerHTML = ""; // delete previous content

  const activeUserIdFromLocalStorage =
    window.localStorage.getItem("activeUserId");
  if (activeUserIdFromLocalStorage != null) {
    showDetailView(JSON.parse(activeUserIdFromLocalStorage));
    return;
  }

  let AddProductDetail = document.getElementsByClassName("perfume-company");
  for (let n = 0; n < AddProductDetail.length; n++) {
    let companybutton = AddProductDetail[n];
    companybutton.addEventListener("click", AddProductDetailClicked);
  }
  function AddProductDetailClicked(event) {
    let companybutton = event.target;
    let shop = companybutton.parentElement.parentElement;
    let perfumetitle =
      shop.getElementsByClassName("perfume-company")[0].innerText;
    let Index = MyDataList.map((e) => e.PerfumeCompany).indexOf(perfumetitle);
    showDetailView(MyDataList[Index]);
    console.log(Index);
  }
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let RemoveItem = document.getElementsByClassName("removal-option");
  for (let i = 0; i < RemoveItem.length; i++) {
    let button = RemoveItem[i];
    button.addEventListener("click", RemoveCartItem);
  }

  let quantityInputs = document.getElementsByClassName("product-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  let addToCartButton = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", AddToCartClicked);
  }
}
//}
function RemoveCartItem(event) {
  buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  UpdateCartTotal();
  CountUp();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  UpdateCartTotal();
}

function AddToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("perfume-name")[0].innerText;
  let price = shopItem.getElementsByClassName("perfume-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("perfume-images")[0].src;

  AddItemToCart(title, price, imageSrc);
  UpdateCartTotal();
}

function AddItemToCart(title, price, imageSrc) {
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
    .addEventListener("click", RemoveCartItem);
  cartRow
    .getElementsByClassName("product-quantity")[0]
    .addEventListener("change", quantityChanged);

  CountDown();
}

function UpdateCartTotal() {
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

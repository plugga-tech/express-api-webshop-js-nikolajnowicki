let contentContainer = document.getElementById("content-container");

export function renderHome() {
  let homePageContainer = document.createElement("div");
  homePageContainer.id = "home-page-container";

  let homePageHeader = document.createElement("h1");
  homePageHeader.innerHTML = "Welcome to the Store!";
  homePageHeader.id = "home-page-header";

  let productsContainer = document.createElement("div");
  productsContainer.id = "products-container";

  let productCategory = document.createElement("h2");
  productCategory.innerHTML = "Product Category";
  productCategory.id = "product-category";

  let productCard = document.createElement("div");
  productCard.id = "product-card";

  let productImg = document.createElement("img");
  //   productImg.src = "https://via.placeholder.com/150";
  productImg.src = "./public/images/sneaker-1.png";

  productImg.id = "product-img";

  let productTitle = document.createElement("h3");
  productTitle.innerHTML = "Product Title";
  productTitle.id = "product-title";

  let productDescription = document.createElement("p");
  productDescription.innerHTML = "Product Description";
  productDescription.id = "product-description";

  let productPrice = document.createElement("p");
  productPrice.innerHTML = "Product Price";
  productPrice.id = "product-price";

  let productStorage = document.createElement("p");
  productStorage.innerHTML = "Storage: 10";
  productStorage.id = "product-storage";

  let addButton = document.createElement("button");
  addButton.innerHTML = "Add to Cart";
  addButton.id = "add-button";
  addButton.className = "add-button";

  contentContainer.append(homePageContainer);
  homePageContainer.append(homePageHeader);
  homePageContainer.append(productsContainer);
  productsContainer.append(productCategory);
  productsContainer.append(productCard);
  productCard.append(productImg);
  productCard.append(productTitle);
  productCard.append(productDescription);
  productCard.append(productPrice);
  productCard.append(productStorage);
  productCard.append(addButton);
}

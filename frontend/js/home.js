let contentContainer = document.getElementById("content-container");

export async function renderHome() {
  let response = await fetch("http://localhost:3000/api/products");
  let products = await response.json();

  let homePageContainer = document.createElement("div");
  homePageContainer.id = "home-page-container";

  let cartContainer = document.createElement("div");
  cartContainer.id = "cart-container";

  let cart = document.createElement("div");
  cart.id = "cart";

  let cartImg = document.createElement("img");
  cartImg.src = "./public/images/cart.png";
  cartImg.id = "cart-img";

  let cartCount = document.createElement("p");
  cartCount.id = "cart-count";
  cartCount.innerHTML = "0";

  cart.append(cartImg);
  cart.append(cartCount);
  cartContainer.append(cart);

  let sendOrderContainer = document.createElement("div");
  sendOrderContainer.id = "send-order-container";

  let sendOrderButton = document.createElement("button");
  sendOrderButton.innerHTML = "Send Order";
  sendOrderButton.id = "send-order-button";
  sendOrderButton.addEventListener("click", async () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const token = localStorage.getItem("token");
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const userId = decodedPayload.userId;

    let orderData = {
      user: userId,
      products: cart.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
    };

    let response = await fetch("http://localhost:3000/api/orders/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    localStorage.removeItem("cart");

    if (response.ok) {
      alert("Order sent successfully!");
      localStorage.removeItem("cart");
      contentContainer.innerHTML = "";
      renderHome();
    } else {
      alert("Failed to send order.");
    }
  });

  cart.append(sendOrderButton);

  sendOrderContainer.append(sendOrderButton);
  homePageContainer.append(cartContainer);
  homePageContainer.append(sendOrderContainer);

  let homePageHeader = document.createElement("h1");
  homePageHeader.innerHTML = "Welcome to the Store!";
  homePageHeader.id = "home-page-header";

  let productsContainer = document.createElement("div");
  productsContainer.id = "products-container";

  homePageContainer.append(homePageHeader);
  homePageContainer.append(productsContainer);

  let groupedProducts = products.reduce((grouped, product) => {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
    return grouped;
  }, {});

  for (let category in groupedProducts) {
    let categoryContainer = document.createElement("div");
    categoryContainer.className = "category-container";

    let categoryHeader = document.createElement("h2");
    categoryHeader.innerHTML = category;
    categoryHeader.className = "category-header";

    let productContainer = document.createElement("div");
    productContainer.className = "product-container";

    categoryContainer.appendChild(categoryHeader);
    categoryContainer.appendChild(productContainer);

    for (let product of groupedProducts[category]) {
      let productCard = document.createElement("div");
      productCard.id = "product-card";

      let productImg = document.createElement("img");
      productImg.src = "./public/images/sneaker-1.png";
      productImg.id = "product-img";

      let productTitle = document.createElement("h3");
      productTitle.innerHTML = product.name;
      productTitle.id = "product-title";

      let productDescription = document.createElement("p");
      productDescription.innerHTML = product.description;
      productDescription.id = "product-description";

      let productPrice = document.createElement("p");
      productPrice.innerHTML = `$${product.price}`;
      productPrice.id = "product-price";

      let productStorage = document.createElement("p");
      productStorage.innerHTML = `Storage: ${product.lager}`;
      productStorage.id = "product-storage";

      let addButton = document.createElement("button");
      addButton.innerHTML = "Add to Cart";
      addButton.id = "add-button";
      addButton.className = "add-button";

      addButton.addEventListener("click", () => {
        let cartCount = document.getElementById("cart-count");
        cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = { product, quantity: 1 };
        let existingItemIndex = cart.findIndex(
          (item) => item.product._id === product._id
        );
        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cart.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(cart);
      });

      productCard.append(productImg);
      productCard.append(productTitle);
      productCard.append(productDescription);
      productCard.append(productPrice);
      productCard.append(productStorage);
      productCard.append(addButton);

      productContainer.appendChild(productCard);
    }

    productsContainer.appendChild(categoryContainer);
  }

  contentContainer.innerHTML = "";
  contentContainer.append(homePageContainer);
}

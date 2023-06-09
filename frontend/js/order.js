let contentContainer = document.getElementById("content-container");
let mainContainer = document.getElementById("main-container");

async function getApiKey() {
  const response = await fetch("http://localhost:3000/api/getApiKey");
  const data = await response.json();
  return data.apiKey;
}

const apiKey = await getApiKey();

async function getUserOrders(userId) {
  try {
    const response = await fetch("http://localhost:3000/api/orders/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId, token: apiKey }),
    });
    if (response.ok) {
      const orders = await response.json();
      return orders;
    } else {
      throw new Error("Failed to fetch user orders");
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch user orders: ${err.message}`);
  }
}

let userOrderContainer = document.createElement("div");

export async function renderUserOrder() {
  contentContainer.innerHTML = "";
  userOrderContainer.innerHTML = "";

  userOrderContainer.id = "user-order-container";

  let userOrderTitle = document.createElement("h1");
  userOrderTitle.innerHTML = "Your Orders";
  userOrderTitle.id = "user-order-title";

  let userOrder = document.createElement("div");
  userOrder.id = "user-order";

  let token = localStorage.getItem("token");
  let [, payload] = token.split(".");
  let decodedPayload = JSON.parse(atob(payload));
  let userId = decodedPayload.userId;

  try {
    let orders = await getUserOrders(userId);
    for (let order of orders) {
      let orderDiv = document.createElement("div");
      orderDiv.id = "order-div";
      let orderId = document.createElement("p");
      orderId.innerHTML = `Order ID:  ${order._id}`;
      orderId.id = "order-id";
      userOrder.appendChild(orderDiv);
      orderDiv.appendChild(orderId);

      for (let item of order.products) {
        let productResponse = await fetch(
          `http://localhost:3000/api/products/${item.productId}`
        );
        let product = await productResponse.json();
        let productName = document.createElement("p");
        productName.innerHTML = `Product: ${product.name}`;
        productName.id = "product-name";
        let productQuantity = document.createElement("p");
        productQuantity.innerHTML = `Quantity: ${item.quantity}`;
        productQuantity.id = "product-quantity";
        orderDiv.appendChild(productName);
        orderDiv.appendChild(productQuantity);
      }
      userOrder.appendChild(orderDiv);
    }
  } catch (err) {
    console.error(err);
    alert(`Failed to get user orders: ${err.message}`);
  }
  userOrderContainer.append(userOrderTitle);
  userOrderContainer.append(userOrder);

  contentContainer.append(userOrderContainer);
}

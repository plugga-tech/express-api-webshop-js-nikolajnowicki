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

  const token = localStorage.getItem("token");
  const [, payload] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  const userId = decodedPayload.userId;

  try {
    const orders = await getUserOrders(userId);
    for (const order of orders) {
      const orderDiv = document.createElement("div");
      orderDiv.innerHTML = `Order ID: ${order._id}`;

      for (const item of order.products) {
        const productResponse = await fetch(
          `http://localhost:3000/api/products/${item.productId}`
        );
        const product = await productResponse.json();
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `Product: ${product.name}, Quantity: ${item.quantity}`;
        orderDiv.appendChild(productDiv);
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

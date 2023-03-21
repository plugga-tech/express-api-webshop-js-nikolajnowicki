let contentContainer = document.getElementById("content-container");

export function renderAbout() {
  let aboutContainer = document.createElement("div");
  aboutContainer.id = "about-container";

  let aboutText = document.createElement("p");
  aboutText.innerHTML = `

  Welcome to Fresh Kicks, your one-stop-shop for the latest and greatest in footwear! Our online store offers a vast selection of stylish, high-quality shoes that will keep you looking and feeling your best.
  
  At Fresh Kicks, we believe that everyone deserves access to top-notch shoes at affordable prices. That's why we work tirelessly to source the best products from the most reputable manufacturers and bring them straight to your doorstep.
  
  Whether you're looking for a new pair of sneakers, boots, or sandals, we've got you covered. Our inventory includes a wide range of styles, colors, and sizes to suit any taste or preference. And with our user-friendly website and speedy shipping options, you can shop with confidence and ease.
  
  So why wait? Start browsing our collection today and treat your feet to the ultimate in comfort and style. And if you ever have any questions or concerns, don't hesitate to reach out to our friendly customer service team. We're always here to help!`;

  contentContainer.append(aboutContainer);
  aboutContainer.append(aboutText);
}

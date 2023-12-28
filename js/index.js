const shoppingCart = document.getElementById('shoppingCart');
const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = [];

// Fetch products from API
async function fetchProducts() {
  const response = await fetch('https://dummyjson.com/products');
  const products = await response.json();

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.draggable = true;
  card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
    `;

  card.addEventListener('dragstart', () => {
    // Set data to be transferred during drag-and-drop
    event.dataTransfer.setData('text/plain', JSON.stringify(product));
  });

  return card;
}

// Initialize shopping cart
function initShoppingCart() {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Please drag products into the shopping cart first.');
    } else {
      // Proceed to checkout page
      showCheckoutPage();
    }
  });
}

// Show checkout page
function showCheckoutPage() {
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Clear product list and update shopping cart
  productList.innerHTML = '';
  cartItems.innerHTML = cart
    .map((item) => `<li>${item.name} - $${item.price}</li>`)
    .join('');

  // Display total price
  const totalElement = document.createElement('p');
  totalElement.textContent = `Total Price: $${totalPrice}`;
  shoppingCart.appendChild(totalElement);
}

// Initialize web worker
const worker = new Worker('webworker.js');

// Handle messages from the web worker
worker.addEventListener('message', (event) => {
  if (event.data === 'checkout') {
    // Perform checkout when receiving message from web worker
    checkout();
  }
});

// Function to be executed on checkout
function checkout() {
  alert('Checkout successful!');
  // Clear cart and update UI
  cart = [];
  cartItems.innerHTML = '';
  showProductList();
}

// Show product list and start listening for drag-and-drop events
function showProductList() {
  productList.innerHTML = '';
  fetchProducts();
  initShoppingCart();
}

// Initial setup
showProductList();

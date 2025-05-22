let tools = JSON.parse(localStorage.getItem('tools')) || [
  { name: "Pro Pruner", type: "Cutting", qty: 5, img: "https://www.bosch-professional.com/cz/cs/ocsmedia/338967-117/dimensional-drawing-image/767x767/akumulatorove-zahradni-nuzky-pro-pruner-06019k1020.jpg" },
  { name: "XL Rake", type: "Raking", qty: 7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnJIaNN1zNd2KXQ5dimOkp_T-wH0y3Kct25w&s" },
  { name: "Sturdy Shovel", type: "Digging", qty: 4, img: "https://m.media-amazon.com/images/I/516q5yO+ccL.jpg" },
  { name: "Water Hose", type: "Watering", qty: 10, img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622" },
  { name: "Gardening Gloves", type: "Protection", qty: 15, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS364ZjiwEb_SyNW6d1WWcyedYvUclBYiDWlQ&s" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts(filteredList = null) {
  const list = filteredList || tools;
  const container = document.getElementById('productList');
  container.innerHTML = '';
  list.forEach(tool => {
    container.innerHTML += `
      <div class="col-md-4 col-lg-3 mb-4">
        <div class="card h-100">
          <img src="${tool.img || 'https://img.icons8.com/ios/100/gardening.png'}" class="card-img-top" alt="${tool.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${tool.name}</h5>
            <p class="card-text">Type: ${tool.type}</p>
            <p class="card-text">Available: ${tool.qty}</p>
            <div class="mt-auto">
              <button class="btn btn-outline-success w-100 mb-2" onclick="addToCart('${tool.name}')">Add to Cart</button>
              <button class="btn btn-success w-100" onclick="buyNow('${tool.name}')">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function buyNow(productName) {
  document.getElementById('buyModal').classList.add('show');
  const form = document.getElementById('purchaseForm');
  form.onsubmit = function(e) {
    e.preventDefault();
    alert(`Thanks for purchasing ${productName}!`);
    closeModal();
  };
}

function closeModal() {
  document.getElementById('buyModal').classList.remove('show');
}

function addToCart(productName) {
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: productName, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(keyword) ||
    tool.type.toLowerCase().includes(keyword)
  );
  displayProducts(filtered);
});

displayProducts();
updateCartCount();

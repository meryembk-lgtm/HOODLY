const products = {
    1: {
        name:"Signature Hoodie",
        price:79,
        description:"Ultra-soft premium hoodie designed for everyday elegance.",
        images:[
            "https://via.placeholder.com/500x650",
            "https://via.placeholder.com/500x650",
            "https://via.placeholder.com/500x650"
        ],
        sizes:["XS","S","M","L"]
    },
    2: {
        name:"Nude Comfort Hoodie",
        price:85,
        description:"Minimal nude hoodie with a soft, cozy finish.",
        images:[
            "https://via.placeholder.com/500x650",
            "https://via.placeholder.com/500x650"
        ],
        sizes:["S","M","L"]
    },
    3: {
        name:"Oversized Soft Hoodie",
        price:90,
        description:"Oversized fit for maximum comfort and warmth.",
        images:[
            "https://via.placeholder.com/500x650",
            "https://via.placeholder.com/500x650"
        ],
        sizes:["M","L","XL"]
    }
};

let currentProduct = null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openProduct(id) {
    currentProduct = products[id];
    document.getElementById("product-list").classList.add("hidden");
    document.getElementById("product-details").classList.remove("hidden");

    document.getElementById("detail-name").textContent = currentProduct.name;
    document.getElementById("detail-price").textContent = "$" + currentProduct.price;
    document.getElementById("detail-description").textContent = currentProduct.description;

    document.getElementById("main-image").src = currentProduct.images[0];

    const thumbs = document.getElementById("thumbnails");
    thumbs.innerHTML = "";
    currentProduct.images.forEach(img => {
        thumbs.innerHTML += `<img src="${img}" onclick="changeImage('${img}')">`;
    });

    const sizes = document.getElementById("detail-sizes");
    sizes.innerHTML = "";
    currentProduct.sizes.forEach(s => {
        sizes.innerHTML += `<option>${s}</option>`;
    });
}

function changeImage(src) {
    document.getElementById("main-image").src = src;
}

function goHome() {
    document.getElementById("product-details").classList.add("hidden");
    document.getElementById("product-list").classList.remove("hidden");
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("hidden");
}

function addCurrentProduct() {
    cart.push({ name: currentProduct.name, price: currentProduct.price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const items = document.getElementById("cart-items");
    const count = document.getElementById("cart-count");
    const total = document.getElementById("cart-total");

    items.innerHTML = "";
    let sum = 0;

    cart.forEach(i => {
        sum += i.price;
        items.innerHTML += `<div class="cart-item"><span>${i.name}</span><span>$${i.price}</span></div>`;
    });

    count.textContent = cart.length;
    total.textContent = "$" + sum;
}

updateCart();

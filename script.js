// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Optional: Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Cart functionality
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.querySelector('h3').innerText;
        const price = parseFloat(product.querySelector('.price').innerText.replace('$',''));

        // Check if item already in cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button class="remove-item">Remove</button>
        `;
        cartItems.appendChild(li);

        // Remove button
        li.querySelector('.remove-item').addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem.name !== item.name);
            updateCart();
        });
    });

    cartTotal.innerText = total.toFixed(2);
}

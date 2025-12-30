// --- Elements ---
const cartModal = document.getElementById('cart-modal');
const cartNavLink = document.getElementById('cart-nav-link');
const closeModal = document.querySelector('.close-modal');
const modalItemsContainer = document.getElementById('modal-cart-items');
const modalTotal = document.getElementById('modal-total');
const cartCount = document.getElementById('cart-count');
const notificationContainer = document.getElementById('notification-container');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];

// --- Navigation & Menu ---
document.getElementById('mobile-menu').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- Modal Logic ---
cartNavLink.addEventListener('click', () => {
    cartModal.style.display = "block";
    renderModalCart();
});

closeModal.onclick = () => cartModal.style.display = "none";
window.onclick = (e) => { if (e.target == cartModal) cartModal.style.display = "none"; };

// --- Cart Logic ---
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.querySelector('h3').innerText;
        const price = parseFloat(product.querySelector('.price').innerText.replace('$', ''));

        const existing = cart.find(item => item.name === name);
        if (existing) { existing.quantity += 1; } 
        else { cart.push({ name, price, quantity: 1 }); }

        // Button Feedback
        button.innerText = "Added!";
        button.classList.add('added');
        setTimeout(() => {
            button.innerText = "Add to Cart";
            button.classList.remove('added');
        }, 1500);

        showNotification(`${name} added!`);
        updateCartUI();
    });
});

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    // Counter animation
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 300);
}

function renderModalCart() {
    modalItemsContainer.innerHTML = cart.length === 0 ? '<p>Your cart is empty.</p>' : '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'modal-item';
        div.innerHTML = `
            <div><strong>${item.name}</strong><br><small>$${item.price} x ${item.quantity}</small></div>
            <button class="remove-item" onclick="removeItem('${item.name}')" style="background:none; border:none; color:#d68c7a; cursor:pointer;">Remove</button>
        `;
        modalItemsContainer.appendChild(div);
    });
    modalTotal.innerText = total.toFixed(2);
}

window.removeItem = (name) => {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
    renderModalCart();
};

function showNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    notificationContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
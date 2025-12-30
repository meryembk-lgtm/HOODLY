const products = {
    1: {
        name: "Blush Hoodie",
        price: "$79",
        description: "Soft blush hoodie with a relaxed fit and premium cotton fabric.",
        image: "https://via.placeholder.com/500x650",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    2: {
        name: "Nude Zip Hoodie",
        price: "$85",
        description: "Minimal nude zip hoodie designed for layering and comfort.",
        image: "https://via.placeholder.com/500x650",
        sizes: ["S", "M", "L"]
    },
    3: {
        name: "Sand Oversized Hoodie",
        price: "$89",
        description: "Oversized hoodie in warm sand tone with a cozy feel.",
        image: "https://via.placeholder.com/500x650",
        sizes: ["M", "L", "XL"]
    },
    4: {
        name: "Cream Lounge Hoodie",
        price: "$75",
        description: "Lightweight cream hoodie perfect for lounging or casual wear.",
        image: "https://via.placeholder.com/500x650",
        sizes: ["XS", "S", "M"]
    }
};

function openProduct(id) {
    const product = products[id];

    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-price").textContent = product.price;
    document.getElementById("detail-description").textContent = product.description;
    document.getElementById("detail-image").src = product.image;

    const sizes = document.getElementById("detail-sizes");
    sizes.innerHTML = "";
    product.sizes.forEach(size => {
        const option = document.createElement("option");
        option.textContent = size;
        sizes.appendChild(option);
    });

    document.getElementById("product-list").classList.add("hidden");
    document.getElementById("product-details").classList.remove("hidden");
}

function goHome() {
    document.getElementById("product-details").classList.add("hidden");
    document.getElementById("product-list").classList.remove("hidden");
}

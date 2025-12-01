// Cart functionality
class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.setupAddToCartButtons();
        this.updateCartCount();
    }

    setupAddToCartButtons() {
        // Get all Add to Cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.addToCart(e.target);
            });
        });
    }

    addToCart(button) {
        // Get product details
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productImage = productCard.querySelector('.product-image').src;
        const productDescription = productCard.querySelector('.product-description').textContent;

        // Create product object
        const product = {
            title: productTitle,
            price: productPrice,
            image: productImage,
            description: productDescription
        };

        // Check if product already exists in cart
        const existingProductIndex = this.cart.findIndex(item => item.title === product.title);

        if (existingProductIndex > -1) {
            // If product exists, increase quantity
            this.cart[existingProductIndex].quantity = (this.cart[existingProductIndex].quantity || 1) + 1;
        } else {
            // If product doesn't exist, add it with quantity 1
            product.quantity = 1;
            this.cart.push(product);
        }

        // Save to localStorage
        this.saveCart();

        // Update UI
        this.updateCartCount();
        this.showAddToCartConfirmation(productTitle);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const totalItems = this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartBadge.textContent = totalItems;
            // Show/hide badge based on item count
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    showAddToCartConfirmation(productTitle) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.textContent = `✓ Added ${productTitle} to cart!`;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Method to get cart items (for checkout page)
    static getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    // Method to clear cart (for checkout page after purchase)
    static clearCart() {
        localStorage.removeItem('cart');
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Cart();
});

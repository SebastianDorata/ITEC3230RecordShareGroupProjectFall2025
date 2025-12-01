// Toggle favorite status
document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('favorited');

            // Show tooltip
            const isFavorited = button.classList.contains('favorited');
            showTooltip(button, isFavorited ? 'Added to wishlist!' : 'Removed from wishlist');
        });
    });
});

function showTooltip(button, message) {
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'wishlist-tooltip';
    tooltip.textContent = message;

    // Position it near the button
    button.appendChild(tooltip);

    // Remove after 2 seconds
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}

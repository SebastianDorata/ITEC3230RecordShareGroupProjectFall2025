document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);

    // Set checkbox state based on saved theme
    themeToggle.checked = currentTheme === 'dark';

    // Toggle theme when checkbox is clicked
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';

        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

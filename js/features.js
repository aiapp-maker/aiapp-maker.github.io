// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
}

// Share Functionality
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnReddit() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const copyBtn = document.querySelector('.share-btn.copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    });
}

// Analytics (Google Analytics 4)
// Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 ID

// Track custom events
function trackEvent(category, action, label) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label
    });
}

// Track blog post reads
if (window.location.pathname.includes('/blogs/')) {
    trackEvent('Blog', 'Read', document.title);
}

// Track search usage
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (e.target.value.length > 2) {
                trackEvent('Search', 'Query', e.target.value);
            }
        }, 1000);
    });
}

// Track filter usage
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('Filter', 'Category', btn.dataset.category);
        });
    });
}

// Track sort usage
const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        trackEvent('Sort', 'Option', e.target.value);
    });
}

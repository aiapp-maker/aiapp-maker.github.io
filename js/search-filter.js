// Search and Filter Functionality
const searchInput = document.getElementById('searchInput');
const blogGrid = document.querySelector('.blog-grid');
const blogCards = Array.from(document.querySelectorAll('.blog-card'));
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
let currentCategory = 'all';
let currentSort = 'newest';

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterAndSortCards(searchTerm, currentCategory, currentSort);
});

// Category filter functionality
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update current category
        currentCategory = btn.dataset.category;
        const searchTerm = searchInput.value.toLowerCase();
        filterAndSortCards(searchTerm, currentCategory, currentSort);
    });
});

// Sort functionality
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        const searchTerm = searchInput.value.toLowerCase();
        filterAndSortCards(searchTerm, currentCategory, currentSort);
    });
}

// Combined filter and sort function
function filterAndSortCards(searchTerm, category, sortBy) {
    let visibleCards = [];

    // Filter cards
    blogCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const cardCategory = card.dataset.category || '';
        const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';

        const matchesSearch = !searchTerm ||
            title.includes(searchTerm) ||
            description.includes(searchTerm) ||
            tags.includes(searchTerm);
        const matchesCategory = category === 'all' || cardCategory === category;

        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
            visibleCards.push(card);
        } else {
            card.classList.add('hidden');
        }
    });

    // Sort visible cards
    sortCards(visibleCards, sortBy);

    // Show/hide no results message
    updateNoResultsMessage(visibleCards.length);
}

// Sort cards based on criteria
function sortCards(cards, sortBy) {
    const sorted = [...cards].sort((a, b) => {
        switch (sortBy) {
            case 'title-asc':
                return a.querySelector('.card-title').textContent.localeCompare(
                    b.querySelector('.card-title').textContent
                );
            case 'title-desc':
                return b.querySelector('.card-title').textContent.localeCompare(
                    a.querySelector('.card-title').textContent
                );
            case 'newest':
            case 'oldest':
                // For now, maintain current order (can add date metadata later)
                return 0;
            default:
                return 0;
        }
    });

    // Reorder in DOM
    sorted.forEach(card => {
        blogGrid.appendChild(card);
    });
}

// Update no results message
function updateNoResultsMessage(count) {
    let noResultsMsg = document.getElementById('noResultsMessage');

    if (count === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <div class="no-results-content">
                    <span class="no-results-icon">🔍</span>
                    <h3>No articles found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            blogGrid.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Initialize - show all cards
filterAndSortCards('', 'all', 'newest');

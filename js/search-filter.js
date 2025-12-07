// Search and Filter Functionality
const searchInput = document.getElementById('searchInput');
const blogCards = document.querySelectorAll('.blog-card');
const filterButtons = document.querySelectorAll('.filter-btn');
let currentCategory = 'all';

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterCards(searchTerm, currentCategory);
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
        filterCards(searchTerm, currentCategory);
    });
});

// Combined filter function
function filterCards(searchTerm, category) {
    let visibleCount = 0;

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
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Show/hide no results message
    updateNoResultsMessage(visibleCount);
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
            document.querySelector('.blog-grid').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Initialize - show all cards
filterCards('', 'all');

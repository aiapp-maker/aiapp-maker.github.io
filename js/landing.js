// Landing Page Enhancements

// Topic card filtering
document.addEventListener('DOMContentLoaded', () => {
    const topicCards = document.querySelectorAll('.topic-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    topicCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.dataset.category;

            // Scroll to articles section
            document.getElementById('articles').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Activate the corresponding filter button
            setTimeout(() => {
                filterButtons.forEach(btn => {
                    if (btn.dataset.category === category) {
                        btn.click();
                    }
                });
            }, 500);
        });
    });

    // Smooth scroll for hero CTA
    const exploreCTA = document.querySelector('.btn-primary[href="#articles"]');
    if (exploreCTA) {
        exploreCTA.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('articles').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
});

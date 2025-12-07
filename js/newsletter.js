// Newsletter Subscription Functionality

class NewsletterManager {
    constructor() {
        this.forms = document.querySelectorAll('.newsletter-form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const emailInput = form.querySelector('.newsletter-input');
        const submitBtn = form.querySelector('.newsletter-submit');
        const messageDiv = form.querySelector('.newsletter-message') || this.createMessageDiv(form);

        const email = emailInput.value.trim();

        // Validate email
        if (!this.validateEmail(email)) {
            this.showMessage(messageDiv, 'Please enter a valid email address', 'error');
            return;
        }

        // Disable form during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';

        try {
            // Option 1: Use a newsletter service (Mailchimp, ConvertKit, etc.)
            // await this.subscribeToMailchimp(email);

            // Option 2: Use a serverless function (Netlify, Vercel, etc.)
            // await this.subscribeViaServerless(email);

            // Option 3: Store locally and export (for static sites)
            await this.subscribeLocally(email);

            // Success
            this.showMessage(messageDiv, '🎉 Successfully subscribed! Check your email.', 'success');
            emailInput.value = '';

            // Track subscription
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_subscribe', {
                    'event_category': 'Newsletter',
                    'event_label': 'Subscribe'
                });
            }

        } catch (error) {
            this.showMessage(messageDiv, 'Something went wrong. Please try again.', 'error');
            console.error('Newsletter subscription error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe';
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    createMessageDiv(form) {
        const div = document.createElement('div');
        div.className = 'newsletter-message';
        form.appendChild(div);
        return div;
    }

    showMessage(div, message, type) {
        div.textContent = message;
        div.className = `newsletter-message ${type}`;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            div.className = 'newsletter-message';
        }, 5000);
    }

    // Local storage method (for demo/static sites)
    async subscribeLocally(email) {
        return new Promise((resolve) => {
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');

            if (subscribers.includes(email)) {
                throw new Error('Already subscribed');
            }

            subscribers.push({
                email: email,
                subscribedAt: new Date().toISOString()
            });

            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

            // Simulate network delay
            setTimeout(resolve, 1000);
        });
    }

    // Mailchimp integration example
    async subscribeToMailchimp(email) {
        // Replace with your Mailchimp endpoint
        const MAILCHIMP_URL = 'YOUR_MAILCHIMP_URL';

        const response = await fetch(MAILCHIMP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed'
            })
        });

        if (!response.ok) {
            throw new Error('Subscription failed');
        }

        return response.json();
    }

    // Serverless function example (Netlify/Vercel)
    async subscribeViaServerless(email) {
        const response = await fetch('/.netlify/functions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('Subscription failed');
        }

        return response.json();
    }
}

// Initialize newsletter manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NewsletterManager();
});

// Export subscribers (admin function)
function exportSubscribers() {
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    const csv = 'Email,Subscribed At\n' +
        subscribers.map(s => `${s.email},${s.subscribedAt}`).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter_subscribers.csv';
    a.click();
}

// Make export function available globally
window.exportSubscribers = exportSubscribers;

// Testimonial Rotation for Engagement

const testimonials = [
    {
        text: "Finally, tech concepts that actually make sense!",
        author: "Sarah, Career Switcher"
    },
    {
        text: "I wish I had this when I started learning to code",
        author: "Mike, Self-Taught Developer"
    },
    {
        text: "The analogies are brilliant. Everything just clicks!",
        author: "Jessica, CS Student"
    },
    {
        text: "No more confusing jargon. Just clear explanations.",
        author: "David, Bootcamp Graduate"
    }
];

let currentTestimonial = 0;

function rotateTestimonials() {
    const testimonialElements = document.querySelectorAll('.testimonial');

    if (testimonialElements.length === 0) return;

    // If we only have one testimonial in HTML, create more
    if (testimonialElements.length === 1) {
        const carousel = document.querySelector('.testimonial-carousel');
        if (!carousel) return;

        // Clear and rebuild
        carousel.innerHTML = '';

        testimonials.forEach((testimonial, index) => {
            const div = document.createElement('div');
            div.className = 'testimonial' + (index === 0 ? ' active' : '');
            div.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">— ${testimonial.author}</p>
            `;
            carousel.appendChild(div);
        });
    }

    // Rotate testimonials every 5 seconds
    setInterval(() => {
        const allTestimonials = document.querySelectorAll('.testimonial');

        // Remove active class from current
        allTestimonials[currentTestimonial].classList.remove('active');

        // Move to next
        currentTestimonial = (currentTestimonial + 1) % allTestimonials.length;

        // Add active class to new
        allTestimonials[currentTestimonial].classList.add('active');
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', rotateTestimonials);

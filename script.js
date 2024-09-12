document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    // Function to load reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => {
            addReviewToPage(review.name, review.rating, review.text);
        });
    }

    // Function to save reviews to localStorage
    function saveReview(name, rating, review) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ name, rating, text: review });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Function to add review to the page
    function addReviewToPage(name, rating, review) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <strong>${name}</strong> - Rating: ${rating}/5
            <p>${review}</p>
        `;
        reviewsList.appendChild(reviewItem);
    }

    // Load existing reviews when the page is loaded
    loadReviews();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;

        if (name && rating && review) {
            addReviewToPage(name, rating, review);
            saveReview(name, rating, review);
            form.reset();
        }
    });
});

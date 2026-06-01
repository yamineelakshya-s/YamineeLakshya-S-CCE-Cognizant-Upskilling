// script.js — Local Community Event Portal

// Validate phone number on blur
function validatePhone() {
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
    }
}

// Show entry fee based on selected event type
function showFee() {
    const type = document.getElementById('eventType').value;
    const fees = {
        Music: '₹150',
        Food: '₹100',
        Sports: 'Free'
    };
    const feeEl = document.getElementById('fee');
    if (feeEl) {
        feeEl.textContent = `Entry Fee: ${fees[type] || ''}`;
    }
}

// Count characters in feedback textarea
function countChars() {
    const feedback = document.getElementById('feedback');
    const countEl = document.getElementById('count');
    if (feedback && countEl) {
        countEl.textContent = feedback.value.length + ' characters';
    }
}

// Show registration success message
function showMessage(event) {
    if (event) event.preventDefault();
    const result = document.getElementById('result');
    if (result) {
        result.textContent = '✅ Registration Successful! Thank you.';
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', showMessage);
    }
    showFee(); // set default fee display
});

/**
 * CONTACT FORM HANDLER
 * Handles contact form submission via Web3Forms
 */

// Handle Select Dropdown Color
const select = document.getElementById('subject');
select.addEventListener('change', function () {
    this.classList.add('text-gray-900');
});

// Handle Form Submission
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');
const originalBtnText = submitBtn.innerHTML;

// Rate limiting — prevent spam
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN_MS = 10000; // 10 seconds between submissions

// Basic email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sanitize text input (strip HTML tags)
function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
        alert('Please wait a moment before submitting again.');
        return;
    }

    // Validate inputs
    const formData = new FormData(form);
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();
    const message = (formData.get('message') || '').trim();

    if (!name || name.length < 2) {
        alert('Please enter a valid name.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!message || message.length < 10) {
        alert('Please enter a message (at least 10 characters).');
        return;
    }

    // Sanitize before sending
    const object = Object.fromEntries(formData);
    object.name = sanitizeInput(object.name);
    object.email = sanitizeInput(object.email);
    object.message = sanitizeInput(object.message);
    if (object.subject) object.subject = sanitizeInput(object.subject);
    const json = JSON.stringify(object);

    // Loading state
    lastSubmitTime = now;
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                console.log(response);
                alert(json.message || "Something went wrong. Please try again.");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
});

function resetForm() {
    form.reset();
    successMessage.classList.add('hidden');
    form.classList.remove('hidden');
}

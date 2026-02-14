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

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>SENDING...</span>';

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

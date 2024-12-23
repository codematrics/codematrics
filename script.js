document.getElementById('enquire-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;

    const subject = "New Enquiry";
    const body = `Hello, I would like to enquire. My email is: ${email}`;

    window.location.href = `mailto:codematricsitsolution@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

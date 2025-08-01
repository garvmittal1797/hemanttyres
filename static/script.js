document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Sticky Call Button Logic ---
    const callButton = document.getElementById('sticky-call-button');
    const callOptions = document.getElementById('call-options');

    callButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevents the document click listener from firing immediately
        callOptions.classList.toggle('show');
    });

    // Hide call options when clicking outside
    document.addEventListener('click', function() {
        if (callOptions.classList.contains('show')) {
            callOptions.classList.remove('show');
        }
    });

});
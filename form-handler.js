// Ask Me Anything form handler
(function() {
  const form = document.getElementById('ama-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      status.style.display = 'none';
      status.className = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        status.textContent = 'Oops! Something went wrong. Please try again.';
        status.className = 'error';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
})();

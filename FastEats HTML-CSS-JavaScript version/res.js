document.addEventListener('DOMContentLoaded', function() {
  const reservationForm = document.getElementById('reservation-form');
  const reservationDetails = document.getElementById('reservation-details');
  const reservationOutput = document.getElementById('reservation-output');

  const picker = new Pikaday({
    field: document.getElementById('reservation-date'),
    format: 'YYYY-MM-DD',
    minDate: new Date(),
    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Set maximum date to one year from now
  });

  function submitReservation() {
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const persons = document.getElementById('reservation-persons').value;

    // Display reservation details
    reservationOutput.innerHTML = `Date: ${date}<br>Time: ${time}<br>Number of Persons: ${persons}`;
    reservationDetails.style.display = 'block';

    // Prevent form submission
    return false;
  }

  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitReservation();
  });
});

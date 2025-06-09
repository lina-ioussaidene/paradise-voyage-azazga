document.getElementById('quoteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    prenom: document.getElementById('firstname').value,
    nom: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    telephone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('https://paradise-backend-g9x5.onrender.com/api/devis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('✅ Demande envoyée avec succès !');
      document.getElementById('quoteForm').reset();
    } else {
      alert('❌ Erreur : ' + result.message);
    }
  } catch (error) {
    alert('❌ Une erreur est survenue : ' + error.message);
  }
});

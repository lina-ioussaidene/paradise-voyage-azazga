const adminPassword = "lyes@1992"; // 🔐 À personnaliser

const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const togglePasswordBtn = document.getElementById('togglePassword');
const logoutBtn = document.getElementById('logoutBtn');
const devisContainer = document.getElementById('devisContainer');

// Bouton afficher/masquer le mot de passe
togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.textContent = type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe';
});

// Bouton connexion
loginBtn.addEventListener('click', () => {
  if (passwordInput.value === adminPassword) {
    loginForm.style.display = 'none';
    adminPanel.style.display = 'block';
    fetchDevis();
  } else {
    alert('❌ Mot de passe incorrect');
  }
});

// Bouton déconnexion
logoutBtn.addEventListener('click', () => {
  adminPanel.style.display = 'none';
  loginForm.style.display = 'block';
  passwordInput.value = '';
});

// Récupération des devis depuis le backend
async function fetchDevis() {
  try {
    const response = await fetch('https://paradise-backend-g9x5.onrender.com/api/devis');
    const devis = await response.json();
    devisContainer.innerHTML = '';

    if (devis.length === 0) {
      devisContainer.innerHTML = "<p>Aucune demande de devis reçue.</p>";
      return;
    }

    devis.forEach(d => {
      const card = document.createElement('div');
      card.className = 'devis-card';
      card.innerHTML = `
        <p><strong>Nom:</strong> ${d.lastname}</p>
        <p><strong>Prénom:</strong> ${d.firstname}</p>
        <p><strong>Email:</strong> ${d.email}</p>
        <p><strong>Téléphone:</strong> ${d.phone}</p>
        <p><strong>Service:</strong> ${d.service}</p>
        <p><strong>Message:</strong> ${d.message}</p>
        <p><strong>Date:</strong> ${new Date(d.date).toLocaleString()}</p>
      `;
      devisContainer.appendChild(card);
    });
  } catch (err) {
    console.error("❌ Erreur de chargement :", err);
    devisContainer.innerHTML = "<p>❌ Erreur lors du chargement des devis.</p>";
  }
}

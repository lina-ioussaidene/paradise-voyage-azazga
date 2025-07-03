document.getElementById("quoteForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const service = document.getElementById("service").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
        const response = await fetch("https://paradise-backend-g9x5.onrender.com/api/devis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prenom, nom, email, telephone, service, message })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Demande envoyée avec succès !");
            document.getElementById("quoteForm").reset();
        } else {
            alert("Erreur lors de l'envoi : " + (data.error || "Erreur inconnue"));
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});


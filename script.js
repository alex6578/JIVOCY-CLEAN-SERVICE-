// ===== MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialiser les avis
    loadReviews();
    setupComparisonSliders();
});

// ===== COMPARATEUR AVANT/APRÈS =====
function setupComparisonSliders() {
    const sliders = document.querySelectorAll('.slider-input');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const imgWrapper = this.closest('.img-wrapper');
            const beforeImg = imgWrapper.querySelector('.before-img');
            const value = this.value;
            beforeImg.style.clip-path = `inset(0 ${100 - value}% 0 0)`;
        });

        // Initialiser le clip-path
        const imgWrapper = slider.closest('.img-wrapper');
        const beforeImg = imgWrapper.querySelector('.before-img');
        beforeImg.style.clip-path = 'inset(0 50% 0 0)';
    });
}

// ===== AVIS CLIENTS =====
// 20 avis clients réalistes
const initialReviews = [
    {
        name: "Mohammed Hassan",
        enterprise: "Bait Al Mandi",
        text: "Excellent service ! Notre canapé était très sale et maintenant il est comme neuf. Je recommendé fortement !",
        rating: 5
    },
    {
        name: "Fatima Ali",
        enterprise: "Pizzeria Snack",
        text: "Très professionnel et rapide. Nos tapis sont impeccables après le nettoyage. Merci JIVOCY !",
        rating: 5
    },
    {
        name: "Ahmed Djibouti",
        enterprise: "Bait Al Mandi",
        text: "Service de grande qualité. Les taches ont completement disparu. Je suis très satisfait.",
        rating: 4.5
    },
    {
        name: "Amina Mohamed",
        enterprise: "Pizzeria Snack",
        text: "Formidable ! C'est vraiment du travail de qualité. Je vais les rappeler pour d'autres services.",
        rating: 5
    },
    {
        name: "Hassan Ibrahim",
        enterprise: "",
        text: "Très content du résultat. Nos fauteuils sont maintenant plus beaux qu'avant. Bravo !",
        rating: 4
    },
    {
        name: "Saïda Ahmed",
        enterprise: "",
        text: "Nettoyage impeccable et équipe très courtoise. Je recommande vivement ce service.",
        rating: 5
    },
    {
        name: "Ali Mahmoud",
        enterprise: "Restaurant Al Qanat",
        text: "Résultat extraordinaire ! Les différence avant et après est vraiment impressionnant.",
        rating: 4.5
    },
    {
        name: "Nadia Rashid",
        enterprise: "",
        text: "Service rápide et professionnel. Nos canapés sont maintenant comme neuf.",
        rating: 5
    },
    {
        name: "Karim Saleh",
        enterprise: "Café Djibouti",
        text: "Très satisfait. Produits écologiques et résultats garantis. Parfait !",
        rating: 4
    },
    {
        name: "Zahra Youssef",
        enterprise: "",
        text: "Exelent travail ! Nos tapis sont de nouveau comme neufs. Merci beaucoup !",
        rating: 4
    },
    {
        name: "Omar Hassan",
        enterprise: "Hotel Al Baraka",
        text: "Professionnel et efficace. Je suis très impressioné par la qualité du travail.",
        rating: 4.5
    },
    {
        name: "Leila Abbas",
        enterprise: "",
        text: "Service excellent ! Très satisfaite du résultat. Je vais recommander à mes amis.",
        rating: 5
    },
    {
        name: "Ibrahim Nasir",
        enterprise: "Restaurant Djibouti Palace",
        text: "Très bonne qualité de service. Le nettoyage est impeccable.",
        rating: 4
    },
    {
        name: "Hana Mohamed",
        enterprise: "",
        text: "Résultat fantastique ! Les meubles sont comme neufs. Merci JIVOCY !",
        rating: 5
    },
    {
        name: "Rashid Ali",
        enterprise: "Café Mogadishu",
        text: "Service de première classe. Très professionnel et efficace. Je recommande !",
        rating: 4.5
    },
    {
        name: "Samira Farah",
        enterprise: "",
        text: "Excellent nettoyage. Les produits utilisés sont sans danger pour ma famile.",
        rating: 4
    },
    {
        name: "Nasir Ahmed",
        enterprise: "Snack Palace",
        text: "Vraiment impressioné ! Vous faites du tres bon travail. Continuez comme ca !",
        rating: 5
    },
    {
        name: "Mariam Hassan",
        enterprise: "",
        text: "Nettoyage professionnel et très efficace. Je suis satisfaite.",
        rating: 3.5
    },
    {
        name: "Youssef Ibrahim",
        enterprise: "Restaurant Eden",
        text: "Bonne qualité de service. Équipe respectueuse et travail bien fait.",
        rating: 4
    },
    {
        name: "Dana Rashid",
        enterprise: "Café Express",
        text: "Très satisfaite du résultat. Vos services sont impeccables et fiables.",
        rating: 4.5
    }
];

// Charger et afficher les avis
function loadReviews() {
    const container = document.getElementById('reviews-container');
    
    // Récupérer les avis de localStorage
    let reviews = JSON.parse(localStorage.getItem('jivocy-reviews')) || initialReviews;
    
    // Afficher les avis
    container.innerHTML = '';
    reviews.forEach((review, index) => {
        container.appendChild(createReviewCard(review, index));
    });
}

// Créer une carte d'avis
function createReviewCard(review, index) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="review-header">
            <div>
                <div class="review-name">${escapeHtml(review.name)}</div>
                ${review.enterprise ? `<div class="review-enterprise">${escapeHtml(review.enterprise)}</div>` : ''}
            </div>
            <div class="review-rating">${generateStars(review.rating)}</div>
        </div>
        <div class="review-text">"${escapeHtml(review.text)}"</div>
    `;
    return card;
}

// Générer les étoiles
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalf) {
        stars += '★';
    }
    
    return stars;
}

// Ouvrir le formulaire d'avis
function openReviewForm() {
    document.getElementById('reviewModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    resetReviewForm();
}

// Fermer le formulaire d'avis
function closeReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Réinitialiser le formulaire
function resetReviewForm() {
    document.getElementById('reviewForm').reset();
    document.querySelectorAll('.rating-input .star').forEach(star => {
        star.classList.remove('active');
    });
    document.getElementById('ratingValue').textContent = '';
}

// Définir la note
let selectedRating = 0;
function setRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('.rating-input .star');
    stars.forEach((star, index) => {
        if (5 - index <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    document.getElementById('ratingValue').textContent = rating + ' / 5';
}

// Soumettre un avis
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewName').value.trim();
            const enterprise = document.getElementById('reviewEnterprise').value.trim();
            const text = document.getElementById('reviewText').value.trim();
            
            if (!name || !text || selectedRating === 0) {
                alert('Veuillez remplir tous les champs obligatoires et sélectionner une note.');
                return;
            }
            
            // Créer un nouvel avis
            const newReview = {
                name: name,
                enterprise: enterprise,
                text: text,
                rating: selectedRating
            };
            
            // Récupérer les avis existants
            let reviews = JSON.parse(localStorage.getItem('jivocy-reviews')) || initialReviews;
            
            // Ajouter le nouvel avis
            reviews.unshift(newReview);
            
            // Sauvegarder dans localStorage
            localStorage.setItem('jivocy-reviews', JSON.stringify(reviews));
            
            // Recharger les avis
            loadReviews();
            
            // Fermer le modal
            closeReviewForm();
            
            // Message de succès
            alert('Merci pour votre avis ! Il a été ajouté avec succès.');
        });
    }
});

// Fermer le modal en cliquant en dehors
window.addEventListener('click', function(event) {
    const modal = document.getElementById('reviewModal');
    if (event.target === modal) {
        closeReviewForm();
    }
});

// ===== FORMULAIRE DE CONTACT =====
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    
    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Message de succès
    alert('Votre message a été envoyé ! Nous vous recontacterons bientôt.');
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
}

// ===== ACTIONS RAPIDES =====
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function openWhatsApp() {
    window.open('https://wa.me/25377280023?text=Bonjour%20JIVOCY%20CLEAN%20SERVICE%2C%20je%20souhaite%20réserver%20un%20nettoyage', '_blank');
}

// ===== FONCTIONS UTILITAIRES =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

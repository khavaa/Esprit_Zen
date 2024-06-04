document.addEventListener('DOMContentLoaded', () => {
    // Attacher les écouteurs d'événements à chaque formulaire
    const registerForm = document.getElementById('registerForm');
    const appointmentForm = document.getElementById('appointmentForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) registerForm.addEventListener('submit', event => validateForm(event, registerForm));
    if (appointmentForm) appointmentForm.addEventListener('submit', event => validateForm(event, appointmentForm));
    if (loginForm) loginForm.addEventListener('submit', event => validateLoginForm(event, loginForm));
});

function validateForm(event, form) {
    event.preventDefault(); // Empêcher l'envoi du formulaire

    const inputs = form.querySelectorAll('input');
    let isValid = true;
    let isAllFilled = true; // Garder une trace si tous les champs sont remplis

    inputs.forEach(input => {
        const errorElement = document.getElementById(`${input.id}Error`);
        errorElement.textContent = ''; // Effacer les messages d'erreur précédents

        // Vérifications spécifiques aux champs
        if (input.name === 'password' && form.id === 'registerForm') {
            if (!validatePassword(input.value)) {
                errorElement.textContent = 'Le mot de passe doit comporter au moins 8 caractères et inclure un chiffre ou un caractère spécial.';
                isValid = false;
            }
        } else if (input.name === 'confPassword' && form.id === 'registerForm') {
            const password = form.querySelector('input[name="password"]').value;
            if (input.value !== password) {
                errorElement.textContent = 'Les mots de passe ne correspondent pas.';
                isValid = false;
            }
        } else if (input.type === 'email') {
            if (!validateEmail(input.value)) {
                errorElement.textContent = 'Email invalide.';
                isValid = false;
            }
        } else if (input.type === 'tel') {
            if (!validatePhone(input.value)) {
                errorElement.textContent = 'Numéro de téléphone invalide.';
                isValid = false;
            }
        } else if (input.type === 'checkbox' && input.name === 'cookies') {
            if (!input.checked) {
                errorElement.textContent = 'Vous devez accepter la politique de confidentialité.';
                isValid = false;
            }
        }else if (input.value.trim() === '') {
            errorElement.textContent = 'Ce champ est requis.';
            isValid = false;
            isAllFilled = false; // Marquer qu'au moins un champ est vide
        } else if (input.hasAttribute('minlength') && input.value.length < input.getAttribute('minlength')) {
            errorElement.textContent = `Ce champ doit comporter au moins ${input.getAttribute('minlength')} caractères.`;
            isValid = false;
        }
    });

    const formErrorElement = document.getElementById(`${form.id}Error`);
    if (isValid) {
        form.submit(); // Envoyer le formulaire si toutes les validations sont passées
    } else {
        if (!isAllFilled) {
            formErrorElement.textContent = 'Tous les champs doivent être remplis.';
        } else {
            formErrorElement.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
        }
    }
}

function validateLoginForm(event, form) {
    event.preventDefault(); // Empêcher l'envoi du formulaire

    const inputs = form.querySelectorAll('input');
    let isValid = true;
    let isAllFilled = true; // Garder une trace si tous les champs sont remplis

    inputs.forEach(input => {
        const errorElement = document.getElementById(`${input.id}Error`);

        // Vérifications spécifiques aux champs du formulaire de connexion
        if (input.value.trim() === '') {
            errorElement.textContent = 'Ce champ est requis.';
            isValid = false;
            isAllFilled = false; // Marquer qu'au moins un champ est vide
        }
    });

    const formErrorElement = document.getElementById(`${form.id}Error`);
    if (isValid) {
        form.submit(); // Envoyer le formulaire si toutes les validations sont passées
    } else {
        if (!isAllFilled) {
            formErrorElement.textContent = 'Tous les champs doivent être remplis.';
        } else {
            formErrorElement.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
        }
    }
}

function validatePassword(password) {
    const re = /^(?=.*[!@#$%^&*]|.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return re.test(password);
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+?\d{1,3}[-.\s]?)?\d{9,10}$/;
    return re.test(phone);
}

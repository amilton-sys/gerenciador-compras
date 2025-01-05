export class Validator {
    static validateFields(fields) {
        let isValid = true;
        fields.forEach(({ field, message }) => {
            if (!field.value.trim()) {
                Validator.showError(field, message);
                isValid = false;
            } else {
                Validator.clearError(field);
            }
        });
        return isValid;
    }

    static showError(field, message) {
        let error = field.nextElementSibling;
        if (!error || !error.classList.contains("erro")) {
            error = document.createElement("p");
            error.classList.add("erro");
            field.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    static clearError(field) {
        const error = field.nextElementSibling;
        if (error && error.classList.contains("erro")) {
            error.textContent = "";
        }
    }
}

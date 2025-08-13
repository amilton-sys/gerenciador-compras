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
        if (!error || !error.classList.contains("text-danger") || !field.classList.contains("is-invalid")) {
            error = document.createElement("p");
            error.classList.add("text-danger");
            field.classList.add("is-invalid");
            field.parentNode.insertBefore(error, field.nextSibling);
        }
        error.textContent = message;
    }

    static clearError(field) {
        const error = field.nextElementSibling;
        if (error && error.classList.contains("text-danger")) {
            error.textContent = "";
            field.classList.remove("is-invalid");
        }
    }
}

class ToastGenerator {
    constructor(message) {
        this.message = message;
        this.toastContainer = document.getElementById('toast-container');
    }

    showToast() {
        this.toastContainer.innerHTML = this.message.message;
        this.toastContainer.style.display = 'block';
        if (this.message.status === "success") {
            this.toastContainer.classList.add('bg-success');
        } else if (this.message.status === "error") {
            this.toastContainer.classList.add('bg-danger');
        }
        setTimeout(() => {
            this.closeToast();
            this.toastContainer.classList.remove('bg-success');
            this.toastContainer.classList.remove('bg-danger');
        }, 2000);

        if (this.message.url) {
            window.location = this.message.url
        }
    }

    closeToast() {
        this.toastContainer.style.display = 'none';
    }
}

function generateToast(message) {
    const toast = new ToastGenerator(message);
    toast.showToast();
}

class ValidateInputs {
    constructor() {
        
    }

    validateVideoInput(inputValue) {
        if(Array.isArray(inputValue)) {
            inputValue.forEach(function(value) {
                if (value.type !== "video/mp4" && value.type !== "video/mpeg") {
                    return { state: false, message: "Invalid video input value" };
                }
            });
        }else {
            if (inputValue.type !== "video/mp4" && inputValue.type !== "video/mpeg") {
                return { state: false, message: "Invalid video input value" };
            }
        }

        return { state: true, message: null };
    }
 
    validatePotraitImageInput(inputValue) {
        const imageInput = inputValue;

        if (imageInput.files.length > 0) {
            const selectedImage = imageInput.files[0];

            // Create an HTMLImageElement to read the image dimensions
            const img = new Image();
            img.src = URL.createObjectURL(selectedImage);

            img.onload = function () {
                const width = this.width;
                const height = this.height;

                // Define a threshold ratio for portrait orientation
                const portraitThreshold = 1.5;

                // Check if the image has a portrait orientation
                const isPortrait = width / height < portraitThreshold;

                if (isPortrait) {
                    validationMessage.innerText = ''; // Reset validation message if image is valid
                } else {
                    validationMessage.innerText = 'Please select a portrait image.';
                    imageInput.value = ''; // Clear the input field
                }
            };
        }
    }

    validateLandscapeImageInput(inputValue) {
        const imageInput = inputValue;

        const selectedImage = imageInput;

        // Create an HTMLImageElement to read the image dimensions
        const img = new Image();
        img.src = URL.createObjectURL(selectedImage);

        img.onload = function () {
            const width = this.width;
            const height = this.height;

            // Define a threshold ratio for portrait orientation
            const landScapeThreshold = 0.7;

            // Check if the image has a portrait orientation
            const isPortrait = width / height < landScapeThreshold;

            if (isPortrait) {
                validationMessage.innerText = ''; // Reset validation message if image is valid
            } else {
                validationMessage.innerText = 'Please select a portrait image.';
                imageInput.value = ''; // Clear the input field
            }
        };
    }

    validateEmailInput(inputValue) {

    }

    validateTextInput(inputValue) {
        const titleInput = inputValue

        const title = titleInput.trim();

        // Check if the title is not empty
        if (title === '') {
            return { state: false, message: "Input Field Cannot Be Empty" };
        }

        // Add additional validation rules as needed
        // Example: Check if the title contains only alphanumeric characters and spaces
        const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
        if (!alphanumericRegex.test(title)) {
            return { state: false, message: 'Title can only contain letters, numbers, and spaces.' };
        }

        return { state: true, message: null };
    }

    validateSqlInjection(inputValue) {
        const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'UNION', 'AND', 'OR', 'DROP', 'EXEC', '/*', '--'];

        // Convert the input to lowercase for case-insensitive matching
        const lowerInput = inputValue.toLowerCase();

        // Check if the input contains any SQL keywords or characters
        for (const keyword of sqlKeywords) {
            if (lowerInput.includes(keyword.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    validatePasswordInput(password) {
        // Define regex patterns for each requirement
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[!@#$%&-]/;

        // Check if the password meets all requirements
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasDigit = digitRegex.test(password);
        const hasSpecialChar = specialCharRegex.test(password);

        // Return true if all conditions are met, otherwise false
        return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
    }

    validate(inputValue, inputType) {
        this.inputValue = inputValue;
        this.inputType = inputType;
        if (this.inputType === "text") {
            return this.validateTextInput(this.inputValue);
        }

        if (this.inputType === "email") {
            return this.validateEmailInput(this.inputValue);
        }

        if (this.inputType === "potriatPhoto") {
            return this.validatePotraitImageInput(this.inputValue);
        }

        if (this.inputType === "landscapePhoto") {
            return this.validateLandscapeImageInput(this.inputValue);
        }

        if (this.inputType === "password") {
            return this.validatePasswordInput(this.inputValue);
        }

        if (this.inputType === "video") {
            return this.validateVideoInput(this.inputValue);
        }

        if (this.inputType === "sqlInjection") {
            return this.validateSqlInjection(this.inputValue);
        }
    }
}
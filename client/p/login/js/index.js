class Login {
    static loginForm = document.querySelector('#login')
    static signUpForm = document.querySelector('#signup')

    static start() {
        let loginBtn = document.querySelector('#loginBtn');
        let signUpBtn = document.querySelector('#signUpBtn');

        loginBtn.addEventListener('click', Login.loginFunction)

        signUpBtn.addEventListener('click', Login.signUpFunction)

        let form_login = document.querySelector('#login_form');
        form_login.addEventListener('submit', (e) => {
            Login.submitLogin(e)
        })

        let form_signup = document.querySelector('#signup_form');
        form_signup.addEventListener('submit', (e) => {
            Login.submitSignup(e)
        })
    }

    static init() {
        if (Login.signUpForm.getAttribute('isEnabled') === "false" && Login.loginForm.getAttribute('isEnabled') === "true") {
            Login.loginForm.classList.remove('d-none')
            Login.loginForm.classList.add('d-flex')
            Login.signUpForm.classList.remove('d-flex')
            Login.signUpForm.classList.add('d-none')
        } else if (Login.signUpForm.getAttribute('isEnabled') === "true" && Login.loginForm.getAttribute('isEnabled') === "false") {
            Login.signUpForm.classList.remove('d-none')
            Login.signUpForm.classList.add('d-flex')
            Login.loginForm.classList.remove('d-flex')
            Login.loginForm.classList.add('d-none')
        }
    }

    static tab() {
        return location.href.split("?p=")[1]
    }

    static load() {
        if (Login.tab() === "" || Login.tab() === "login") {
            return Login.loginFunction()
        } else {
            return Login.signUpFunction()
        }
    }

    static loginFunction() {
        Login.loginForm.setAttribute('isEnabled', "true");
        Login.signUpForm.setAttribute('isEnabled', "false");

        loginBtn.classList.remove('text-black')
        loginBtn.classList.add('bg-dark')
        loginBtn.classList.add('tet-white-50');

        signUpBtn.classList.add('text-black')
        signUpBtn.classList.remove('bg-dark')
        signUpBtn.classList.remove('tet-white-50');

        Login.init();
    }

    static signUpFunction() {
        Login.loginForm.setAttribute('isEnabled', "false");
        Login.signUpForm.setAttribute('isEnabled', "true");

        signUpBtn.classList.remove('text-black')
        signUpBtn.classList.add('bg-dark')
        signUpBtn.classList.add('tet-white-50');

        loginBtn.classList.add('text-black')
        loginBtn.classList.remove('bg-dark')
        loginBtn.classList.remove('tet-white-50');

        Login.init();
    }

    static async submitLogin(e) {
        e.preventDefault();

        let formData = new FormData(document.querySelector('div#login form'))

        await login(formData)
    }

    static async submitSignup(e) {
        e.preventDefault();

        let formData = new FormData(document.querySelector('div#signup form'))

        if (formData.get('password') === formData.get('confPassword')) {
            await signUp(formData)
        }else{
            generateToast({
                message: "Passwords don't match",
                status: "error"
            })
        }
    }
}

Login.init();
Login.load();
Login.start();
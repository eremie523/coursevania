async function signUp(formData) {
    const response = await fetch("http://localhost:4000/auth/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('firstName') + " " + formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            phoneNumber: formData.get('pnum'),
            role: formData.get('category')
        }),
        credentials: 'include',
    }).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
            const err = await response.json()

            if (JSON.parse(err)) {
                throw new Error(JSON.parse(err).message)
            }

            throw new Error(err)
        }

        return response.json()
    }).then((response) => {
        generateToast({ message: JSON.parse(response).message, status: "success", url: "./?p=login" })
    }).catch((error) => {
        generateToast({ message: error, status: "error" })
    });

    return response;
}

async function login(formData) {
    const response = fetch("http://localhost:4000/auth", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
        credentials: 'include',
    }).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
            const err = await response.json()

            if (JSON.parse(err)) {
                throw new Error(JSON.parse(err).message)
            }

            throw new Error(err)
        }

        return response.json()
    }).then((response) => {
        generateToast({ message: JSON.parse(response).message, status: "success", url: "../home/" })
    }).catch((error) => {
        generateToast({ message: error, status: "error" })
    });

    return response;
}

async function uploadCourse(formData) {
    fetch("http://localhost:4000/uploadCourses", {
        method: 'POST',
        body: formData,
        credentials: 'include',
    }).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
            const err = await response.json()

            if (JSON.parse(err)) {
                throw new Error(JSON.parse(err).message)
            }

            throw new Error(err)
        }

        return response.json()
    }).then((response) => {
        generateToast({ message: JSON.parse(response).message, status: "success", url: "../home/" })
    }).catch((error) => {
        generateToast({ message: error, status: "error" })
    });
}

async function fetchAllCourses() {
    let resp = await fetch('http://localhost:4000/courses', {
        method: "GET",
        credentials: "include"
    })

    if(resp.status === 200) {
        let resp1 = await resp.json()
        return resp1;  
    }else{
        await resp.json().then((response) => {
            generateToast({status: "error", message: response})
        });
    }
}
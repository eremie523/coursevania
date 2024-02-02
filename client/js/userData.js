async function loadData() {
    let user = await fetchUser();
    if(location.href.split("?")[0] !== "http://localhost/coursevania/client/p/create/" ){
        document.getElementById("nav").innerHTML = `<div class="container-fluid justify-content-between ">
            <a class="navbar-brand" href="#">
                <img src="../../../assets/Screenshot 2024-01-19 210638.png" alt="logo">
            </a>
            <button class="navbar-toggler border-0 accent-text" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon accent-text"></span>
            </button>
            <div class="navbar-collapse flex-grow-0 px-4 collapse" id="navbarNav">
                <ul class="align-items-center fs-5 fw-medium gap-2 justify-content-center navbar-nav">
                    <li class="nav-item px-4 py-1">
                        <a class="nav-link active text-white" aria-current="page" href="../home/">Home</a>
                    </li>
                    ${
                        user ? `<li class="nav-item px-4 py-1">
                        <a class="nav-link text-white" href="#">${user.email}</a>
                    </li><li class="nav-item px-4 py-1">
                        <a class="nav-link text-white" href="../create">Create</a>
                    </li>` : 
                    `
                        <li class="accent-bg nav-item px-4 py-1 rounded-pill text-center w-100">
                            <a class="nav-link text-white" href="../login/?p=login"><button class="bg-transparent border-0 fw-medium text-white"><i></i>Login</button></a>
                        </li>`
                    }
                </ul>
            </div>
        </div>`
    }else{
        if(!user){
            window.location = "../login"
        }else{
            document.getElementById("nav").innerHTML = `<div class="container-fluid justify-content-between ">
            <a class="navbar-brand" href="#">
                <img src="../../../assets/Screenshot 2024-01-19 210638.png" alt="logo">
            </a>
            <button class="navbar-toggler border-0 accent-text" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon accent-text"></span>
            </button>
            <div class="navbar-collapse flex-grow-0 px-4 collapse" id="navbarNav">
                <ul class="align-items-center fs-5 fw-medium gap-2 justify-content-center navbar-nav">
                    <li class="nav-item px-4 py-1">
                        <a class="nav-link active text-white" aria-current="page" href="../home/">Home</a>
                    </li>
                    ${
                        user ? `<li class="nav-item px-4 py-1">
                        <a class="nav-link text-white" href="#">${user.email}</a>
                    </li><li class="nav-item px-4 py-1">
                        <a class="nav-link text-white" href="../create">Create</a>
                    </li>` : 
                    `
                        <li class="accent-bg nav-item px-4 py-1 rounded-pill text-center w-100">
                            <a class="nav-link text-white" href="../login/?p=login"><button class="bg-transparent border-0 fw-medium text-white"><i></i>Login</button></a>
                        </li>`
                    }
                </ul>
            </div>
        </div>`
        }
    }
}
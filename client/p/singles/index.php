<!DOCTYPE html>
<html lang="en">

<head>
    <?php include_once "../../components/dependencies.php" ?>
    <meta name="data" content="<?php echo str_replace("\"", "'", str_replace("%20", " ", str_replace("%22", "\"", explode("?p=", $_SERVER["REQUEST_URI"])[1]))) ?>">
    <style>
        .banner {
            height: 400px;
            background-attachment: fixed;
            background-color: no-repeat;
            background-clip: cover;
            background-size: 100%;
        }
    </style>
</head>

<body class="m-0 p-0 ">
    <main>
        <?php include_once "../../components/topNav.php" ?>
        <section class="content mt-5">
            <div class="container-fluid">
                <div class="row w-100">
                    <div class="col-md-7 overflow-hidden">
                        <div class="px-0 overflow-overflow-hidden object-fit-cover position-relative banner d-flex justify-content-end align-items-end" id="banner">
                            <div class="position-absolute w-100 h-100" style="background: linear-gradient(45deg, rgba(0,0,0,0), #000) "></div>
                            <div class="position-relative py-5 z-1 text-white px-3">
                                <h3 class="border-bottom border-2 border-white pe-5 m-0 ps-1 fw-bold">Arts $ Creativity</h3>
                                <p class="m-0 text-white-50 fw-bold">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                            </div>
                        </div>
                        <div class="videos pt-2 border-top my-2 border-secondary d-flex flex-column gap-2" id="courses">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="px-5 pt-4">
                            <div class="mt-5 border-bottom border-secondary">
                                <h3>Suggested Courses</h3>
                                <p class="text-secondary">Suggested courses proven to be related to this course via our filter algorithm</p>
                            </div>
                            <div id="suggestedCourses" class="d-flex flex-column gap-2 py-2">
                                <div class="d-flex gap-2">
                                    <div class="py-3">
                                        <p class="fw-bold">1.</p>
                                    </div>
                                    <div class="row flex-grow-1 align-items-center">
                                        <div class="pe-2 col-3">
                                            <div class="w-100 rounded-0 overflow-hidden object-fit-cover bg-black">
                                                <img class="w-100" src="../../../assets//uploads//app-def-1.jpg"></video>
                                            </div>
                                        </div>
                                        <div class="ps-2 col-9">
                                            <div class="d-flex justify-content-between gap-1 align-items-baseline">
                                                <h3 class="text-secondary h5 m-0">First Course</h3>
                                                <span class="h6">Eremie Johnson</span>
                                            </div>
                                            <p class="h6">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex gap-2">
                                    <div class="py-3">
                                        <p class="fw-bold">1.</p>
                                    </div>
                                    <div class="row flex-grow-1 align-items-center">
                                        <div class="pe-2 col-3">
                                            <div class="w-100 rounded-0 overflow-hidden object-fit-cover bg-black">
                                                <img class="w-100" src="../../../assets//uploads//app-def-1.jpg"></video>
                                            </div>
                                        </div>
                                        <div class="ps-2 col-9">
                                            <div class="d-flex justify-content-between gap-1 align-items-baseline">
                                                <h3 class="text-secondary h5 m-0">Second Course</h3>
                                                <span class="h6">Eremie Johnson</span>
                                            </div>
                                            <p class="h6">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        let data = document.querySelector("meta[name=data]").getAttribute("content");
        const course = JSON.parse(data.replaceAll("'", "\""))

        let courseElement = document.querySelector("div#banner")

        courseElement.style.backgroundImage = `url("../../../assets/uploads/${course.banner}")`

        courseElement.querySelector("div > h3").innerHTML = `${course.name}`
        courseElement.querySelector("div > p").innerHTML = `${course.desc}`

        let courseSubVideoElement = document.querySelector("div#courses")
        course.videoUrls.forEach((video, index) => {
            let wrapper = document.createElement("div");
            wrapper.classList.value = "d-flex gap-1 flex-row"
            let content = `<div class="py-3"><p class="fw-bold">${index+1}.</p></div> <div class="row flex-grow-1 align-items-center"><div class="pe-2 col-3"><div class="w-100 rounded-4 overflow-hidden object-fit-cover bg-black"><video class="w-100" src="../../../assets/uploads/${video}" poster="../../../assets//uploads//${course.banner}"></video></div></div><div class="ps-2 col-9"><h3 class="text-secondary h4 m-0">${course.subDescriptions[index].title}</h3><p class="h6 m-0">${course.subDescriptions[index].desc}</p></div></div>`
            wrapper.innerHTML = content;
            courseSubVideoElement.appendChild(wrapper);
        });
    </script>
</body>

</html>
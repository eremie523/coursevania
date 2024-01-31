class FetchCourses {
    static courses
    static async init() {
        await FetchCourses.fetch();
        if(Array.isArray(FetchCourses.courses)){
            FetchCourses.element().innerHTML = "";
            FetchCourses.courses.forEach((course) => {
                let cover = document.createElement('div');
                cover.classList.value = "col-lg-3 col-md-4 col-sm-6 col-12 p-2 overflow-hidden h-100"
                let div = `<div class="w-100 p-0 bg-black"><div class="w-100 object-fit-cover position-relative" style="height: 23vw !important"><img src="../../../assets/uploads/${course.banner}" alt="${course.name}" class="w-100 h-100 object-fit-cover"><div class="position-absolute top-0 start-0 m-3"><button class="accent-bg px-4 py-2 rounded-pill text-white border-0"><span class="fw-semibold">Price: </span>${course.price}</button></div></div><div class="p-4 pb-2" style="background-color: #ccceee"><h3>${course.name}</h3><p class="text-secondary">${course.desc}</p><div class="accent-text fw-bold"><span class="fs-6">120</span><span class="fs-5">Students</span></div></div><div class="overflow-hidden text-wrap px-3 py-1 pb-3" style="background-color: #ccceee"><div class="d-flex flex-column "><div class="d-flex align-items-center gap-2"><img src="../../../assets/landing_bg1.png" alt="" style="width: 80px; height: 80px; object-fit: cover" class="rounded-circle"><p class="m-0 fw-medium fs-6 text-wrap ">${course.owner}</p></div></div></div></div>`
                cover.innerHTML = div;
                FetchCourses.element().appendChild(cover);
            })
        }else {
            FetchCourses.element().innerHTML = "No courses found"
        }
    }
 
    static async fetch() {
        let resp = await fetchAllCourses();
        if(resp){
            FetchCourses.courses = JSON.parse(resp);
        }
    }

    static element() {
        return document.getElementById("courses");
    }
}

FetchCourses.init();
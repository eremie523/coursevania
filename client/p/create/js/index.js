class Create {
    static videes = 1;

    static validate;

    static validator() {
        if(Create.validate == null) {
            Create.validate = new ValidateInputs();    
        }
        return Create.validate
    }
 
    static mapper(id) {
        let mapped = "#"
        id.split("-").forEach((segment) => {
            mapped += segment.charAt(0).toLowerCase()
        })
        return mapped
    }

    static validateOnSubmit(courseVideo, courseTitle, courseDescription) {
        let v = () => {
            let msg = courseVideo;
            if(msg.files[0]){
                document.querySelector("#"+courseVideo.id+" ~ div").innerHTML= msg.files[0].name;
            }else{
                document.querySelector("#"+courseVideo.id+" ~ div").innerHTML= "No file Chosen";
                generateToast({status: "error", message: "Please fill all video inputs"});
                return false;
            }

            return true;
        }

        let t = () => {
            let val = document.getElementById(courseTitle.id).value;

            let validationMessage = Create.mapper(courseTitle.id)

            console.log(validationMessage) 

            if(Array.isArray(val)){

            }else{
                if(!((Create.validator().validate(val, "text")).state)){
                    document.querySelector(validationMessage).innerHTML = (Create.validator().validate(val, "text")).message
                }else{
                    document.querySelector(validationMessage).innerHTML = ""
                } 
            }
           return (Create.validator().validate(val, "text")).state
        }

        let d = () => {
            let val = document.getElementById(courseDescription.id).value;

            let validationMessage = Create.mapper(courseDescription.id)

            console.log(validationMessage) 

            if(Array.isArray(val)){

            }else{
                if(!((Create.validator().validate(val, "text")).state)){
                    document.querySelector(validationMessage).innerHTML = (Create.validator().validate(val, "text")).message
                }else{
                    document.querySelector(validationMessage).innerHTML = ""
                } 
            }
           return (Create.validator().validate(val, "text")).state
        }

        return v() && t() && d()
    }
    
    static validateSubCourseVideos(courseVideo, courseTitle, courseDescription) {

        courseVideo.addEventListener("change", () => {
            let val = document.querySelector('#'+courseVideo.id).files[0];  

            let msg = val.name
            if(msg.trim() !== ""){
                document.querySelector("#"+courseVideo.id+" ~ div").innerHTML = val.name;
            }else{
                document.querySelector("#"+courseVideo.id+" ~ div").innerHTML= "No file Chosen";
                generateToast({status: "error", message: "Please fill all video inputs"});
                return false;
            }
        }) 

        courseTitle.addEventListener("blur", () => {
            let val =document.getElementById(courseTitle.id).value;

            let validationMessage = Create.mapper(courseTitle.id)

            console.log(validationMessage) 

            if(Array.isArray(val)){

            }else{
                if(!((Create.validator().validate(val, "text")).state)){
                    document.querySelector(validationMessage).innerHTML = (Create.validator().validate(val, "text")).message
                }else{
                    document.querySelector(validationMessage).innerHTML = ""
                } 
            }
        });

        courseDescription.addEventListener("blur", () => {
            let val =document.getElementById(courseDescription.id).value;

            let validationMessage = Create.mapper(courseDescription.id)

            console.log(validationMessage) 

            if(Array.isArray(val)){

            }else{
                if(!((Create.validator().validate(val, "text")).state)){
                    document.querySelector(validationMessage).innerHTML = (Create.validator().validate(val, "text")).message
                }else{
                    document.querySelector(validationMessage).innerHTML = ""
                } 
            }
        });
    }

    setInactive(forms) {
        forms = document.querySelectorAll(forms)
        forms.forEach((form) => {
            form.setAttribute("isActive", false)
            form.classList.add("d-none")
        })
        return forms.length;
    }

    setActive(form) {
        form = document.querySelector(form)
        form.setAttribute("isActive", true)
        form.classList.remove("d-none")
        console.log("loaded");
    }

    load(target = "") {
        if (target === "") {
            this.setInactive("form#coverForm > div")
            this.setActive("div#c-cnc-f")
        } else {
            if (target === "c-csv-f") {
                let formData = new FormData(document.querySelector("form#coverForm"));
                let courseBanner = formData.get("course_banner");
                let courseDescription = formData.get("course_description");
                let courseTitle = formData.get("course_title");

                console.log({
                    courseBanner,
                    courseDescription,
                    courseTitle
                });

                if(!((Create.validator().validate(courseTitle, "text")).state)){
                    document.querySelector("#vct").innerHTML = (Create.validator().validate(courseTitle, "text")).message
                }

                if(!((Create.validator().validate(courseDescription, "text")).state)){
                    document.querySelector("#vcd").innerHTML = (Create.validator().validate(courseDescription, "text")).message
                }

                let val = ((Create.validator().validate(courseTitle, "text")).state&& (Create.validator().validate(courseDescription, "text")).state);
                if(val){
                    this.setInactive("form#coverForm > div")
                    document.querySelectorAll("div#" + target + " div#add").forEach((addBtn) => {
                        addBtn.addEventListener("click", this.handleAddVideo)
                    })
                    this.setActive("div#" + target)
                }
            }else{
                this.setInactive("form#coverForm > div")
                this.setActive("div#" + target)
            }
        }
        this.handleFormSwitches()
    }

    init() {
        this.load()
        this.validateCourseCover()
        let fsv = document.querySelector("#course-sub-video-1")
        let fsct = document.querySelector("#course-sub-title-1")
        let fscd = document.querySelector("#course-sub-desc-1")
        Create.validateSubCourseVideos(fsv, fsct, fscd)
        document.querySelector("#c-csv-f button[type=submit]").addEventListener("click", (e) => {
            Create.handleSubmit(e)
        })
    }

    handleFormSwitches() {
        this.formCsv = document.querySelector("div#c-csv-f");
        this.formCnc = document.querySelector("div#c-cnc-f");

        this.formCsv.querySelector('div#backward').addEventListener("click", () => {
            this.load("c-cnc-f");
        });

        this.formCnc.querySelector('div#forward').addEventListener('click', () => {
            this.load("c-csv-f")
        });
    }

    handleAddVideo() {
        Create.videes++;
        let newVideoForm = document.createElement("div")
        newVideoForm.classList.value = "bg-white border border-secondary-subtle border-2 p-0 rounded-3 shadow"
        newVideoForm.id = "c-csv-f-" + (1 + Create.videes)

        let content = document.createElement("div")
        content.classList.value = "p-3"

        let controls = document.createElement("div")
        controls.classList.value = "d-flex flex-row gap-2 align-items-center justify-content-end fs-6"

        let btns = (i, id, parentID) => {
            let wrapper = document.createElement("div")
            wrapper.id = id
            wrapper.classList.value = "icon-width icon-height fs-6 text-white rounded-circle bg-dark d-flex justify-content-center align-items-center"

            let ico = document.createElement("i")
            ico.classList.value = "fa " + i

            wrapper.appendChild(ico)
            wrapper.addEventListener("click", () => {
                document.querySelector("div#c-csv-f").removeChild(document.querySelector("div#"+parentID))
                document.querySelector("div#c-csv-f").querySelectorAll("button[type=submit]")[(document.querySelector("div#c-csv-f").querySelectorAll("button[type=submit]").length) - 1].classList.remove("d-none")
                Create.videes--
            })
            return wrapper
        }

        controls.appendChild(btns("fa-minus", Create.videes, newVideoForm.id));

        content.appendChild(controls);

        newVideoForm.appendChild(content);

        let mediaPlaceholder = document.createElement("div");
        mediaPlaceholder.classList.value = "w-100 mb-4"

        let labelCover = document.createElement("label");
        labelCover.classList.value = "w-100 img-selector"
        labelCover.for = "course-video-" + Create.videes

        let label = document.createElement("h3");
        label.classList.value = "form-label fs-6"
        label.innerHTML = "Course Sub Video " + Create.videes;

        let inputCover = document.createElement("div");
        inputCover.classList.value = "media-content-placeholder bg-secondary-subtle w-100 rounded-2 position-relative shadow-sm"

        let input = document.createElement("input");
        input.type = "file";
        input.id = "course-sub-video-" + Create.videes;
        input.accept = "video/mp4";
        input.name = "course_sub_videos";

        let ico = document.createElement("i");
        ico.classList.value = "fa fa-video fs-4"

        let curVideo = document.createElement("div");
        curVideo.innerHTML = "No video selected";
        curVideo.classList.value = "bg-white bottom-0 end-0 fw-bold h6 m-3 p-3 position-absolute rounded-pill shadow"

        inputCover.appendChild(input);
        inputCover.appendChild(ico);
        inputCover.appendChild(curVideo);

        labelCover.appendChild(label);
        labelCover.appendChild(inputCover);

        mediaPlaceholder.appendChild(labelCover);

        content.appendChild(mediaPlaceholder);

        let inputGen = (name, labelVal, type) => {
            let cover = document.createElement('div');
            cover.classList.value = "mb-4"

            let label = document.createElement('label');
            label.classList.value = "form-label fw-semibold"
            label.setAttribute('for', name.trim());
            label.innerHTML = labelVal.trim();

            let input = document.createElement('input');
            input.id = name.trim();
            input.classList.value = "form-control rounded-0"
            input.setAttribute("required", true);
            input.name = input.id.replaceAll("-", "_");
            if (type) {
                input.type = type
            } else {
                input.type = "text";
            }

            let validationMessage = document.createElement('small');
            validationMessage.classList.value = "text-danger";
            validationMessage.id = Create.mapper(name.trim()).replace("#", "");

            cover.appendChild(label);
            cover.appendChild(input);
            cover.appendChild(validationMessage);

            return cover;
        }

        content.appendChild(inputGen("course-sub-title-"+Create.videes, "Course Sub Title"));
        content.appendChild(inputGen("course-sub-desc-"+Create.videes, "Course Sub Description"));

        let submit = document.createElement("div");

        let submitContent = document.createElement("button");
        submitContent.type = "submit";
        submitContent.classList.value = "accent-bg border-0 w-100 py-2 px-4 rounded-2 fw-medium text-white btn"
        submitContent.innerHTML = "Submit";
        submitContent.addEventListener("click", (e) => {
            Create.handleSubmit(e)
        })

        submit.appendChild(submitContent);

        content.appendChild(submit);

        document.querySelector("div#c-csv-f").appendChild(newVideoForm)

        Create.validateSubCourseVideos(document.querySelector("#course-sub-video-" + Create.videes), document.querySelector("#course-sub-title-"+Create.videes), document.querySelector("#course-sub-desc-"+Create.videes))

        document.querySelector("div#c-csv-f").querySelectorAll("button[type=submit]").forEach((div) => {
            div.classList.add("d-none");
        })

        document.querySelector("div#c-csv-f").querySelectorAll("button[type=submit]")[(document.querySelector("div#c-csv-f").querySelectorAll("button[type=submit]").length) - 1].classList.remove("d-none")
        
    }

    validateCourseCover() {
        document.querySelector("#course-banner").addEventListener("change", () => {
            let val = document.getElementById("course-banner").files;

            console.log("validating "+val);
        });
        document.querySelector("#course-title").addEventListener("blur", () => {
            let val = document.getElementById("course-title").value;

            if(!((Create.validator().validate(val, "text")).state)){
                document.querySelector("#vct").innerHTML = (Create.validator().validate(val, "text")).message
            }else{
                document.querySelector("#vct").innerHTML = ""
            }
        });
        document.querySelector("#course-description").addEventListener("blur", () => {
            let val = document.getElementById("course-description").value;

            if(!((Create.validator().validate(val, "text")).state)){
                document.querySelector("#vcd").innerHTML = (Create.validator().validate(val, "text")).message
            }else{
                document.querySelector("#vcd").innerHTML = ""
            }
        });

        document.querySelector("#next").addEventListener("click", () => {
            this.load("c-csv-f")
        });
    }

    static async handleSubmit(e) {
        e.preventDefault();

        let nosv = document.querySelectorAll("div#c-csv-f > div").length

        const valid = {
            val: true,
        }

        for(let i = 1; i <= nosv; i++) {
            let csv = document.querySelector("#course-sub-video-"+i);
            let cst = document.querySelector("#course-sub-title-"+i);
            let csd = document.querySelector("#course-sub-desc-"+i);
            if(!Create.validateOnSubmit(csv, cst, csd)){
                valid.val = false;
                break;
            }
        }

        if(valid.val){ 
            let data = new FormData(document.querySelector('#coverForm'));  
            data.append("count", nosv)

            console.log(data.get('course_sub_videos'));

            await uploadCourse(data)
        }
    }
    
}

var create = new Create();
create.init();
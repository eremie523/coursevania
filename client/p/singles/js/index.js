class Load {
    static data;

    static init() {
        Load.decodeUrl();
        Load.banner();
        Load.videos();
    }

    static decodeUrl() {
        let data = location.href.split('?p=')[1];
        Load.data = JSON.parse(data.replaceAll("%22", "\"").replaceAll("%20", " "));
    }

    static banner() {
        document.getElementById('bannerCover').innerHTML = `<div class="align-items-center container d-flex flex-column h-100 justify-content-center px-5" style="height: 100% !important;">
            <div class="bg-white h-75 overflow-hidden position-relative rounded-5 w-100" id="banner" style="background-image: url(&quot;../../../assets/uploads/${Load.data.banner}&quot;);">
                <div class="bg-dark h-100 opacity-50 position-absolute top-0 w-100">

                </div>
                <div class="border border-secondary bottom-0 end-0 mx-3 my-4 position-absolute px-3 py-2 py-3 rounded">
                    <div class="border-bottom text-white my-1">
                        <h3 class="h4 m-0">Course Name</h3>
                        <p class="fw-normal h5">Course description</p>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="object-fit-cover overflow-hidden rounded-circle" style="width: 80px;height: 80px;">
                            <img src="../../../assets/uploads/${Load.data.banner}" class="h-100 object-fit-cover w-100">
                        </div>
                        <div class="align-items-end d-flex gap-4 justify-content-between">
                            <div>
                                <h4 class="accent-text h6 m-0">reremie523@gmail.com</h4>
                                <p class="m-0 text-white">Administrator</p>
                            </div>

                            <div class="h6 text-white-50">A Year Ago</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>`;
    }

    static videos() {
        let VideoCover = document.createElement('div');
        VideoCover.classList.value = "d-flex flex-column gap-3"

        Load.data.videoUrls.forEach((element, index) => {
            console.log(Load.data.subDescriptions[index].title);
            let div = document.createElement('div');
            div.classList.value = "w-100 p-0 m-0";
            div.innerHTML = `<div class="border border-white d-flex gap-2 p-2">
                <div class="object-fit-cover overflow-hidden rounded" style="width: 120px;height: 80px;">
                    <video src="../../../assets/uploads/${element}" class="h-100 object-fit-cover w-100"></video>
                </div>
                <div class="align-items-end bg-secondary d-flex flex-grow-1 gap-4 justify-content-between p-3 rounded">
                    <div>
                        <h4 class="accent-text h5 m-0">${Load.data.subDescriptions[index].title}</h4>
                        <p class="m-0 text-white">${Load.data.subDescriptions[index].desc}</p>
                    </div>

                    <div class="h6 text-white-50">${Load.data.createdAt.split("T")[0]}</div>
                </div>
            </div>`;
            div.addEventListener("click", function (e) {
                e.preventDefault();

                window.location = "../videoPlayer/?p="+JSON.stringify({url: element, title: Load.data.subDescriptions[index].title, desc: Load.data.subDescriptions[index].desc});
            })
            VideoCover.appendChild(div)
        });

        document.getElementById('videos').appendChild(VideoCover);
    }
}

Load.init();
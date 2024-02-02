class Load {
    static data;

    static init() {
        Load.decodeUrl();
        Load.video();
    }

    static decodeUrl() {
        let data = location.href.split('?p=')[1];
        Load.data = JSON.parse(data.replaceAll("%22", "\"").replaceAll("%20", " "));
    }

    static video() {
        console.log(Load.data)
        document.getElementById('video').setAttribute('src', "../../../assets/uploads/"+Load.data.url);
        document.querySelector("div#desc > h3").innerHTML = Load.data.title
        document.querySelector("div#desc > p").innerHTML = Load.data.desc
    }
}

Load.init();
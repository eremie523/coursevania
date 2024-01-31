<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="post" method="post" id="form">
        <input type="file" name="file">
        <button type="submit"> SUBMIT </button>
    </form>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, hic.
    <script>
        document.querySelector('form#form').addEventListener('submit', function(e) {
            e.preventDefault();

            let formData = new FormData(document.querySelector('form#form'));

            formData.append("name", "John Smith");

            fetch("http://localhost:4000/uploadFile", {
                method: "POST",
                body: formData
            }).then(function(response) {
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error(response.text());
                }

                return response.json();
            }).then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.error(error);
            });
        });
    </script>
</body>

</html>
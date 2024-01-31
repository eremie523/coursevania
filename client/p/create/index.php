<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php require_once "../../components/dependencies.php" ?>
</head>

<body class="p-0 m-0 position-relative">
    <main class="m-0 p-0">
        <?php
        require_once "../../components/topNav.php"
        ?>
        <section class="container margin-top-nav p-0 p-1 pt-5 px-sm-5" id="content">
            <div id="toast-container"></div>
            <div class="container px-0 px-md-5">
                <form action="" method="post" id="coverForm" enctype="multipart/form-data">
                <div class="bg-white border border-secondary-subtle border-2 p-0 rounded shadow" id="c-cnc-f">
                    <div class="border-bottom border-light-subtle p-3 h5 d-flex flex-row justify-content-between align-items-center">
                        <div>Add New Course</div>
                        <div class="d-flex flex-row gap-2 align-items-center justify-content-center fs-6">
                            <div class="icon-width icon-height rounded-circle bg-secondary-subtle shadow-sm d-flex justify-content-center align-items-center" id="backward">
                                <i class="d-flex justify-content-center align-items-center rounded fa fa-arrow-left text-white fs-6 rounded-circle"></i>
                            </div>
                            <div class="icon-width icon-height rounded-circle bg-dark d-flex justify-content-center align-items-center"  id="forward">
                                <i class="d-flex justify-content-center align-items-center rounded fa fa-arrow-right bg-dark text-white fs-6 rounded-circle"></i>
                            </div>
                        </div>
                    </div>
                    <div class="p-3">
                        <div class="w-100 mb-4">
                            <label for="course-banner" class="w-100 img-selector">
                                <h3 class="form-label fs-6">Course Banner Image</h3>
                                <div class="media-content-placeholder bg-secondary-subtle w-100 rounded-2 position-relative shadow-sm">
                                    <input type="file" id="course-banner" name="course_banner">
                                    <i class="fa fa-image fs-4"></i>
                                </div>
                            </label>
                        </div>
                        <div class="mb-4">
                            <label for="course-title" class="form-label fw-semibold">Course Title</label>
                            <input type="text" class="form-control rounded-0" id="course-title" name="course_title" required>
                            <small id="vct" class="text-danger"></small>
                        </div>
                        <div class="mb-4">
                            <label for="course-title" class="form-label fw-semibold">Course Description</label>
                            <input type="text" class="form-control rounded-0" id="course-description" name="course_description" required>
                            <small id="vcd" class="text-danger"></small>
                        </div>
                        <div>
                            <button type="button" class="accent-bg border-0 w-100 py-2 px-4 rounded-2 fw-medium text-white btn" id="next">Next</button>
                        </div>
                    </div>
                </div>
                <div id="c-csv-f">
                    <div class="bg-white border border-secondary-subtle border-2 p-0 rounded-3 shadow" id="c-csv-f-1">
                        <div class="border-bottom border-light-subtle p-3 h5 d-flex flex-row justify-content-between align-items-center">
                            <div>Add Course Video</div>
                            <div class="d-flex flex-row gap-2 align-items-center justify-content-center fs-6">
                                <div class="icon-width icon-height rounded-circle bg-dark d-flex justify-content-center align-items-center" id="backward">
                                    <i class="d-flex justify-content-center align-items-center rounded fa fa-arrow-left bg-dark text-white fs-6 rounded-circle"></i>
                                </div>
                                <div class="icon-width icon-height rounded-circle bg-secondary-subtle d-flex justify-content-center align-items-center" id="forward">
                                    <i class="d-flex justify-content-center align-items-center rounded fa fa-arrow-right text-white fs-6 rounded-circle"></i>
                                </div>
                            </div>
                        </div>
                        <div class="p-3">
                            <div>
                                <div class="d-flex flex-row gap-2 align-items-center justify-content-between fs-6">
                                    <div class="d-flex flex-row gap-3">
                                        <div class="icon-width icon-height rounded-circle bg-dark d-flex justify-content-center align-items-center " id="add">
                                            <i class="d-flex justify-content-center align-items-center rounded fa fa-plus bg-dark text-white fs-6 rounded-circle"></i>
                                        </div>
                                        <div class="icon-width icon-height rounded-circle d-flex justify-content-center align-items-center me-5 bg-secondary-subtle">
                                            <i class="d-flex justify-content-center align-items-center rounded fa fa-minus text-white fs-6 rounded-circle"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 mb-4 mt-2">
                                <h3 class="form-label fs-6">Course Sub Video</h3>
                                <label for="course-sub-video-1" class="w-100 img-selector">
                                    <div class="media-content-placeholder bg-secondary-subtle w-100 rounded-2 position-relative shadow-sm">
                                        <input type="file" class="" id="course-sub-video-1" name="course_sub_videos" accept="video/mp4">
                                        <i class="fa fa-video fs-4"></i>
                                        <div class="bg-white bottom-0 end-0 fw-bold h6 m-3 p-3 position-absolute rounded-pill shadow">No Video Selected Yet</div>
                                    </div>
                                </label>
                            </div>
                            <div class="mb-4">
                                <label for="course-sub-title-1" class="form-label fw-semibold">Current Video Title</label>
                                <input type="text" class="form-control rounded-0" id="course-sub-title-1" name="course_sub_title_1" required>
                                <small id="cst1" class="text-danger"></small>
                            </div>
                            <div class="mb-4">
                                <label for="course-sub-desc-1" class="form-label fw-semibold">Current Video Description</label>
                                <input type="text" class="form-control rounded-0" id="course-sub-desc-1" name="course_sub_desc_1" required>
                                <small id="csd1" class="text-danger"></small>
                            </div>
                            <div>
                                <button type="submit" class="accent-bg border-0 w-100 py-2 px-4 rounded-2 fw-medium text-white btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </section>
    </main>
    <footer>
        <?php
        // require_once "../../components/topNav.php"
        ?>
    </footer>
</body>

</html>
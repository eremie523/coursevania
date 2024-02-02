const { Router } = require("express");
const { uploadCourse, fetchCourse, authUser } = require("../../controllers/userControllers");
const multer = require("multer");

const rootRouter = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../assets/uploads'); // Adjust the destination folder as needed
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

rootRouter.get('/', function (req, res) {
    res.send("Hello, world!")
})

rootRouter.get('/courses', fetchCourse)

rootRouter.post("/uploadCourses", authUser, upload.fields([{
  name: 'course_banner',
  maxCount: 1,
}, {
  name: 'course_sub_videos',
  maxCount: 20,
}]), uploadCourse)

module.exports = rootRouter;
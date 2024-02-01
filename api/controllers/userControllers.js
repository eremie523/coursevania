const bcryptjs = require("bcryptjs");
const User = require("../db/Models/Users");
const Course = require("../db/Models/Courses");


function login (req, res) {
  res.status(200).json(JSON.stringify({message: "User Logged In Success", status: "success/200", user: req.user}));
};

async function signUp(req, res) {
    try {
        const {
            email,
            password,
            name,
            phoneNumber,
            role
        } = req.body
        const ipAddress = req.clientIp;
        const deviceType = req.device.type;
        const deviceName = req.device.name;
    
        const newUser = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(password, 10), // You may adjust the salt rounds as needed
            phoneNumber: phoneNumber,
            role,
            courses: role === "instructor" ? [] : null,
            deviceName,
            deviceType,
            ipAddress
        });

        await newUser.save()

        res.status(201).json({
            message: "User saved successfully",
            status: "success",
            user: newUser
        })
    } catch (error) {
        console.log("Error: " + error)
        res.status(400).json({ error: error.message })
    }

}

async function uploadCourse(req, res) {
    try {
        const { course_banner, course_sub_videos } = req.files;
        const { course_title, course_description, price } = req.body;

        console.log(req.files)

        let subVideos = [];
        let subDescs = [];
        
        course_sub_videos.forEach(subVideo => {
            subVideos.push(subVideo.filename);
        })

        console.log(req.body);
        for(let i = 1; i <= req.body.count; i++) {
            subDescs.push({
                title: req.body["course_sub_title_" + i],
                desc: req.body["course_sub_desc_" + i],
            })
        }

        const owner = "reremie523@gmail.com"

        const newCourse = await Course.create({
            name: course_title,
            desc: course_description,
            banner: course_banner[0].filename,
            isFree: price ? false : true,
            price: price || "$0",
            videoUrls: subVideos,
            subDescriptions: subDescs,
            owner,
        })

        await newCourse.save()

        res.status(200).json(JSON.stringify({
            status: "success",
            message: "Course saved successfully",
            courses: newCourse
        }))
        
    } catch (error) {
        console.log(error)
        res.status(404).json(JSON.stringify({message: "Unable to Upload Course", status: "error" }))
    }
}

async function fetchCourse(req, res) {
    try {
        const courses = await Course.find({})
        console.log(courses)
        res.status(200).json(JSON.stringify(courses))
    } catch (error) {
        console.log(error);
        res.status(400).json(JSON.stringify({status: "error", message: error}))
    }
}

module.exports = {
    login,
    signUp,
    uploadCourse,
    fetchCourse
}

// function parseUserAgent(userAgent) {
//     // Add your logic to parse the user-agent string and extract relevant information
//     // This is a basic example, and you may need a more sophisticated approach for a real-world scenario
//     const parsedUserAgent = {
//       userAgent
//     };
  
//     // Add your parsing logic here based on the actual structure of user-agent strings

//     // const ipAddress = req.clientIp;
//     // const browser = {
//     //   name: req.useragent.browser,
//     //   version: req.useragent.version,
//     //   os: req.useragent.os,
//     //   platform: req.useragent.platform,
//     // };
//     // const deviceInfo = {
//     //   type: req.device.type,
//     //   name: req.device.name,
//     //   brand: req.device.manufacturer,
//     //   model: req.device.model,
//     // };
  
//     // const userData = {
//     //   ipAddress,
//     //   browser,
//     //   deviceInfo,
//     // };
  
//     // res.json(userData);
//     // req.json("Hey")

//     const ipAddress = req.ip; // Get the IP address from the request

//   const userAgent = req.headers['user-agent'];
//   const browserDetails = parseUserAgent(userAgent);

//   // Extract device information from other headers if available
//   const deviceInfo = {
//     type: req.headers['x-device-type'] || 'unknown',
//     name: req.headers['x-device-name'] || 'unknown',
//     brand: req.headers['x-device-brand'] || 'unknown',
//     model: req.headers['x-device-model'] || 'unknown',
//   };

//   const userData = {
//     ipAddress,
//     browserDetails,
//     deviceInfo,
//   };
  
//     return parsedUserAgent;
//   }
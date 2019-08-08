const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const uploadCloud = require("../config/cloudinary.js");

//create new project
router.post("/new-project", uploadCloud.single("image"), (req, res, next) => {
  let theImage;
  if (req.file) {
    theImage = req.file.url;
  } else {
    theImage =
      "https://www.artconnect.com/assets/default/default_project_list-7c7cb913cb130a76c51f21509f73bbb6.png";
  }
  Project.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.user._id,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    timeSpent: 0,
    complete: false,
    isPublic: req.body.isPublic,
    image: theImage
  })
    .then(singleProject => {
      res.json(singleProject);
    })
    .catch(err => {
      res.json(err);
    });
});

// // //get details of one project
// // router.get("/details/:id", (req, res, next) => {
// //   Project.findByOne(req.params.id)
// //     .then(singleProject => {
// //       res.json(singleProject);
// //     })
// //     .catch(err => {
// //       res.json(err);
// //     });
// // });

// //get all of the projects
router.get("/all-projects", (req, res, next) => {
  Project.find({ owner: req.user._id })
    .then(allProjects => {
      res.json(allProjects);
    })
    .catch(err => {
      res.json(err);
    });
});

//update project
router.post("/update/:id", uploadCloud.single("image"), (req, res, next) => {
  let updateData = {};

  updateData.name = req.body.name;
  updateData.description = req.body.description;
  updateData.owner = req.user._id;
  updateData.startDate = req.body.startDate;
  updateData.dueDate = req.body.dueDate;
  updateData.isPublic = req.body.isPublic;
  updateData.complete = req.body.complete;

  if (req.file) {
    updateData.image = req.file.url;
  }
  Project.findByIdAndUpdate(req.params.id, updateData)
    .then(singleProject => {
      res.json(singleProject);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .then(theProject => {
      Project.findByIdAndRemove(theProject._id)
        .then(singleProject => {
          res.json(singleProject);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;

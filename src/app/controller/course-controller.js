const courseSchema = require("../model/course-model");

exports.createCourse = async (req, res) => {
    try{
        const {
            courseName,
            type,
            duration,
            institutionType,
            recommendedTeacher,
          } = req.body;
        
          let courseId = 1;
          const courses = await courseSchema.find();
          if (courses.length) {
            const lastCourse = courses[courses.length - 1];
            courseId = lastCourse.courseId + 1;
          };
        
          const course = new courseSchema({
            courseId,
            courseName,
            type,
            duration,
            institutionType,
            recommendedTeacher,
          });
          const created = await course.save();
          res.status(200).json({
              course: created._doc,
              message: 'Course created successfully'
          })
          return;
    }
    catch (error) {
        res.status(500).json(error);
    }
  

};

exports.findAllCourses = async (req, res) => {
  try {
    let courses = [];
    const { institutionType } = req.query;
    if (institutionType) {
      courses = await courseSchema.find({institutionType: institutionType});
    }
    else{
      courses = await courseSchema.find();
    }    
    res.status(200).json({
      "statusmessage": "Successful",
      "statusCode": 1,
      "data": {
          "courseList": courses
      }
    })
  }
  catch (error) {
    res.status(500).json(error);
  }
}

// Update a course identified by the courseId in the request
exports.updateCourse = async(req, res) => {
  // TODO from below
    try{
        const { courseId } = req.query;
        const body = req.body;
        if (!courseId) {
            res.status(400).json({ message: "courseId is required" });
            return;
        }
        if (!body) {
            res.status(400).json({ message: "update fields are required" });
            return;
        }

        if (courseId) {
            const update = await courseSchema.findOneAndUpdate({ courseId: courseId}, {...body});
            res.json({update, message: 'course details updated successfully'});
            return;
        }
        
    }
    catch (error) {
        res.status(500).json(error);
    }
};

// Update a course identified by the courseId in the request
exports.deleteCourse = async(req, res) => {
  // TODO from below
    try{
        const { courseId } = req.query;
        if (!courseId) {
            res.status(400).json({ message: "courseId is required" });
            return;
        }

        if (courseId) {
            const deleted = await courseSchema.findOneAndDelete({ courseId: courseId});
            res.json({deleted, message: 'course deleted successfully'});
            return;
        }
        
    }
    catch (error) {
        res.status(500).json(error);
    }
};

// Bulk insert course
exports.addCourseBulk = async(req, res) => {
  try{
    let courseId = 1;
    const courses = await courseSchema.find();
    if (courses.length) {
      const lastCourse = courses[courses.length - 1];
      courseId = lastCourse.courseId + 1;
    };
    const body = req.body;
      body.forEach(item => {
        item.courseId = courseId;
        courseId++;
      })
    const bulk = await courseSchema.insertMany(body);
    res.status(200).json({message: 'course created successfully', courses: bulk})
  }
  catch (error) {
    res.status(500).json(error);
  }
}


exports.upsertCourse = async (req, res) => {
  try{
      const {
          courseName,
          type,
          duration,
          institutionType,
          recommendedTeacher,
        } = req.body;
      
        const checkCourse = await courseSchema.findOne({ courseName: courseName });
        if (checkCourse) {
          const updated = await courseSchema.findOneAndUpdate({ courseId: checkCourse.courseId }, {
            type,
            duration,
            institutionType,
            recommendedTeacher,
          });
          res.status(200).json({ message: 'Course updated successfully', course: updated});
          return;
        }
        let courseId = 1;
        const courses = await courseSchema.find();
        if (courses.length) {
          const lastCourse = courses[courses.length - 1];
          courseId = lastCourse.courseId + 1;
        };
      
        const course = new courseSchema({
          courseId,
          courseName,
          type,
          duration,
          institutionType,
          recommendedTeacher,
        });
        const created = await course.save();
        res.status(200).json({
            course: created._doc,
            message: 'Course created successfully'
        })
        return;
  }
  catch (error) {
      res.status(500).json(error);
  }


};
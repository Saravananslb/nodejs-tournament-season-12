const teacherSchema = require('../model/teacher-model');

exports.createTeacher = async (req, res) => {
    try{
        const {
            teacherName,
            email,
            rating,
            preferredInstitution,
            course,
          } = req.body;
        
          let teacherId = 1;
          const teacher = await teacherSchema.find();
          if (teacher.length) {
            const lastTeacher = teacher[teacher.length - 1];
            teacherId = lastTeacher.teacherId + 1;
          };
        
          const teach = new teacherSchema({
            teacherId,
            teacherName,
            email,
            rating,
            preferredInstitution,
            course,
          });
          const created = await teach.save();
          res.status(200).json({
              course: created._doc,
              message: 'Teacher created successfully'
          })
          return;
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.findAllTeachers = async(req, res) => {
    try {
        let teachers;
        const { course } = req.query;
        if (course) {
            teachers = await teacherSchema.find({course: course});
        }
        else {
            teachers = await teacherSchema.find();
        }
        res.status(200).json({
            "statusmessage": "Successful",
            "statusCode": 1,
            "data": {
                "teacherList": teachers
            }
        })
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// Bulk insert teacher
exports.addTeacherBulk = async(req, res) => {
    try{
        let teacherId = 1;
          const teacher = await teacherSchema.find();
          if (teacher.length) {
            const lastTeacher = teacher[teacher.length - 1];
            teacherId = lastTeacher.teacherId + 1;
          };
      const body = req.body;
      body.forEach(item => {
        item.teacherId = teacherId;
        teacherId++;
      })
      const bulk = await teacherSchema.insertMany(body);
      res.status(200).json({message: 'Teachers created successfully', teachers: bulk})
    }
    catch (error) {
      res.status(500).json(error);
    }
  }

// Upsert Teacher 
exports.upsertTeacher = async(req, res) => {
    try{
        const {
            teacherName,
            email,
            rating,
            preferredInstitution,
            course,
          } = req.body;
        
          let teacherId = 1;
          const checkTeacher = await teacherSchema.findOne({ email: email });
          if (checkTeacher) {
              const update = await teacherSchema.findOneAndUpdate({ teacherId: checkTeacher.teacherId }, {
                teacherName,
                rating,
                preferredInstitution,
                course,
              });
              res.status(200).json({ message: 'Teacher updated successfully', teacher: update});
              return;
          }
          const teacher = await teacherSchema.find();
          if (teacher.length) {
            const lastTeacher = teacher[teacher.length - 1];
            teacherId = lastTeacher.teacherId + 1;
          };
        
          const teach = new teacherSchema({
            teacherId,
            teacherName,
            email,
            rating,
            preferredInstitution,
            course,
          });
          const created = await teach.save();
          res.status(200).json({
              course: created._doc,
              message: 'Teacher created successfully'
          })
          return;
    }
    catch (error) {
        res.status(500).json(error);
    }
}
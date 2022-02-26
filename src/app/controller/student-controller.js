// All controller logic for CRUD operation will stay here

const studentModel = require("../model/student-model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "onlineguru";
// Create and Save a new student
exports.create = async (req, res) => {
  try {
    // validate request body
    const {
      studentName,
      studentEmail,
      institutionName,
      institutionType,
      courseName,
    } = req.body;

    let studentId = 1;
    const getStudent = await studentModel.find();
    if (getStudent.length) {
      const lastStudent = getStudent[getStudent.length - 1];
      studentId = lastStudent.studentId + 1;
    }

    // Create student
    const student = new studentModel({
      studentId,
      studentName,
      studentEmail,
      institutionName,
      institutionType,
      courseName,
    });

    // Save student in Database
    const studentCreated = await student.save();
    res.status(200).json(studentCreated);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "email is required" });
      return;
    }
    const student = await studentModel.findOne({ studentEmail: email });
    if (!student) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    const authToken = jwt.sign(
      {
        email: student.studentEmail,
        id: student.id,
        studentId: student.studentId,
      },
      JWT_SECRET,
      { expiresIn: "10hrs" }
    );
    res.status(200).json({
      Authorization: authToken,
      studentId: student.studentId,
      studentName: student.studentName,
      message: "user logged in successfully",
    });
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

// Retrieve and return all student from the database.
exports.findAll = async(req, res) => {
  // TODO from below
  try {
    const students = await studentModel.find();
    res.status(200).json({
        "statusmessage": "Successful",
        "statusCode": 1,
        "data": {
            "studentList": students
        }
    });
    return;
  }
  catch (error) {
      res.status(500).json(error);
  }

};

// Find a single student with a studentId
exports.findOne = async (req, res) => {
  // TODO from below
  try {
    const { email, course } = req.query;
    if (!email && !course) {
      res.status(400).json({ message: "email or course is required" });
      return;
    }
    if (email) {
      let student = await studentModel.findOne({ studentEmail: email });
      res
        .status(200)
        .json({
          statusmessage: "Successful",
          statusCode: 1,
          data: { studentList: student },
          message: "student fetched successfully",
        });
      return;
    }
    if (course) {
      let student = await studentModel.findOne({ courseName: course });
      res
        .status(200)
        .json({
            statusmessage: "Successful",
            statusCode: 1,
            data: { studentList: student },
            message: "student fetched successfully",
        });
      return;
    }
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

// Update a student identified by the studentId/email in the request
exports.update = async(req, res) => {
  // TODO from below
    try{
        const { email, studentId } = req.query;
        const body = req.body;
        if (!email && !studentId) {
            res.status(400).json({ message: "email or studentId is required" });
            return;
        }
        if (!body) {
            res.status(400).json({ message: "update fields are required" });
            return;
        }

        if (email) {
            const update = await studentModel.findOneAndUpdate({ studentEmail: email}, {...body});
            res.json({update, message: 'Student details updated successfully'});
            return;
        }
        if (studentId) {
            const update = await studentModel.findOneAndUpdate({ studentId: studentId}, {...body});
            res.json({update, message: 'Student details updated successfully'})
            return;
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
  // TODO from below
};

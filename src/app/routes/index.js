// all routes HTTP method (GET/PUT/POST/DELETE) will be present here
const {
  createStudentValidation,
  createCourseValidation,
  createTeacherValidation,
  createCourseBulkValidation,
  createTeacherBulkValidation,
} = require("../../validation/validation");
const {
  create,
  login,
  findOne,
  findAll,
  update,
} = require("../controller/student-controller");
const {
  createCourse,
  findAllCourses,
  updateCourse,
  deleteCourse,
  addCourseBulk,
  upsertCourse
} = require("../controller/course-controller");
const {
  createTeacher,
  findAllTeachers,
  addTeacherBulk,
  upsertTeacher
} = require("../controller/teacher-controller");

module.exports = (app) => {
  // import your existing student controller here, which contains method for all CRUD operations

  // APi endpoint to create a new student
  app.post("/createStudent", createStudentValidation, create);

  // API endpoint for login
  app.post("/login", login);

  // API endpoint to get all student
  app.get("/getStudent/list", findAll);

  // API endpoint to get all course
  app.get("/getCourse/list", findAllCourses);

  // API endpoint to get all teacher
  app.get("/getTeacher/list", findAllTeachers);

  // API endpoint for creating Course
  app.post("/createCourse", createCourseValidation, createCourse);

  // API endpoint for creating teacher profile
  app.post("/createTeacherProfile", createTeacherValidation, createTeacher);

  // API endpoint to get single student
  app.get("/getStudent", findOne);

  // API endpoint to update student with studentId
  app.put("/updateStudent", update);

  // API endpoint to update course with courseId
  app.put("/updateCourse", updateCourse);

  // API endpoint to delete course with courseId
  app.delete("/deleteCourse", deleteCourse);

  // API endpoint to add bulk course
  app.post("/addCourse/bulk", createCourseBulkValidation, addCourseBulk);

  // API endpoint to add bulk teacher
  app.post("/addTeacher/bulk", createTeacherBulkValidation, addTeacherBulk);

  // API endpoint for upsert teacher
  app.post("/upsertTeacher", createTeacherValidation, upsertTeacher);

  // API endpoint for upsert course
  app.post("/upsertCourse", createCourseValidation, upsertCourse);
};

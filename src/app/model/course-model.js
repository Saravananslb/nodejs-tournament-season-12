// Course List model which expose the schema of student with it's respective fields

const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseId: Number,
    courseName: String,
    type: String,
    duration: String,
    institutionType: String,
    recommendedTeacher: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('CourseList', CourseSchema);
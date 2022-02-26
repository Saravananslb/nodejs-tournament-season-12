// Course List model which expose the schema of student with it's respective fields

const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    teacherId: Number,
    teacherName: String,
    email: String,
    rating: Number,
    preferredInstitution: String,
    course: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('TeacherList', TeacherSchema);
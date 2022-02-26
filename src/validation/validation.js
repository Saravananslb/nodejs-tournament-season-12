const { validateEmail } = require('../utill');

const createStudentValidation = (req, res, next) => {
    const { studentName, studentEmail, institutionName, institutionType, courseName } = req.body;
    if (!studentName) {
        res.status(400).json({ error: 'studentName is required' });
        return;
    }
    if (!studentEmail) {
        res.status(400).json({ error: 'studentEmail is required' });
        return;
    }
    if (!institutionName) {
        res.status(400).json({ error: 'institutionName is required' });
        return;
    }
    if (!institutionType) {
        res.status(400).json({ error: 'institutionType is required' });
        return;
    }
    if (!courseName) {
        res.status(400).json({ error: 'courseName is required' });
        return;
    }
    if (!validateEmail(studentEmail)) {
        res.status(400).json({ error: 'invalid studentEmail' });
        return;
    }
    next();
}

const createCourseValidation = (req, res, next) => {
    const { courseName, type, duration, institutionType, recommendedTeacher } = req.body;
    if (!courseName) {
        res.status(400).json({ error: 'courseName is required' });
        return;
    }
    if (!type) {
        res.status(400).json({ error: 'type is required' });
        return;
    }
    if (!duration) {
        res.status(400).json({ error: 'duration is required' });
        return;
    }
    if (!institutionType) {
        res.status(400).json({ error: 'institutionType is required' });
        return;
    }
    if (!recommendedTeacher) {
        res.status(400).json({ error: 'recommendedTeacher is required' });
        return;
    }
    next();
}

const createCourseBulkValidation = (req, res, next) => {
    const body = req.body;
    if (!body) {
        res.status(400).json({ error: 'Array of fields are required' });
        return;
    }
    body.forEach(item => {
        if (!item.courseName) {
            res.status(400).json({ error: 'courseName is required' });
            return;
        }
        if (!item.type) {
            res.status(400).json({ error: 'type is required' });
            return;
        }
        if (!item.duration) {
            res.status(400).json({ error: 'duration is required' });
            return;
        }
        if (!item.institutionType) {
            res.status(400).json({ error: 'institutionType is required' });
            return;
        }
        if (!item.recommendedTeacher) {
            res.status(400).json({ error: 'recommendedTeacher is required' });
            return;
        }
    })
    next();
}

const createTeacherValidation = (req, res, next) => {
    const {
        teacherName,
        email,
        rating,
        preferredInstitution,
        course,
      } = req.body;
    if (!teacherName) {
        res.status(400).json({ error: 'teacherName is required' });
        return;
    }
    if (!email) {
        res.status(400).json({ error: 'email is required' });
        return;
    }
    if (!rating) {
        res.status(400).json({ error: 'rating is required' });
        return;
    }
    if (!preferredInstitution) {
        res.status(400).json({ error: 'preferredInstitution is required' });
        return;
    }
    if (!course) {
        res.status(400).json({ error: 'course is required' });
        return;
    }
    next();
}

const createTeacherBulkValidation = (req, res, next) => {
    const body = req.body;
    if (!body) {
        res.status(400).json({ error: 'Array of fields are required' });
        return;
    }
    body.forEach(item => {
        if (!item.teacherName) {
            res.status(400).json({ error: 'teacherName is required' });
            return;
        }
        if (!item.email) {
            res.status(400).json({ error: 'email is required' });
            return;
        }
        if (!item.rating) {
            res.status(400).json({ error: 'rating is required' });
            return;
        }
        if (!item.preferredInstitution) {
            res.status(400).json({ error: 'preferredInstitution is required' });
            return;
        }
        if (!item.course) {
            res.status(400).json({ error: 'course is required' });
            return;
        }
    })
    next();
}

module.exports = {
    createStudentValidation,
    createCourseValidation,
    createTeacherValidation,
    createCourseBulkValidation,
    createTeacherBulkValidation
}
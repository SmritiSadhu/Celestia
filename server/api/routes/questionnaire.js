const express = require('express');
const router = express.Router();
const {generateInterviewQuestions, getRoles, reviewAnswers} = require('../controllers/questionnaire');
const jwt = require('../../middleware/jwt')
router.post('/genaiquestion', generateInterviewQuestions);
router.get('/getroles', getRoles);
router.post('/getfeedback', reviewAnswers);

module.exports = router;

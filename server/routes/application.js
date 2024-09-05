const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock database (replace with real database logic)
const applications = [];

router.post('/submit-application', (req, res) => {
    const applicationData = req.body;
    const applicationId = uuidv4();

    // Store application data in the database
    applications.push({
        id: applicationId,
        ...applicationData,
        status: 'pending'
    });

    res.json({ success: true, applicationId });
});

module.exports = router;

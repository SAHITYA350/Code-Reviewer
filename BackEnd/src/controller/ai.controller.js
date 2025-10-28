const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code || code.trim().length === 0) {
            return res.status(400).json({
                error: "Code is required and cannot be empty"
            });
        }

        if (code.length > 10000) {
            return res.status(400).json({
                error: "Code too long. Maximum 10000 characters allowed."
            });
        }

        const response = await aiService(code);
        
        res.json({
            review: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).json({
            error: "Internal server error during code review",
            details: error.message
        });
    }
};
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Define rate limiting rules for the login route
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 5, // Limit each IP to 5 login requests per window
    message: {
        error: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the limiter specifically to the login endpoint
app.post('/api/login', loginLimiter, (req, res) => {
    const { username, password } = req.body;
    
    // Authenticate user logic here...
    
    res.send({ success: true, message: "Authentication checked." });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

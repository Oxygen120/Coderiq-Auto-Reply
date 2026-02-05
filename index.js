const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Aapki Latest API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        const userQuery = req.body.query || req.body.message;
        
        // Specifically using Gemini 2.5 Flash as per your key support
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            systemInstruction: `Aap Mohammad Rafiq (Independent Web Developer) ke official AI assistant hain.
            Brand: CoderIQ.IN.
            Services: Professional Web Development, Custom Web Apps (Earning/Referral systems), E-commerce, aur Domain/Professional Email setup.
            Contact: Phone 9979131767, Email info@coderiq.in, Website coderiq.in.
            Rules: Hamesha Hinglish mein baat karein. Pricing fix na batayein. Replies short aur professional honi chahiye.`
        });

        const result = await model.generateContent(userQuery);
        const response = await result.response;
        
        res.json({ "reply": response.text() });

    } catch (error) {
        console.error("Error:", error);
        res.json({ "reply": "Namaste! CoderIQ.IN mein swagat hai. Rafiq ji abhi busy hain, aap direct 9979131767 par call kar sakte hain." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Gemini 2.5 Server is running!`));

const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        // WhatsAuto se aane wala message
        const userMsg = req.body.message || req.body.query;
        
        if (!userMsg) {
            return res.json({ "reply": "CoderIQ.IN mein swagat hai! Main aapki kya madad kar sakta hoon?" });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", // 1.5-flash zyada stable hai Vercel par
            systemInstruction: `Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional assistant hain. 
            Services: Web Development, Custom Apps (Earning/Referral/Ads), E-commerce. 
            Contact: 9979131767, Email: info@coderiq.in. 
            Rules: Hinglish use karein. Har message ka alag jawab dein. Context yaad rakhein.`
        });

        const result = await model.generateContent(userMsg);
        const response = await result.response;
        
        res.json({ "reply": response.text() });

    } catch (error) {
        console.error(error);
        res.json({ "reply": "Rafiq ji abhi busy hain, aap direct 9979131767 par call karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live!`));

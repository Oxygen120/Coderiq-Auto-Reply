const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Mohammad Rafiq's API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        // Forcefully extract message from WhatsAuto
        const incomingMsg = req.body.message || "";
        
        // --- DEPLOYMENT TEST ---
        if (incomingMsg.toLowerCase().includes("check") || incomingMsg.toLowerCase() === "test") {
            return res.json({ 
                "reply": "🚀 VERCEL LIVE: Version 3.1 is working! Mohammad Rafiq ji, ab aapka AI naya jawab dega." 
            });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Aap CoderIQ.IN ke assistant hain. Hinglish mein jawab dein. Har baar alag jawab dein."
        });

        if (!incomingMsg) {
            return res.json({ "reply": "CoderIQ.IN mein swagat hai! Hum aapke liye websites aur apps banate hain." });
        }

        const result = await model.generateContent(incomingMsg);
        const response = await result.response;
        
        res.json({ "reply": response.text() });

    } catch (error) {
        res.json({ "reply": "Server thoda busy hai, call 9979131767" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`v3.1 Running`));

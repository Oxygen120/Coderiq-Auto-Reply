const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Mohammad Rafiq's API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";
        
        // Connectivity & Version Check
        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "✅ Server Link OK! Version 5.5 (Multi-Model Support) is live." });
        }

        // Try Models in order of availability
        const modelNames = ["gemini-1.5-flash", "gemini-2.0-flash-exp"];
        let aiResponseText = "";
        let success = false;

        for (const mName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ 
                    model: mName,
                    systemInstruction: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional assistant hain. Hinglish mein jawab dein."
                });
                const result = await model.generateContent(userMsg || "Hello");
                const response = await result.response;
                aiResponseText = response.text();
                if (aiResponseText) { 
                    success = true; 
                    break; 
                }
            } catch (e) {
                console.log(`Model ${mName} failed, trying next...`);
            }
        }

        if (success) {
            res.json({ "reply": aiResponseText });
        } else {
            res.json({ "reply": "⚠️ AI Engine connect nahi ho raha. Rafiq ji, please API key check karein." });
        }

    } catch (error) {
        res.json({ "reply": "Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ v5.5 Ready`));

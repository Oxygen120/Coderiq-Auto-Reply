const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Mohammad Rafiq's API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";
        
        // Connectivity Check
        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "✅ Server Link Perfect! Mohammad Rafiq ji, ab 2.5-Flash call ho raha hai." });
        }

        // --- SPECIFIC MODEL: gemini-2.5-flash ---
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            systemInstruction: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional assistant hain. Hinglish mein jawab dein. Business: Web Development, Apps, E-commerce."
        });

        if (!userMsg) {
            return res.json({ "reply": "CoderIQ.IN mein swagat hai! Main aapki kya madad kar sakta hoon?" });
        }

        const result = await model.generateContent(userMsg);
        const response = await result.response;
        const aiText = response.text();

        res.json({ "reply": aiText });

    } catch (error) {
        console.error("DEBUG ERROR:", error.message);
        // Agar model nahi mila toh ye exact error message dikhayega
        res.json({ "reply": "⚠️ AI Engine Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ v6.0 Ready`));

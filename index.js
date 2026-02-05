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
            return res.json({ "reply": "✅ Server link perfect hai! Ab 2.5 Flash run ho raha hai." });
        }

        // --- MODEL NAME UPDATED TO 2.5-FLASH ---
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            systemInstruction: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional AI assistant hain. Business: Web Development, Apps, E-commerce. Phone: 9979131767. Hinglish mein jawab dein."
        });

        if (!userMsg) {
            return res.json({ "reply": "CoderIQ.IN mein swagat hai! Mohammad Rafiq ji ke AI assistant se baat karne ke liye shukriya." });
        }

        const result = await model.generateContent(userMsg);
        const response = await result.response;
        const aiResponseText = response.text();

        res.json({ "reply": aiResponseText });

    } catch (error) {
        console.error("ERROR:", error.message);
        res.json({ "reply": "⚠️ Error: " + error.message + ". Rafiq ji, please model version check karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ v5.1 (2.5-Flash) Ready`));

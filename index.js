const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Mohammad Rafiq's API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";
        
        // 1. Direct Deployment Check (Bina AI ke)
        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "✅ SERVER IS OK! Mohammad Rafiq ji, Vercel se connectivity perfect hai. Ab AI check karte hain..." });
        }

        // 2. Gemini AI Call
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", // 1.5-flash zyada stable hai
            systemInstruction: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke assistant hain. Hinglish mein professional jawab dein. Phone: 9979131767."
        });

        const result = await model.generateContent(userMsg || "Hello");
        const response = await result.response;
        const aiResponseText = response.text();

        // 3. Agar AI ka jawab mil gaya
        if (aiResponseText) {
            return res.json({ "reply": aiResponseText });
        } else {
            throw new Error("AI Response Empty");
        }

    } catch (error) {
        // 4. Debugging Error (Taki pata chale dikkat kya hai)
        console.error("DETAILED ERROR:", error);
        return res.json({ 
            "reply": "⚠️ AI Error: " + error.message + ". Rafiq ji, please check API Key or Vercel Logs." 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ v4.5 Ready`));

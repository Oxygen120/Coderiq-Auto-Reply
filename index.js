const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Mohammad Rafiq's API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        const userQuery = req.body.message || req.body.query || "";
        
        // --- VERCEL UPDATE CHECK ---
        // Agar aap WhatsAuto se "test" ya "check" bhejenge, toh ye confirm karega
        if (userQuery.toLowerCase() === "test" || userQuery.toLowerCase() === "check") {
            return res.json({ 
                "reply": "✅ Vercel Update Success (v2.0)! Ab aapka server naya code run kar raha hai. Mohammad Rafiq ji, CoderIQ.IN bot ready hai." 
            });
        }

        if (!userQuery || userQuery.length < 2) {
            return res.json({ "reply": "CoderIQ.IN mein swagat hai! Main Mohammad Rafiq ji ka assistant hoon. Main aapki kya madad kar sakta hoon?" });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional AI assistant hain. 
            Services: Web Development, Custom Apps (Referral/Earning/Ads), aur E-commerce stores. 
            Contact: 9979131767, Email: info@coderiq.in, Website: coderiq.in. 
            Rules: Hinglish mein baat karein. Har message ka unique aur lamba jawab dein taaki client ko poori jaankari mile.`
        });

        // Gemini ko asli user query bhejna
        const result = await model.generateContent(userQuery);
        const response = await result.response;
        
        res.json({ "reply": response.text() });

    } catch (error) {
        console.error("Error Log:", error);
        res.json({ "reply": "Server thoda busy hai, please call 9979131767" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ.IN v2.0 Live!`));

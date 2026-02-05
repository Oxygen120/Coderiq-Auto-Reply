const express = require('express');
const Groq = require('groq-sdk');
const app = express();

app.use(express.json());

// Ye line Vercel settings se key uthayegi
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";

        // Testing for Rafiq ji (CoderIQ.IN)
        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "✅ CoderIQ Engine v8.0 LIVE! Groq connected successfully." });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke assistant hain. Hinglish mein jawab dein. Services: Web Development, Apps, E-commerce. Phone: 9979131767."
                },
                { role: "user", content: userMsg || "Hi" }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6
        });

        res.json({ "reply": chatCompletion.choices[0]?.message?.content || "" });

    } catch (error) {
        console.error("Error:", error.message);
        res.json({ "reply": "⚠️ Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`v8.0 Ready`));

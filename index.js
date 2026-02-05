const express = require('express');
const Groq = require('groq-sdk');
const app = express();

app.use(express.json());

// 1. YAHAN NAYI KEY PASTE KAREIN (Bina kisi extra space ke)
const GROQ_KEY = "Gsk_Dnd5wQGoj6YfwNQMPcY7WGdyb3FYNUos4zWUTRIBn8pxQgqVipnO";

const groq = new Groq({ apiKey: GROQ_KEY });

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";

        // Server Check
        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "✅ Server link working! Mohammad Rafiq ji, Groq connect karne ki koshish kar raha hoon..." });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional assistant hain. Services: Web Development, Apps (CashAdda style), E-commerce (Cake Wale). Contact: 9979131767. Hinglish mein jawab dein."
                },
                {
                    role: "user",
                    content: userMsg || "Hi"
                }
            ],
            model: "llama-3.3-70b-versatile", // Sabse stable aur fast model
            temperature: 0.6
        });

        const aiText = chatCompletion.choices[0]?.message?.content || "";
        res.json({ "reply": aiText });

    } catch (error) {
        console.error("DEBUG:", error.message);
        
        // 2. AGAR KEY INVALID HAI TOH YEH REPLY AAYEGA
        if (error.message.includes("401") || error.message.includes("API Key")) {
            return res.json({ "reply": "⚠️ Rafiq ji, Groq API Key invalid bata raha hai. Please console.groq.com se nayi key generate karke update karein." });
        }
        
        res.json({ "reply": "Rafiq ji abhi busy hain, 9979131767 par call karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`v7.0 Ready`));

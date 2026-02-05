const express = require('express');
const Groq = require('groq-sdk');
const app = express();

app.use(express.json());

// Code mein key ki jagah Environment Variable use ho raha hai
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";

        // Training for CoderIQ.IN
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional assistant hain. 
                    Services: Web Development, Custom Apps, E-commerce (Cake Wale). 
                    Contact: 9979131767, Email: info@coderiq.in. 
                    Hinglish mein professional jawab dein.`
                },
                { role: "user", content: userMsg || "Hi" }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6
        });

        const aiText = chatCompletion.choices[0]?.message?.content || "";
        res.json({ "reply": aiText });

    } catch (error) {
        console.error("DEBUG:", error.message);
        res.json({ "reply": "Rafiq ji abhi busy hain, 9979131767 par call karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`v7.5 Security Update Live`));

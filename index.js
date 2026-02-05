const express = require('express');
const Groq = require('groq-sdk');
const app = express();

app.use(express.json());

// Aapki provide ki gayi Groq API Key
const groq = new Groq({ 
    apiKey: 'Gsk_Dnd5wQGoj6YfwNQMPcY7WGdyb3FYNUos4zWUTRIBn8pxQgqVipnO' 
});

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";

        // Server Status Check
        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "🚀 CoderIQ Server: Groq Engine v1.0 is LIVE and Super Fast!" });
        }

        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": `Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional AI assistant hain. 
                    Aapka kaam clients ko services ke baare mein batana hai.
                    Services: Professional Web Development, Custom Web Apps (CashAdda style, Referral/Ads system), E-commerce sites (Like Cake Wale), aur Domain/Email setup. 
                    Founder Name: Mohammad Rafiq.
                    Contact: 9979131767.
                    Email: info@coderiq.in.
                    Website: CoderIQ.in.
                    Rules: Hamesha Hinglish mein professional aur friendly baat karein. Har message ka unique aur detailed jawab dein. Short replies mat dein.`
                },
                {
                    "role": "user",
                    "content": userMsg || "Hello"
                }
            ],
            "model": "llama3-8b-8192", 
            "temperature": 0.7,
            "max_tokens": 1024
        });

        const aiText = chatCompletion.choices[0]?.message?.content || "";
        
        // WhatsAuto ko 'reply' key mein response bhejna
        res.json({ "reply": aiText });

    } catch (error) {
        console.error("Groq Error:", error.message);
        res.json({ "reply": "Rafiq ji abhi busy hain, aap direct unhe 9979131767 par call karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ Groq Bot Ready!`));

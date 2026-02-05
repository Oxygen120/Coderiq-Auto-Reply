const express = require('express');
const Groq = require('groq-sdk');
const app = express();

app.use(express.json());

// Mohammad Rafiq's Groq API Key
const groq = new Groq({ 
    apiKey: 'Gsk_Dnd5wQGoj6YfwNQMPcY7WGdyb3FYNUos4zWUTRIBn8pxQgqVipnO' 
});

app.post('/webhook', async (req, res) => {
    try {
        const userMsg = req.body.message || "";

        if (userMsg.toLowerCase() === "check") {
            return res.json({ "reply": "✅ CoderIQ Server: Groq Engine is LIVE!" });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional assistant hain. Aapka kaam clients ko services jaise Web Development, Custom Apps, aur E-commerce stores (jaise Cake Wale) ke baare mein batana hai. Contact: 9979131767. Language: Hinglish."
                },
                {
                    role: "user",
                    content: userMsg || "Hello"
                }
            ],
            model: "llama-3.3-70b-versatile", // Sabse stable model
            temperature: 0.6
        });

        const aiText = chatCompletion.choices[0]?.message?.content || "";
        res.json({ "reply": aiText });

    } catch (error) {
        console.error("GROQ ERROR:", error.message);
        // Error message badal diya taaki pata chale ki ye catch block hai
        res.json({ "reply": "⚠️ Connection Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Groq Live!`));

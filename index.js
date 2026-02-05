const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Aapki API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        // IMPORTANT: WhatsAuto "message" key mein text bhejta hai
        const userQuery = req.body.message; 
        
        if (!userQuery) {
            return res.json({ "reply": "CoderIQ.IN mein swagat hai! Main aapki kya madad kar sakta hoon?" });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: `Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional AI assistant hain. 
            Services: Web Development, Custom Apps, E-commerce. 
            Contact: 9979131767, info@coderiq.in. 
            Rules: User ke message ka context samajh kar Hinglish mein jawab dein. Har baar same reply na karein.`
        });

        // Yahan hum user ka asli message (userQuery) Gemini ko bhej rahe hain
        const result = await model.generateContent(userQuery);
        const response = await result.response;
        
        // WhatsAuto ko reply bhej rahe hain
        res.json({ "reply": response.text() });

    } catch (error) {
        console.error(error);
        res.json({ "reply": "Server thoda busy hai, aap direct 9979131767 par call karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live!`));

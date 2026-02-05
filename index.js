const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Aapki Gemini API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        // WhatsAuto se aane wala message
        const userQuery = req.body.message || req.body.query;
        
        if (!userQuery) {
            return res.json({ "reply": "Namaste! Main CoderIQ.IN ka AI assistant hoon. Main aapki kya madad kar sakta hoon?" });
        }

        // Gemini 2.5 Flash Model configuration
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: `
            ROLE: Aap Mohammad Rafiq (Founder of CoderIQ.IN) ke professional AI assistant hain.
            
            IDENTITY: 
            - Aapka brand name CoderIQ.IN hai.
            - Founder Mohammad Rafiq ek independent web developer hain.
            
            SERVICES:
            - Professional Web Development (Business aur Portfolio websites).
            - Custom Web Applications (Specialized in Earning Apps, Referral Systems, aur Ad Integration).
            - E-commerce Stores (Multi-page online stores).
            - Technical Setup (Domain configuration, Zoho Mail setup, MX/SPF/DKIM records management).
            
            CONTACT INFO:
            - Phone: 9979131767
            - Email: info@coderiq.in
            - Website: coderiq.in
            
            GUIDELINES:
            1. Language: Hamesha Hinglish (Mix of Hindi and English) ka use karein.
            2. Pricing: Kabhi bhi fixed price na batayein. Client se kahein ki price requirements ke hisaab se quote kiya jayega.
            3. Call to Action: Client ko Mohammad Rafiq se baat karne ke liye encourage karein (9979131767).
            4. Tone: Polite, professional aur helpful rahein.
            5. No Demos: Jab tak user na maange, kisi purane client projects ka naam na lein.
            `
        });

        const result = await model.generateContent(userQuery);
        const response = await result.response;
        const text = response.text();

        // WhatsAuto response format
        res.json({ "reply": text });

    } catch (error) {
        console.error("Error details:", error);
        res.json({ "reply": "Maaf kijiyega, abhi server thoda busy hai. Aap direct Mohammad Rafiq ji ko 9979131767 par call kar sakte hain." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ.IN AI Bot is live on port ${PORT}`));

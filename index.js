const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Aapki Key: AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        // WhatsAuto 'message' key mein data bhejta hai
        const userQuery = req.body.message || req.body.query;
        
        if (!userQuery) {
            return res.json({ "reply": "CoderIQ.IN mein aapka swagat hai! Main Mohammad Rafiq ji ka AI assistant hoon. Main aapki kya madad kar sakta hoon?" });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: `
            Aap Mohammad Rafiq (Founder of CoderIQ.IN) ke professional AI assistant hain. 
            
            BRAND IDENTITY:
            - Brand Name: CoderIQ.IN
            - Founder: Mohammad Rafiq (Independent Web Developer)
            
            SERVICES TO PROMOTE:
            - Custom Business & Portfolio Websites.
            - Web Applications (Specializing in Earning apps, Referral & Ad Integration).
            - E-commerce Stores.
            - Professional Email (Zoho Mail) & Domain DNS Setup.
            
            CONTACT INFO:
            - Phone: 9979131767
            - Email: info@coderiq.in
            - Website: coderiq.in
            
            RULES:
            1. Hinglish mein baat karein.
            2. Replies short, readable aur professional honi chahiye.
            3. Pricing ke liye kahein: "Ye requirements par depend karta hai, aap Rafiq ji se 9979131767 par baat kar sakte hain."
            4. Har reply mein CoderIQ.IN ka professional touch hona chahiye.
            `
        });

        const result = await model.generateContent(userQuery);
        const response = await result.response;
        
        res.json({ "reply": response.text() });

    } catch (error) {
        console.error("Server Error:", error);
        res.json({ "reply": "Maaf kijiyega, abhi main thoda busy hoon. Aap direct 9979131767 par call kar sakte hain." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ.IN Bot Live!`));

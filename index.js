const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Mohammad Rafiq's API Key
const genAI = new GoogleGenerativeAI("AIzaSyC0kV61N55Wz8rEffHIaUuHTSciM9piV14");

app.post('/webhook', async (req, res) => {
    try {
        // Whatauto sends data in 'message' field
        // Is line ko maine fix kiya hai taaki AI asli message padh sake
        const userQuery = req.body.message || req.body.query || "";
        
        console.log("User says:", userQuery);

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `Aap Mohammad Rafiq (Founder: CoderIQ.IN) ke professional AI assistant hain. 
            Services: Web Development (CoderIQ.IN), Custom Apps (Earning/Referral), E-commerce. 
            Contact: 9979131767, Email: info@coderiq.in. 
            Rules: Hamesha Hinglish mein baat karein. Har message ka alag aur context ke hisaab se jawab dein. Agar user website ki baat kare toh unhe details dein.`
        });

        // Agar userQuery khali hai toh hi default message jayega
        if (!userQuery || userQuery.trim() === "") {
             return res.json({ "reply": "CoderIQ.IN mein swagat hai! Main aapki kya madad kar sakta hoon?" });
        }

        const result = await model.generateContent(userQuery);
        const response = await result.response;
        
        res.json({ "reply": response.text() });

    } catch (error) {
        console.error(error);
        res.json({ "reply": "Server thoda busy hai, aap 9979131767 par call karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CoderIQ Server Live!`));

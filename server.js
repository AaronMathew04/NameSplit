import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import OpenAI from 'openai';

config();

const app = express();

const openai = new OpenAI({
    apiKey: process.env.API_Key
});

app.use(bodyParser.json());

app.post('/api/getNameSplit', async (req, res) => {
    const fullname  = req.body.fullname;

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `Please unscramble the full name ${fullname}. This name may be jumbled . I need the most probable first name, middle name, and last name along with their confidence levels in percentage. 
        To ensure high confidence values, the correct order and maximum accuracy, consider linguistic features, common naming conventions and statistical likelihoods. Ensure the correct order of the name and prioritize high-confidence values. Include pronunciation for each part of the name.
        Provide the answer in this format:
        First Name:
        Confidence:
        Middle Name:
        Confidence:
        Last Name:
        Confidence:
        Pronunciation:`}],
    });
    if (chatCompletion !== undefined) {
        const responseContent = chatCompletion.choices[0].message.content;
        // Replace extra line breaks and ensure consistent spacing
        const formattedResponse = responseContent.split('\\n').join('\n');
        res.json({ message: formattedResponse });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

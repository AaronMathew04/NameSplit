import {config} from "dotenv"
config()

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey:process.env.API_Key
})

var fullname = "AaronK Mathew";

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
  console.log(chatCompletion.choices[0].message.content);
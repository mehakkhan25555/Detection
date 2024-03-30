const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require("fs").promises;

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", generationConfig });

async function generatecontent() {
    try {
        const imagepath = "image2.jpg"; // Check if the image exists in the specified path
        const imagedata = await fs.readFile(imagepath); // Check if the image is being read correctly
        const imageformat = imagedata.toString('base64'); // Check if the image data is converted to base64 correctly

        const parts = [
            { text: "Describe what is going in this picture" },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: imageformat
                }
            }
        ];

        const data = await model.generateContent({ contents: [{ role: "user", parts }] }); // Check if model generation is triggered correctly
        const result = await data.response; // Check if the response is obtained correctly
        const text = await result.text(); // Check if the text is obtained correctly
        console.log(text); // Check if the generated text is logged correctly
    } catch (error) {
        console.error("Error generating", error); // Check if any errors are caught and logged correctly
    }
}

generatecontent();

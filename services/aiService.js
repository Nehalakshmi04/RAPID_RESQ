const openai = require('openai');
const { EmergencyRequest } = require('../models/EmergencyRequest');

const openaiClient = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const analyzeEmergencyRequest = async (request) => {
  try {
    const prompt = `Analyze the following emergency request and provide:
    1. Urgency level (1-10)
    2. Required resources
    3. Recommended response actions
    4. Potential risks
    
    Request Details:
    Domain: ${request.domain}
    Severity: ${request.severity}
    Description: ${request.description}
    Location: ${request.location.address}
    `;

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const analysis = response.choices[0].message.content;
    
    // Update request with AI analysis
    await EmergencyRequest.findByIdAndUpdate(request._id, {
      aiAnalysis: analysis
    });

    return analysis;
  } catch (error) {
    console.error('Error in AI analysis:', error);
    throw error;
  }
};

const predictResponseTime = async (request) => {
  try {
    const prompt = `Predict the estimated response time for this emergency:
    Domain: ${request.domain}
    Severity: ${request.severity}
    Location: ${request.location.address}
    Current Time: ${new Date().toLocaleString()}
    `;

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in response time prediction:', error);
    throw error;
  }
};

module.exports = {
  analyzeEmergencyRequest,
  predictResponseTime
};

const OpenAI = require('openai-api');

const OPENAI_API_KEY = "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";
const openai = new OpenAI(OPENAI_API_KEY);

module.exports = openai
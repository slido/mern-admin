const OpenAI = require('openai-api');

const OPENAI_API_KEY = "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";
const openai = new OpenAI(OPENAI_API_KEY);

module.exports = openai
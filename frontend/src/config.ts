const dev = {
	baseURL: "http://localhost:5000/api/",
	landingPageUrl: "http://localhost:5000",
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;
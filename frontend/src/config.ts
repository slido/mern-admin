const dev = {
	baseURL: "/api/",
	landingPageUrl: "http://dkoletic.com",
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;
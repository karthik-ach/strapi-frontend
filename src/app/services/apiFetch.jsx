export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  const url = process.env.NEXT_PUBLIC_APP_DOMAIN_URL;
  if (url) return url.replace(/\/$/, '');
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
};


const apiFetch = async (url, method = 'GET', data = null, headerJson = null) => {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_TOKEN;
  const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_APP_API_URL is not defined');
    return null;
  }
  const isFormData =
    typeof FormData !== 'undefined' && data instanceof FormData;

  // Build headers object
  const headers = {};
  // For JSON payloads only – browser sets boundary for FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  if (headerJson) {
    Object.assign(headers, headerJson);
  }
  const options = {
    method: method.toUpperCase(),
    headers,
  };
  if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    options.body = isFormData ? data : JSON.stringify(data);
  }
  const fullUrl = `${baseUrl}${url}`;
  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('------------------------------------------------------------------------------------------------');
    console.error(`Error ${method}ing data to ${url}:`, error);
    console.error('------------------------------------------------------------------------------------------------');
    return null;
  }
};

export { apiFetch };

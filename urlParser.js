function parseUrl(urlFormat, urlInstance) {
  // Validate the URL format and instance
  if(!validateUrls(urlFormat, urlInstance)){
    return "The variables 'urlFormat' and 'urlInstance' are incorrect.";
  }

  // Split the URL format and instance into parts
  const formatParts = urlFormat.split('/');
  const instanceParts = urlInstance.split('/');

  // Initialize an array to store query parameters
  let queryParams = [];
  if(urlInstance.includes('?')){
    const lastInstancePart = urlInstance.split('?')[1];
    queryParams = new URLSearchParams(`?${lastInstancePart}`);
  }
  
  // Initialize an object to store the parsed result
  const result = {};

  // Iterate through the format parts
  for (let i = 0; i < formatParts.length; i++) {
    const formatPart = formatParts[i];

    // If it's a variable part (starts with ':'), assign its value
    if (formatPart.startsWith(':')) {
      const variableName = formatPart.slice(1);
      let value = instanceParts[i].includes('?') ? instanceParts[i].split('?')[0] : instanceParts[i];
      
      // Check if the value is a number and convert it
      if(!isNaN(value)){
        value = Number(value);
      }

      result[variableName] = value;
    }
  }

  // Iterate through query parameters and add them to the result
  queryParams.forEach((value, key) => {
    // Check if the value is a number and convert it
    result[key] = !isNaN(value) ? Number(value) : value;
  });

  return result;
}

function validateUrls(urlFormat, urlInstance){
  // Validate the URL format and instance by comparing the number of segments
  let result = false;
  const urlFormatArray = urlFormat.split('/');
  const urlInstanceArray = urlInstance.split('/');
  if(urlFormatArray.length === urlInstanceArray.length){
    result = true;
  }
  return result;
}

const urlFormat = '/:version/api/:collection/:id';
const urlInstance = '/6/api/listings/3?sort=desc&limit=10&other=fakeParam';

const parsedData = parseUrl(urlFormat, urlInstance);

console.log(parsedData);
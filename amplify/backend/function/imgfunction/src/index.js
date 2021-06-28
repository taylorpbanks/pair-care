const getLinkPreview = require('link-preview-js');
const linkPreviewGenerator = require("link-preview-generator");

exports.handler = async (options) => {
  return getLinkPreview(options.link)
    .then(data => { 
      return {
        statusCode: 200,
        body: data,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Credentials' : true,
          'Content-Type': 'application/json'
        }  
      }
    }).catch(error => {
      return error
    });
  };
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { ApiKeyCredentials } = require('@azure/ms-rest-js');



const app = express();
const port = 3000;

const azureApiEndpoint = process.env.AZURE_API_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY;

// Logging environment variables
console.log('Azure API Endpoint:', azureApiEndpoint);
console.log('API Key:', apiKey);

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
     openapi: '3.0.0',
      info: {
        title: 'Image Analysis using Azure AI Vision',
        version: '1.0.0',
        description: 'API for analyzing images using Azure Cognitive Services Computer Vision',
      },
    servers: [
      {
        url: `http://45.77.108.78:${port}`,
      },
    ],
  },
  apis: [__filename],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Creating a Computer Vision client
const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': apiKey } });
const client = new ComputerVisionClient(credentials, azureApiEndpoint);

  /**
   * @swagger
   * tags:
   *   - name: Image
   *     description: Operations related to image analysis
   *
   * /analyzeImage:
   *   get:
   *     summary: Analyze an image
   *     tags:
   *       - Image
   *     parameters:
   *       - in: query
   *         name: imageUrl
   *         schema:
   *           type: string
   *         required: true
   *         description: URL of the image to analyze
   *     responses:
   *       200:
   *         description: Successful response
   *       400:
   *         description: Invalid image URL provided
   *       500:
   *         description: Internal server error
   */
    app.get('/analyzeImage', async (req, res) => {
      try {
        const imageUrl = req.query.imageUrl || 'DIRECT_IMAGE_URL';

        if (!imageUrl || imageUrl === 'DIRECT_IMAGE_URL') {
          return res.status(400).json({ error: 'Invalid image URL provided.' });
       }

    // Only JPEG, PNG, GIF, BMP, TIFF are valid image formats in Azure
      const supportedFeatures = ['ImageType', 'Categories', 'Tags', 'Description', 'Objects', 'Faces', 'Color', 'Brands'];

    // Analyzing if the image has supported visual features
        const result = await client.analyzeImage(imageUrl, {
          visualFeatures: supportedFeatures,
            });

             res.json({ result });
      } catch (error) {
         let errorMessage = `Error analyzing image: ${error.message}`;

       // Checking if the error is related to the image being too large
         if (error.code && error.code === 'InvalidImageSize') {
            errorMessage = 'Error analyzing image: Input image is too large. Please provide a smaller image size.';
            }

              res.status(500).json({ error: errorMessage });
            }
});

    // Starting the server at
    app.listen(port, () => {
     console.log(`Server is running at http://45.77.108.78:${port}`);
});

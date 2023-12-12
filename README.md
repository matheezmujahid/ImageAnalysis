# ImageAnalysis
# Azure AI Vision - Image Analysis API

The Azure AI Vision - Image Analysis API utilizes the Azure Image Analysis service to perform various tasks on images, such as extracting information, detecting objects, and analyzing visual content.

## Features

Image Analysis: Analyze images to extract valuable information, detect objects, and gain insights into visual content.

## API Endpoints

### 1. Image Analysis

Analyze an image and retrieve valuable information about its content.

- **Endpoint:** [http://45.77.108.78:3000/api/]
- **Method:** POST
- **Headers:**
  - Key: Content-Type, Value: application/json
- **Body Parameters:**
  - Name: imageUrl
  - Description: URL of the image to be analyzed
  - Example: `{ "imageUrl": "https://www.media.io/imagesV3/img-shiyitu1.png" }`

#### Example Request

Endpoint Screenshot
![image](https://github.com/matheezmujahid/ImageAnalysis/assets/143556031/48031aa4-19e2-426a-91b8-d74bc5423ef9)

![image](https://github.com/matheezmujahid/ImageAnalysis/assets/143556031/f6a8dc2c-9f19-44e7-9609-1bf474cab13f)

![image](https://github.com/matheezmujahid/ImageAnalysis/assets/143556031/8efc2b6a-c99c-42c4-baed-297537aeaac2)

POSTMAN screenshot
![image](https://github.com/matheezmujahid/ImageAnalysis/assets/143556031/37435af4-87d3-4235-bab6-bf1c740f2623)

Code	Description	
200	Successful response


400	Invalid image URL provided

500	Internal server error
Getting Started
Obtain API Key: Before using the API, obtain an API key from the Azure portal.
Authentication: Include the API key in the request headers for authentication.
Usage
Follow these steps to use the Image Analysis API:

Authentication: Include your API key in the request headers.
Make a Request: Use the provided endpoint to submit an image for analysis.
Receive Results: Get detailed insights and information about the content of the submitted image.

License
This project is licensed under the Matheez Mujahid - see the LICENSE.md file for details.

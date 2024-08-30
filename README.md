# WasteWhere
<img src="https://cdn-icons-png.flaticon.com/512/2514/2514330.png" alt="drawing" width="100"/>

## Information
a waste management web app (mobile responsive), that identifies recyclable items and if its in good condition to be recycled.

## Setup
### Pre-requisites:
- [NodeJS](https://nodejs.org/en/) v18 (*or above*)
- [Python](https://www.python.org/downloads/) v3.12.1 (*or above*)


### Building the app and installing packages
1. Run npm install inside the `frontend` folder

    ```$ cd frontend```

    ```$ npm install```

1. Build the react app

    ```$ npm run build```

1. Go back to the root directory and install the pip packages

    ```$ cd ..```

    ```$ pip install -r requirements.txt```

1. Run the flask server

    ```$ python app.py```

1. Access the web app from your browser. Typically it will be in `http://localhost:5000`

1. Click on `Choose File`

    <img src="readme_images/image1.jpg" alt="step1" width="150"/>

1. You may use your own image to classify if it is recyclable. Otherwise we have prepared 2 sample images in our project folder:

    - wastewhere/model/test_image_clean.jpeg
    - wastewhere/model/test_image_dirty.jpg

1. The web app will then process and return the classification of the image!

    <img src="readme_images/image2.jpg" alt="step2" width="150"/>
    <img src="readme_images/image3.jpg" alt="step3" width="150"/>

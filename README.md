# STORE API

This is a basic API that provides CRUD functionalities to retrieve and manipulate products from a database. The API includes endpoints to retrieve all products, filter products by name and various numeric values, sort products, create a new product, and delete all products from the database. The API is built using Node.js and Express.js, and uses Mongoose to interact with a MongoDB database.

## API Documentation

### Get All Products

Returns a list of all products with optional filtering, sorting, and pagination.

- **URL**: `/api/v1/products`
- **Method**: `GET`
- **URL Params**:
    - `featured=[boolean]`: Filter by featured products only. Optional.
    - `name=[string]`: Filter by product name (case-insensitive). Optional.
    - `company=[string]`: Filter by product company. Optional.
    - `numericFilters=[string]`: Filter by numeric values. Example: `price>100,rating>=4`;Supported operators: `>`, `>=`, `=`, `<`, `<=`; Optional.
    - `sort=[string]`: Sort by field(s). Example: `price,-rating`; Prefix `-` means descending order. Optional.
    - `fields=[string]`: Select which fields to include in the response. Example: `name,price`. Optional.
    - `page=[integer]`: Specify which page to retrieve. Default is `1`. Optional.
    - `limit=[integer]`: Specify the number of products to retrieve per page. Default is `10`. Optional.
- **Success Response**:
    - **Code**: `200`
    - **Content**: 
        ```
        {
            "nbHits": [integer],
            "products": [array of products]
        }
        ```
- **Error Response**:
    - **Code**: `404`
    - **Content**: `{ "msg": "No products found" }`

### Create Product

Creates a new product with the specified name and price.

- **URL**: `/api/v1/products`
- **Method**: `POST`
- **Data Params**:
    - `name=[string]`: The name of the product. Required.
    - `price=[number]`: The price of the product. Required.
- **Success Response**:
    - **Code**: `200`
    - **Content**: `The newly created product object`
- **Error Response**:
    - **Code**: `500`
    - **Content**: `{ "msg": "Server error" }`

 #### You can find other examples of request as:
### Delete All Products

Deletes all products in the database.

- **URL**: `/api/v1/products`
- **Method**: `DELETE`
- **Success Response**:
    - **Code**: `200`
    - **Content**: `"all products deleted"`

## Usage

- Clone this repository: `git clone https://github.com/souli2020/store_api.git`
- Install dependencies: `npm install`
- Create a `.env` file in the root directory with the following environment variables:
    - `MONGO_URI`: The MongoDB connection string.
- Start the server: `npm start`

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

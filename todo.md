# E-commere todo list

---

1. Create basic structure
2. start with basic connections

- [x] create atlas collection
- [x] basic db connection
- [x] use connection string for MONGO_URL
- [x] create basic server in app.js
- [x] test if it is working

3. start working on cruds in category

- [x] Category model {name,slug,timestamp}
- **In cruds** start with basic simple message, test in postman then create the real crud.
- [x] create category
- [x] get all categories
- [x] create category pagination limit and page
- [x] get single category
- [x] update category
- [x] delete category

4. adding error classes and handling different errors

- [x] create error class
- [x] create bad request class
- [x] create not found class
- [x] create unauthorized class

- [] create not found middleware
- [x] create error handler middleware
  - [x] Duplication
  - [x] Validation Error
  - [x] custom error

5. start working on cruds in sub-category

- [x] sub-Category model {name,category-parent-,timestamp}
- [x] create sub-category
- [x] get all sub-categories based on some categoryID
- [x] **enhance** by returning category name not only the id by applying population
- [x] create sub-category pagination limit and page
- [x] get single sub-category
- [x] update sub-category
- [x] delete sub-category
- [x] create brand schema and cruds same as category

6. start working on product

- [x] create product model ()
- [x] create simple cruds first
- [x] create product routes
- [x] test in postman
- [x] start with real cruds
- [x] create validation layer
- [x] validate that **category** already in the database
- [x] validate that **sub-category** array already in the database
- [x] validate that subcategory is already part of the category provided
- [x] add dummy data to the project
- [x] create script to apply some data from json file
- [x] add different data fields in query but exclude ones which will not be used in filtering
- [x] create sorting data
- [x] apply only fields that he wants to appear only to appear."Limit fields to appear"
- [x] apply searching mechanism

7. Refactoring product

- [x] in utils create file for apiFeatures
- [x] create class for ApiFeatures
- [x] handle methods [filter,sort,paginate,limitfields,search]
- [x] create pagination object to retrieve some data
- [x] page, limit, numberOfPages, next page, previous page
- [x] now code is written as build query and execute query

8. File upload using multer

- [x] install multer
- [x] do multer basic configuration
- [x] create uploadCategoryImage based on basic configuration
- [x] do some storage configuration
- [x] make it to disk storage configuration
- [x] this one is two parts
  - first [x] destination
  - second [x] make file name unique
  - with three parts **uuid time now and the extension**
- [x] make sure it is image first
  - this can be done in two different ways
  - first manually by checking type like what i've built first
  - second way using multer filter
- [x] start doing some image processing using sharp package
- [x] install sharp
- [x] use memorystorage instead of diskstorage
- [x] create resizeImageMiddleware
- [x] code refactoring create middleware instead of simple function to uploadSingleImage
- [x] do same thing with brand image
- [x] save image name in the data base
      but when retrieve the document retrieve complete URL for better experience at front-end
- [x] start uploading array of images instead of just single image
- [x] upload image for product cover
- [x] arrayy of images for product
- [x] use **fields** to accept mix between multi files and single file
- [x] image processing for the image cover
- [x] make it return url instead of the image name it self

9. Authentication and autherization

- [x] create user schema
- [x] create simple controllers
- [x] create user routes
- [x] create dummy auth and routes
- [x] create real user functionality
- [x] create validation layer for user
- [x] add password confirmation field
- [x] install bcrypt
- [x] hash password before storing it in database
- [x] start adding mechanism of hashing for updating the user
- [x] add new route to handle password change
- [x] create password compare function to know if the sent password is already
- [x] install jsonwebtokens
- [x] start with register
- [x] create createToken function
- [x] look for verify token function
- [x] go to login
- [x] protect(Authentication middleware) function
  - [x] check token exist
  - [x] validate token
  - [x] check userId is right or not
- [x] authorization middleware
- [x] Bearer token automatic
- [x] to handle forget password
  - [x] step 1 send reset code
  - [x] step 2 verify reset code and submit
  - [x] step 3 set new password
- sending emails using **nodeMailer**

10. Reviews

- [x] create review schema (title,rating,user,product)
- [x] CRUDS
- [x] CRUDS validation
- [x] Routes
- [x] create virtual property
- [x] nested route product/reviews
- [x] Aggregation Pipeline.

11. Wishlist

- [x] add product to wishList
- [x] remove product from wishList

12. Cart

- [x] coupon schema
- [x] controllers and router
- [x] cart schema
- [x] cart controller
  - [x] add product to cart by only user
  - different scenarios
  - [x] if no cart create one and add it
  - [x] if cart and not there add
  - [x] if cart and there count++
  - [x] if cart and there but different color add new item
- [x] cart routes

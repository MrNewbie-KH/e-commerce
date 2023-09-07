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
- [x] Task to refactor code in all places with the new apiFeatures class

**But** i'm not going to make this refactoring

<!-- 8. Refactoring using **Factory**
   -[] Delete one factory
   -[] Update one factory
   -[] Get single factory
   -[] Get all factory
   -[] Create one factory -->

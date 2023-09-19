1. Nested routes concept

- Nested routes is very easy
  we make it available in this way ->
  for example Get review through products
  host/api/v1/product/:someProductId/review
  find me all reviews on product which has this product id

2. In validation : we take actionin this way

- route path "/"
- fields to validate "rules"
- middleware for catching error if error occures in previous rules
- at validator functions inside an array we pass rules then we call the middleware itself

3. **Refactoring**

```js
const getAllProducts = async (req, res) => {
  // 1-filtering
  const queryFilter = { ...req.query };
  const excludeFromFilters = ["limit", "page", "sort", "fields"];
  excludeFromFilters.forEach((filter) => delete queryFilter[filter]);
  // to remove > < <= >= and add $
  let queryStr = JSON.stringify(queryFilter);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (matchElement) => `$${matchElement}`
  );
  queryStr = JSON.parse(queryStr);
  console.log(queryStr);
  // 2-pagination
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const dataToSkip = (page - 1) * limit;
  let mongooseQuery = productSchema
    .find(queryStr)
    .limit(limit)
    .skip(dataToSkip);
  // 3-sort
  let sort = "";
  if (req.query.sort) {
    sort = removeChar(req.query.sort, ",");
    console.log(sort);
  } else {
    sort = "createdAt";
  }
  mongooseQuery = mongooseQuery.sort(sort);
  // 4-apply some fields only to work "Limit fields"
  let fields = "";
  if (req.query.fields) {
    fields = removeChar(fields, ",");
  } else {
    fields = "-__v";
  }
  mongooseQuery = mongooseQuery.select(fields);
  // 5-searching keyword in title or description
  if (req.query.keyword) {
    const query = {
      $or: [
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ],
    };
    console.log(query);
    mongooseQuery = mongooseQuery.find(query);
  }
  // 6-call
  // const data = await productSchema
  //   .find(queryStr)
  //   .limit(limit)
  //   .skip(dataToSkip)
  //   .sort(sort)
  //   .select(fields)
  //   .find(query);
  const products = await mongooseQuery;
  res.status(200).json({ products, numOfHits: products.length });
};
```

4. File upload using multer

- Multer takes object that has destination
- when this is done, then it is automatically added a field in req.file || req.files
- multer has two different storage systems
  - disc storage and memeory storage
- multer filter is used to have specific type of files only that you can use

```js
const multerFilter = function (req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new BadRequestError("Type must be an image"), false);
  }
};
```

5. Image processing using sharp

- sharp need to have image as **input buffer** so we will use memory storage instead of disc storage in multer
- memory storage returns object as buffer
- So we use disk-storage in all times, but if it is needed to use buffer then we have to use memory storage
- using sharp is so easy

```js
sharp(inputBuffer).doSomeThing().(doAnotherThing)
```

- sharp is promise so we have to use async await with it
- ❌❌❌ Attention
- I've got big fat problem while working as i was trying to store image while no property called image in the req.body

6. Return image URL instead of image name for better front-end experience

- when we use upload.single() -> this returns in the req file property req.file
- when we use upload .array() -> this returns in the req files property req.files

7. Mechanism of working
   for example when creating new category

- we hit the route of /category
- go into uploadImage function which returns a new property in the request
- then we use sharp to handle the image processing functionality and here we manually add field name in the req.body to be used next in the controller itself

- it is bad to use confirm password as field in database as it doesn't matter to have it in database.

- It's better to use another route which is another route to handle password change

- reset code must be changed to string before saving to db as it gonna be encrypted

- Sending emails
  - first you look for a service which gonna play the role of transporter
  - define email options from to subject ...etc
  - send email itself

9. Aggregation pipelining

```js
reviewSchema.statics.calcAverageAndSum = function(productId){
await this.aggregate([
// 1) stage 1 matching
// 2) stage 2 grouping and applyig logic
// 3) change values in the this
])
}
```

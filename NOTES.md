1. Nested routes concept
2.
3. In validation : we take actionin this way

- route path "/"
- fields to validate "rules"
- middleware for catching error if error occures in previous rules
- at validator functions inside an array we pass rules then we call the middleware itself

- **Refactoring**

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

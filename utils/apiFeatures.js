const { removeChar } = require("./generalFunctions");
class ApiFeatures {
  constructor(mongooseQuery, queryStr) {
    this.mongooseQuery = mongooseQuery;
    this.queryStr = queryStr;
  }
  // 1-filtering
  filter() {
    const queryFilter = { ...this.queryStr };
    const excludeFromFilters = ["limit", "page", "sort", "fields"];
    excludeFromFilters.forEach((filter) => delete queryFilter[filter]);
    // to remove > < <= >= and add $
    let queryString = JSON.stringify(queryFilter);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matchElement) => `$${matchElement}`
    );
    queryString = JSON.parse(queryString);
    this.mongooseQuery = this.mongooseQuery.find(queryString);
    return this;
  }
  // 2-pagination
  paginate(numberOfDocs) {
    // next page, previous page
    const limit = parseInt(this.queryStr.limit) || 10;
    const page = parseInt(this.queryStr.page) || 1;
    const dataToSkip = (page - 1) * limit;
    // -----------------------
    // pagination object
    const pagination = {};
    pagination.page = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(numberOfDocs / limit);
    // check for next page
    if (page * limit < numberOfDocs) {
      pagination.nextPage = page + 1;
    }
    // check for last page
    if (dataToSkip > 0) {
      pagination.lastPage = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.limit(limit).skip(dataToSkip);
    this.paginationResults = pagination;
    return this;
  }
  sort() {
    // 3-sort
    let sort = "";
    if (this.queryStr.sort) {
      sort = removeChar(this.queryStr.sort, ",");
    } else {
      sort = "createdAt";
    }
    this.mongooseQuery = this.mongooseQuery.sort(sort);
    return this;
  }
  // 4-apply some fields only to work "Limit fields"
  limitFields() {
    let fields = "";
    if (this.queryStr.fields) {
      fields = removeChar(fields, ",");
    } else {
      fields = "-__v";
    }
    this.mongooseQuery = this.mongooseQuery.select(fields);
    return this;
  }
  // 5-searching keyword in title or description
  search() {
    if (this.queryStr.keyword) {
      const query = {
        $or: [
          { title: { $regex: this.queryStr.keyword, $options: "i" } },
          { description: { $regex: this.queryStr.keyword, $options: "i" } },
        ],
      };
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}
module.exports = ApiFeatures;

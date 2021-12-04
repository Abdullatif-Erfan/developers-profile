class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1)Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObj[el]);
    // console.log(req.query,queryObj);

    // 2)  Advanced Filtering
    // { name: 'Erfan', age: { $gte: 30 } }
    // { name: 'Erfan', age: { gte: 30 } }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this; // will be returned the entire object
  }
  sorts() {
    if (this.queryString.sort) {
      // sort(price,age)
      //   const sortBy = this.queryString.sort.split(",").json(" ");
      //   console.log(sortBy);
      //   query = query.sort(sortBy);
      this.query = this.query.sort(req.query.sort);
    } else {
      this.query = this.query.sort("createdAt"); // order DESC
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").json(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1; //multiply by one change string to number, || 1 = default value=1
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=3&limit=10, page1=1-10, p2=11-20, p3=21-30
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;

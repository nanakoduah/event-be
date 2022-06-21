const EVENT_DATE_FIELD = 'date';

class QueryHelper {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  cleanQueryParams() {
    const keysArray = ['page', 'sort', 'limit', 'fields'];
    const newObject = { ...this.queryObject };
    keysArray.forEach((key) => delete newObject[key]);

    let queryString = JSON.stringify(newObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    return JSON.parse(queryString);
  }

  pagination() {
    const { page: reqPage, limit: reqLimit } = this.queryObject;
    const page = reqPage * 1 || 1;
    const limit = reqLimit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  sort() {
    const { queryObject } = this;
    if (queryObject.sort) {
      this.query.sort(queryObject.sort);
    } else {
      this.query.sort(EVENT_DATE_FIELD);
    }

    return this;
  }

  filter() {
    this.query.find(this.cleanQueryParams());

    return this;
  }
}

module.exports = QueryHelper;

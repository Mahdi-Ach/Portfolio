export default function getCommentIndex(object:any, value:any) {
    return Object.keys(object).find(key => object[key] === value);
  }
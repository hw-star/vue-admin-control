/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 手机号校验 */
export function validId(str) {
  const phone =/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  return phone.test(str)
}
/* 电子邮箱校验 */
export function validEmail(str) {
  const email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return email.test(str)
}
/* 名字校验-汉字 */
export function validName(str){
  const name =/^[\u4e00-\u9fa5]{0,}$/;
  return name.test(str)
}
/* 非零正整数校验 */
export function validNumber(str){
  const number = /^[1-9]\d*$/;
  return number.test(str)
}

import { md5 } from 'utility'

const salt = 'dfg_4$*65_ZX4_&12'

export default class User {
  static encrypt (pwd) {
    return md5(md5(pwd + salt))
  }
  static shouldEqual (pwd, pwd2) {
    return md5(md5(pwd + salt)) === pwd2
  }
}
//thanks to https://github.com/jomcode/fcc-votingapp/blob/master/src/server/utilities/hash.js
import bcrypt from "bcryptjs"

const generateHash = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(8), null);
const isValidPassword = (pw, hashed) => bcrypt.compareSync(pw, hashed);

module.exports={
  generateHash,
  isValidPassword
}

const checkEmail = email => {
  let regex = /\S+@\S+\.\S{2,10}/
  return regex.test(email)
}

module.exports={
  checkEmail
}

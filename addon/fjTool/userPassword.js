var bCrypt = require('bcrypt-nodejs');

bCrypt.isValidPassword = function (user, password){
    return bCrypt.compareSync(password, user.password);
}
bCrypt.createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
module.exports=bCrypt;
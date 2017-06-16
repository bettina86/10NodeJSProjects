var mongoose = require('mongoose');
var bcrypt =  require('bcrypt');
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

// User Schema

var UserSchema = mongoose.Schema({
				username: {

					type: String,
					index: true
				},
				password: {
					type: String,
					required: true,
					bcrypt: true
				},
				email:{
					type: String
				},
				name:{
					type: String
				},
				profileimage:{
					type: String
				}
});



module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
var User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id, callback){
					
					User.findById(id, callback)

};


module.exports.getUserByUsername = function(username, callback){
					var query = {username: username};
					User.findOne(query, callback)

};


module.exports.createUser = function(newUser, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw err;
		// Set hashed Password
		newUser.password = hash;
		// Create user
		newUser.save(callback);
	});

}

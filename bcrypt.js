const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log(hash);
        // Store hash in your password DB.
    });
});


// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, "$2b$10$4dlbr.", function(err, result) {
    // result == true
    console.log(result);
});
bcrypt.compare(someOtherPlaintextPassword, 'not bacon', function(err, result) {
    // result == false
});

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./artist_album.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Conneccted to the SQLite database.')
    }
    
});
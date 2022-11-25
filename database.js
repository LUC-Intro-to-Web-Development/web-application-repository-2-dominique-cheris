var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./animedb.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
	  // Cannot open database
	  console.error(err.message)
	  throw err
	}else{
		//Successful database connection
		console.log('Connected to the SQLite database.') 
	}
});

// CREATE ANIME ITEM
let createItem = (animeID,anime_name,release_year,genre) =>{
	var createAnimeItem = 'INSERT INTO anime_items (animeID,anime_name,release_year,genre) VALUES (?,?,?,?)'
	var params = [animeID,anime_name,release_year,genre];

db.run(createAnimeItem,params,function(err){

	if(err){
		return console.log(err.message);
	}
	console.log("Anime Item Created");
	console.log('Rows inserted ${this.changes}');
	})
}


// UPDATE ANIME ITEM

let data = ['Bleach','Naruto'];
let sql = `UPDATE anime_items
		SET anime_name = ?
		WHERE anime_name = ?`;

		db.run(sql, data, function(err) {
		if(err){
			return console.error(err.message);
		}
		console.log(`Row(s) updated: ${this.changes}`);
		
	});

db.close();

// DISPLAY ALL ANIME 
let getAnime = () => {
	var getAllAnimeItems = 'SELECT animeID,anime_name,release_year,genre FROM anime_items';
	db.all(getAllAnimeItems,function(err,rows){
	if(err) {
		throw err;
	}
	console.log(rows);
})
}



// DELETE ANIME ITEM
let deleteItem = () => {
	var deleteAnimeItem = 'DELETE FROM anime_items WHERE animeID = ?';
	var params = [22];

db.run(deleteAnimeItem,params,function(err){

	if(err){
		return console.log(err.message);
	}
	console.log("Anime Item Deleted");
	console.log('Rows deleted ${this.changes}');
	})
}

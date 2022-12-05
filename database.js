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

/*
// CREATE ANIME ITEM - TRYING TO ADD CONSTRAIINT AND FLOAT TO RATING

let createItem = (animeID,anime_name,release_year,genre) =>{
	var createAnimeItem = `INSERT INTO anime_items(
		anime_name,release_year,genre,rating(nu),
		CHECK rating(nu) <= 10.0
		VALUES (?,?,?,?)`
	var params = [animeID,anime_name,release_year,genre];

db.run(createAnimeItem,params,function(err){

	if(err){
		return console.log(err.message);
	}
	console.log("Anime Item Created");
	console.log('Rows inserted ${this.changes}');
	})

}
*/

// CREATE ANIME ITEM
let createItem = (animeID,anime_name,release_year,genre,res) =>{
	var createAnimeItem = `INSERT INTO anime_items(anime_name,release_year,genre,rating) VALUES (?,?,?,?)`
	var params = [animeID,anime_name,release_year,genre];

db.run(createAnimeItem,params,function(err){

	if(err){
		return console.log(err.message);
	}
	getAllAnimeItems(res);
	})

}

//createItem('Attack on Titans',2013,'Fantasy',9.6);


// UPDATE ANIME ITEM
/*
let data = ['Adventure','Naruto'];
let sql = `UPDATE anime_items SET 
        genre = ?,
        anime_name = ?,
        description = ?,
        

		WHERE animeID = ?`;

		db.run(sql, data, function(err) {
		if(err){
			return console.error(err.message);
		}
		console.log(`Row(s) updated: ${this.changes}`);
		
	});

db.close();
*/
/*
let sql = `UPDATE anime_items
          SET genre = '?'
		  WHERE anime_name = '?';`
		  db.run(sql, function(err) {
			if(err){
				return console.error(err.message);
			}
			console.log(`Row(s) updated: ${this.changes}`);
			
		});
*/

let sql = updateItem = `UPDATE anime_items
		SET rating = '?'
		WHERE anime_name = '?';`
		db.run(sql, function(err) {
		  if(err){
			  return console.error(err.message);
		  }
		  console.log(`Row(s) updated: ${this.changes}`);
		  
	  });
	

// DISPLAY ALL ANIME 
let getAnime = (res) => {
	var getAllAnimeItems = 'SELECT animeID,anime_name,release_year,genre FROM anime_items';
	db.all(getAllAnimeItems,function(err,rows){
	if(err) {
		throw err;
	}
	console.log(rows);
	res.render('index', {rows})
	});

}



// DELETE ANIME ITEM
let deleteItem = () => {
	var deleteAnimeItem = 'DELETE FROM anime_items WHERE animeID = ?';
	var params = [1];

db.run(deleteAnimeItem,params,function(err){

	if(err){
		return console.log(err.message);
	}
	console.log("Anime Item Deleted");
	console.log('Rows deleted ${this.changes}');
	});
}


module.exports = {createItem,updateItem,getAnime,deleteItem}
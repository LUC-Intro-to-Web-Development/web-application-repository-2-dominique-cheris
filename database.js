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
let createItem = (anime_name,release_year,genre,rating,description,res) =>{
    var createAnimeItem = `INSERT INTO anime_items (anime_name,release_year,genre,rating,description) VALUES (?,?,?,?,?)` //  PARAMETERIZED QUERY
    var params = [anime_name,release_year,genre,rating,description];

    db.run(createAnimeItem,params,function(err){
    
        if(err){
            return console.log(err.message);
        }
        getAnime(res);
        })
    
    }

// DISPLAY A ANIME ITEM
let getAItem = (id, res) => {
    var getAnimeItem = 'SELECT animeID,anime_name,release_year,genre,rating,description FROM anime_items WHERE animeID = ?';
    var params = [id];
    db.get(getAnimeItem, params, function(err, row){
        if (err) {
         
            throw err;
          }
          
          console.log(row);
          res.render('update', {row});

    })
    
}

// DISPLAY ALL ANIME 
let getAnime = (res) => {
    var getAllAnimeItems = 'SELECT animeID,anime_name,release_year,genre,rating,description FROM anime_items';
    db.all(getAllAnimeItems, function(err, rows){
        if (err) {
         
            throw err;
          }
          console.log(rows);
		res.render('index', {rows})
    })
    
}

// UPDATE ANIME ITEM

var updateItem = (updatesAnimeItem,res) =>{
    var updateAnimeItem = 'UPDATE anime_items SET anime_name = ?, release_year = ?, genre = ?, rating = ?, description =?  WHERE animeID = ?';
    var params = [updatesAnimeItem.anime_name,updatesAnimeItem.release_year,updatesAnimeItem.genre,updatesAnimeItem.rating,updatesAnimeItem.description,updatesAnimeItem.animeID];

    db.run(updateAnimeItem,params,function(err){

		if (err){
			return console.log(err.message);
		}
    

        console.log("Grocery Item Updated");
        console.log(`Rows updated ${this.changes}`);
      });

      getAnime(res);
}

/*
var confirmUpdate = (updaterecord,res) => {
    var getConfirmUpdate = 'UPDATE `anime_items` SET animeID = ? anime_name = ? release_year = ? genre = ? rating = ? description = ?, WHERE animeID = ?';

	// UPDATE SQL STATEMENT HERE. PARAMETERS OF THE NEW VALUES
    var params = [updaterecord.animeID, updaterecord.anime_name,updaterecord.release_year, updaterecord.genre,updaterecord.rating, updaterecord.description]
    db.run(getConfirmUpdate,[res.body, res.params],function(err,row){

        if(err){
            return console.log(err.message);
        }
        console.log("Anime Item Updated");
		res.render('update', {row});
        });
       
       getAnime(res);
}

*/
// DELETE ANIME ITEM
let deleteItem = (recordToDelete,res) =>{
    var deleteAnimeItem = 'DELETE FROM anime_items WHERE animeID = ?';
    var params = [recordToDelete];
    db.run(deleteAnimeItem,params,function(err){

        if(err){
            return console.log(err.message);
        }
        console.log("Anime Item Deleted");
        console.log('Rows deleted ${this.changes}');
        });
    
       getAnime(res);
    }

    
    
    module.exports = {createItem,updateItem,getAnime,getAItem,deleteItem}


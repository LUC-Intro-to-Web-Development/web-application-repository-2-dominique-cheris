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
    var createAnimeItem = `INSERT INTO anime_items(anime_name,release_year,genre,rating,description) VALUES (?,?,?,?,?)` //  PARAMETERIZED QUERY
    var params = [anime_name,release_year,genre,rating,description];

    db.run(createAnimeItem,params,function(err){
    
        if(err){
            return console.log(err.message);
        }
        getAnime(res);
        })
    
    }


// DISPLAY ALL ANIME 
let getAnime = (res) => {
    var getAllAnimeItems = 'SELECT animeID,anime_name,release_year,genre,rating,description FROM anime_items';
    db.all(getAllAnimeItems, function(err, rows){
        if (err) {
         
            throw err;
          }
          else {
          console.log(rows);
		res.render('index', {rows})
          }
    })
    
}

// UPDATE ANIME ITEM

var updateItem = (updaterecord,res) =>{
    var updateAnimeItem = 'SELECT animeID, anime_name, release_year, genre, rating, description FROM anime_items WHERE animeID = ?';
    var params = [updaterecord];

	db.get(updateAnimeItem,params, function(err,row){
		if (err){
			throw err;
		}
       
        console.log(row);
      res.render('update', {row});
	})
}

var confirmUpdate = (updaterecord,res) => {
    var getConfirmUpdate = // UPDATE SQL STATEMENT HERE. PARAMETERS OF THE NEW VALUES
    var params = [updaterecord.animeID, updaterecord.anime_name,updaterecord.release_year, updaterecord.genre,updaterecord.rating, updaterecord.description]
    db.run(deleteAnimeItem,params,function(err){

        if(err){
            return console.log(err.message);
        }
        console.log("Anime Item Deleted");
        console.log('Rows deleted ${this.changes}');
        });
       
       getAnime(res);
}

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
       // NEED TO RELOAD PAGE TO SHOW DELETION.
       getAnime(res);
    }

    
    
    module.exports = {createItem,updateItem,getAnime,deleteItem,confirmUpdate}


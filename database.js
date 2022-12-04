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
let createItem = (anime_name,release_year,genre,rating,res) =>{
    var createAnimeItem = `INSERT INTO anime_items(anime_name,release_year,genre,rating) VALUES (?,?,?,?)` //  PARAMETERIZED QUERY
    var params = [anime_name,release_year,genre,rating];

    db.run(createAnimeItem,params,function(err){
    
        if(err){
            return console.log(err.message);
        }
        getAnime(res);
        })
    
    }


// DISPLAY ALL ANIME 
let getAnime = (res) => {
    var getAllAnimeItems = 'SELECT animeID,anime_name,release_year,genre,rating FROM anime_items';
    db.all(getAllAnimeItems, function(err, rows){
        if (err) {
         
            throw err;
          }
          console.log(rows);
		res.render('index', {rows})

    })

}

// UPDATE ANIME ITEM

let updateItem = (recordToUpdate,res) =>{
    var updateAnimeItem = 'UPDATE anime_items SET anime_name = ? WHERE animeID = ?';
    var params = [recordToUpdate];

	db.run(updateAnimeItem, function(err){
		if (err){
			return console.log(err.message);
		}
    

        console.log("Anime Updated");
        console.log(`Rows updated ${this.changes}`);
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
    }
    
    
    module.exports = {createItem,updateItem,getAnime,deleteItem}


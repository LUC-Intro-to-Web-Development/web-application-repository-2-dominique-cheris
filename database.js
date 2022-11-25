var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./artist_album.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
	  // Cannot open database
	  console.error(err.message)
	  throw err
	}else{
		//Successful database connection
		console.log('Connected to the SQLite database.') 
	}
});

//Get Artist and Album
let getAllArtistAndAlbums = (res) =>{
	//var getArtistAndAlbumSQL = 'SELECT ?,?,?,?,? FROM Album INNER JOIN artist ON Album.album_artistID = Artist.artistID';
	var getArtistAndAlbumSQL = 'SELECT artistID,artist_name,album_name,album_release_year,album_genre FROM Album INNER JOIN artist ON Album.album_artistID = Artist.artistID';
	var params =["artistID","artist_name", "album_name", "album_release_year", "album_genre"];

	db.all(getArtistAndAlbumSQL, (err, rows) => {
		if (err) {
		 
		  throw err;
		}
		res.render('index', {rows})
		
		/**rows.forEach((row) => {
		  console.log(row.album_name);
		});*/
	});
}

//Create a Artist
let createArtist = (artistalbum) =>{
	var createArtistSql ='INSERT INTO Artist (artist_name) VALUES (?)' //Paramaterized Query
	var params =[artistalbum.artistName];

	db.run(createArtistSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("Artist Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});

	getArtist(artistalbum);

}

//Return a Artist
let getArtist = (artistalbum) =>{
	var getArtistSql ="SELECT artistID, artist_name FROM Artist WHERE artist_name = ?"; //Paramaterized Query
	var params =[artistalbum.artistName];
	console.log(artistalbum.artistName);
	//var params=['Michael Jackson'];

	db.get(getArtistSql, params, async function(err, row){
		if (err){
			return console.log(err.message);
		}
		console.log(row);
		//Create Album once we receive the returned ID
	   await createAlbum(artistalbum, row.artistID);
		  
	});
}

//Create a Album
let createAlbum = (album, artistID) =>{
	var createAlbumSql ='INSERT INTO Album(album_name,album_release_year,album_genre,album_artistID) VALUES (?,?,?,?)' //Paramaterized Query
	var params =[ album.albumTitle,album.albumRelease,album.albumGenre,artistID];
	


	db.run(createAlbumSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("Album Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});

}

//Update record
let deleteRecord = (id) =>{
	console.log("Delete Record Function triggered");
	//var deleteArtistAndAlbumSql ='DELETE FROM Album WHERE album_artistID= ?' //Paramaterized Query
	var deleteArtistAndAlbumSql = 'DELETE Artist FROM Artist INNER JOIN artist ON Album.album_artistID = Artist.artistID WHERE Album.album_artistID = ?';
	var params =[id];

	db.run(deleteArtistAndAlbumSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
	

		console.log("Album and Artist Deleted");
		console.log(`Rows deleted ${this.changes}`);	  
	});
}

//Export functions to be used in other areas of program.
module.exports = {getAllArtistAndAlbums, createArtist, getArtist, deleteRecord, createAlbum}
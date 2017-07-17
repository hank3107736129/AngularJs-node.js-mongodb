'use strict';
var express = require('express');
var router = express.Router();
var User = require('./users/users');
var mongoose   = require('mongoose');
mongoose.connect('xxxxxxxxx');

router.get('/', function(req, res) {
	// Send a plain text response
	res.send('Welcome to User Route!');
});

router.get('/newuser', function(req, res) {
	// Send a plain text response
	res.send('New User');
});
router.get('/getAllUsers',function(req,res){
	User.find(function(err,users){
		if(err){
			res.send(err);
		}
		console.log(users[0]._id);
		res.json(users[0].users);
		

	});
	
}).
get('/getUsersByID/:id',function(req,res){
	User.find(function(err,users){
		if(err){
			res.send(err);
		}

		var id = req.url.slice(14);
	var i;
	var check = false;
		var temp;
	 for(i=0;i<users[0].users.length;i++){
	 	if(users[0].users[i].id == id){
              temp=i;  
              check=true;
	 	}
	 }
	if(check ===false){
		res.send('wrong id input');
	}
	else{
		
	res.send(users[0].users[temp]);
    }

	});
	

}).
post('/',function(req,res){
User.find(function(err,users){
		if(err){
			
		}
		
			//var usr = new User();
			var newID=users[0].id + 1;

			var objID = mongoose.Types.ObjectId(users[0]._id);
			//var temp_usr = users[0].users;

			console.log(users[0]._id);

			    
			    var userobj = new Object();
			    userobj.id = newID;
                userobj.fName = req.body.fName;
                userobj.lName = req.body.lName;
                userobj.title = req.body.title;
                userobj.sex = req.body.sex;
                userobj.age = req.body.age;
                //temp_usr.push(userobj);

           
                //usr.usrs = temp_usr;

                // User.update({_id:objID},{$set:{id:newID}}, function(err){

                // });

                User.update(
                    
                    {"_id":objID },
                    {"$set":{"id":newID},"$push":{"users":userobj} },
                    function(err,numAffected){
                    	if(err){

                    	}
                    	else{
                          res.send("work");
                    	}
                    }
                    
                	);
    

	});
		
	
}).
put('/updateByID/:id',function(req,res){


	var id = req.url.slice(12);

	User.find(function(err,users){
		if(err){
			
		}
		var temp_usr = users[0].users;
		var objID = mongoose.Types.ObjectId(users[0]._id);
	//var id = req.url.slice(12);
	var i;
	var check = false;
		var temp;
	 for(i=0;i<users[0].users.length;i++){
	 	if(users[0].users[i].id == id){
              temp=i;  
              check=true;
	 	}
	 }
	if(check ===false){
		res.send('wrong id input');
	}
	else{
    temp_usr[temp].id = id;
	temp_usr[temp].fName =req.body.fName;
	temp_usr[temp].lName =req.body.lName;
	temp_usr[temp].title =req.body.title;
	temp_usr[temp].sex =req.body.sex;
	temp_usr[temp].age =req.body.age;
	//res.send(users.users);
    }
    


     User.update(
                    
                    {"_id":objID},
                    {"$set":{"users":temp_usr} },
                    function(err,numAffected){
                    	if(err){

                    	}
                    	else{
                          res.send("work");
                    	}
                    }
                    
                	);

    });
     
}).
delete('/deleteUsersByID/:id',function(req,res){


	var id = req.url.slice(17);

	User.find(function(err,users){
		if(err){
			
		}
		
			//var usr = new User();
			var id_seed=users[0].id;
			console.log(id);
			console.log(id_seed);
			var temp_usr = users[0].users;

			var objID = mongoose.Types.ObjectId(users[0]._id);
            console.log(objID);
	var i;
	var check = false;
		var temp;
	 for(i=0;i<users[0].users.length;i++){
	 	if(users[0].users[i].id == id){
              temp=i;  
              check=true;
	 	}
	 }
	if(check ===false){
		res.send('wrong id input');
	}
	else{
		
	temp_usr.splice(temp,1);
	// res.send(users.users);
    }
     


   User.update(
                    
                    {"_id":objID},
                    {"$set":{"users":temp_usr} },
                    function(err,numAffected){
                    	if(err){

                    	}
                    	else{
                          res.send("work");
                    	}
                    }
                    
                	);



	});


})

router.get('/DeleteUser', function(req, res) {
	res.render('Delete User');
});


module.exports = router;


Comments = new Mongo.Collection("comments");

//
//      Setup Security on Inmages Collection
//
//  

Comments.allow({

    insert: function(userId, doc) {
            console.log("Testing Security on comments collection");
            if (Meteor.user()) {
            	 return true;
                console.log(doc);
            } else{
            	 return false;
            }
            
        } ,// Insert
        update: function(userId, doc) {
            console.log("Testing Security on comments collection");
            if (Meteor.user()) {
            	 return true;
                console.log(doc);
            } else{
            	 return false;
            }
            
        } // update



}); // END of ALLOW
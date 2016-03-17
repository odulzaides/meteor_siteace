Websites = new Mongo.Collection("websites");

//
//      Setup Security on Inmages Collection
//
//  

Websites.allow({

    insert: function(userId, doc) {
            console.log("Testing Security on Websites collection");
            if (Meteor.user()) {
            	 return true;
                console.log(doc);
            } else{
            	 return false;
            }
            
        } ,// Insert
        update: function(userId, doc) {
            console.log("Testing Security on Websites collection");
            if (Meteor.user()) {
            	 return true;
                console.log(doc);
            } else{
            	 return false;
            }
            
        } // update



}); // END of ALLOW
//TODO  - fix update issue.
	//Date - 
       
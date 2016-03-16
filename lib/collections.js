Websites = new Mongo.Collection("websites");

//
//      Setup Security on Inmages Collection
//
Websites.allow({

    insert: function(userId, doc) {
            console.log("Testing Security on Websites collection");
            if (Meteor.user()) {
                console.log(doc);
            }
            return true;
        } // Insert


}); // END of ALLOW

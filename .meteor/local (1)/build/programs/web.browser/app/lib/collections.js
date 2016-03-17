(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Websites = new Mongo.Collection("websites");                           // 1
                                                                       //
//                                                                     //
//      Setup Security on Inmages Collection                           //
//                                                                     //
//                                                                     //
                                                                       //
Websites.allow({                                                       // 8
                                                                       //
    insert: function (userId, doc) {                                   // 10
        console.log("Testing Security on Websites collection");        // 11
        if (Meteor.user()) {                                           // 12
            return true;                                               // 13
            console.log(doc);                                          // 14
        } else {                                                       //
            return false;                                              // 16
        }                                                              //
    }, // Insert                                                       //
    update: function (userId, doc) {                                   // 20
        console.log("Testing Security on Websites collection");        // 21
        if (Meteor.user()) {                                           // 22
            return true;                                               // 23
            console.log(doc);                                          // 24
        } else {                                                       //
            return false;                                              // 26
        }                                                              //
    } // update                                                        //
                                                                       //
}); // END of ALLOW                                                    //
//TODO  - fix update issue.                                            //
//Date -                                                               //
/////////////////////////////////////////////////////////////////////////

}).call(this);

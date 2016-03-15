(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// siteace.js                                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Websites = new Mongo.Collection("websites");                           // 1
                                                                       //
if (Meteor.isClient) {                                                 // 3
                                                                       //
    //Session.set("imageLimit", 8);                                    //
    //                                                                 //
    //lastScrollTop = 0;                                               //
    //$(window).scroll(function (event) {                              //
    //    // test if we are near the bottom of the window              //
    //    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    //        // where are we in the page?                             //
    //        var scrollTop = $(this).scrollTop();                     //
    //        // test if we are going down                             //
    //        if (scrollTop > lastScrollTop) {                         //
    //            // yes we are heading down...                        //
    //            Session.set("imageLimit", Session.get("imageLimit") + 4);
    //        }                                                        //
    //                                                                 //
    //        lastScrollTop = scrollTop;                               //
    //    }                                                            //
    //                                                                 //
    //})                                                               //
                                                                       //
    Accounts.ui.config({                                               // 24
        passwordSignupFields: "USERNAME_AND_EMAIL"                     // 25
    });                                                                //
                                                                       //
    /////                                                              //
    // template helpers                                                //
    /////                                                              //
                                                                       //
    // helper function that returns all available websites             //
    Template.website_list.helpers({                                    // 35
        websites: function () {                                        // 36
            return Websites.find({});                                  // 37
        },                                                             //
        getUser: function (user_id) {                                  // 39
            var user = Meteor.users.findOne({ _id: user_id });         // 40
            if (user) {                                                // 41
                return user.username;                                  // 42
            } else {                                                   //
                return "Anonymous internet user";                      // 44
            }                                                          //
        }                                                              //
    });                                                                //
                                                                       //
    Template.body.helpers({                                            // 49
        username: function () {                                        // 50
            if (Meteor.user()) {                                       // 51
                return Meteor.user().username;                         // 52
                //return Meteor.user().emails[0].address;              //
            } else {                                                   //
                    return "anonymous internet user";                  // 57
                }                                                      //
        }                                                              //
    });                                                                //
                                                                       //
    /////                                                              //
    // template events                                                 //
    /////                                                              //
                                                                       //
    Template.website_item.events({                                     // 68
        "click .js-upvote": function (event) {                         // 69
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)             //
            var website_id = this._id;                                 // 72
            console.log("Up voting website with id " + website_id);    // 73
            //                                                         //
            // TODO - put the code in here to add a vote to a website!
                                                                       //
            return false; // prevent the button from reloading the page
        },                                                             //
        "click .js-downvote": function (event) {                       // 79
                                                                       //
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)             //
            var website_id = this._id;                                 // 83
            console.log("Down voting website with id " + website_id);  // 84
                                                                       //
            // TODO - put the code in here to remove a vote from a website!
                                                                       //
            return false; // prevent the button from reloading the page
        }                                                              //
    });                                                                //
                                                                       //
    Template.website_form.events({                                     // 92
        "click .js-toggle-website-form": function (event) {            // 93
            $("#website_form").toggle('slow');                         // 94
        },                                                             //
        "submit .js-save-website-form": function (event) {             // 96
                                                                       //
            // here is an example of how to get the url out of the form:
            var url = event.target.url.value;                          // 99
            var title = event.target.title.value;                      // 100
            var description = event.target.description.value;          // 101
            console.log("The url they entered is: " + url);            // 102
                                                                       //
            //  TODO - put your website saving code in here!           //
            if (Meteor.user()) {                                       // 105
                Websites.insert({                                      // 106
                    url: url,                                          // 107
                    title: title,                                      // 108
                    description: description,                          // 109
                    createdOn: new Date(),                             // 110
                    createdBy: Meteor.user()._id                       // 111
                });                                                    //
                $("#url").val(" ");                                    // 113
                $("#title").val(" ");                                  // 114
                $("#description").val(" ");                            // 115
                $("#website_form").toggle('slow');                     // 116
                                                                       //
                return false;                                          // 118
            }                                                          //
                                                                       //
            return false; // stop the form submit from reloading the page
        }                                                              //
    });                                                                //
}                                                                      //
                                                                       //
if (Meteor.isServer) {                                                 // 129
    // start up function that creates entries in the Websites databases.
    Meteor.startup(function () {                                       // 131
        // code to run on server at startup                            //
        if (!Websites.findOne()) {                                     // 133
            console.log("No websites yet. Creating starter data.");    // 134
            Websites.insert({                                          // 135
                title: "Goldsmiths Computing Department",              // 136
                url: "http://www.gold.ac.uk/computing/",               // 137
                description: "This is where this course was developed.",
                createdOn: new Date()                                  // 139
            });                                                        //
            Websites.insert({                                          // 141
                title: "University of London",                         // 142
                url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
                description: "University of London International Programme.",
                createdOn: new Date()                                  // 145
            });                                                        //
            Websites.insert({                                          // 147
                title: "Coursera",                                     // 148
                url: "http://www.coursera.org",                        // 149
                description: "Universal access to the world’s best education.",
                createdOn: new Date()                                  // 151
            });                                                        //
            Websites.insert({                                          // 153
                title: "Google",                                       // 154
                url: "http://www.google.com",                          // 155
                description: "Popular search engine.",                 // 156
                createdOn: new Date()                                  // 157
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

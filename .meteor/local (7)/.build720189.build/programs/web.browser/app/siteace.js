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
    Session.set("websiteLimit", 8);                                    // 5
                                                                       //
    lastScrollTop = 0;                                                 // 8
    $(window).scroll(function (event) {                                // 9
                                                                       //
        // test if we are near the bottom of the window                //
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            // where are we in the page?                               //
            var scrollTop = $(this).scrollTop();                       // 14
            // test if we are going down                               //
            if (scrollTop > lastScrollTop) {                           // 16
                // yes we are heading down...                          //
                console.log("We are heading down");                    // 18
                Session.set("websiteLimit", Session.get("websiteLimit") + 4);
            }                                                          //
                                                                       //
            lastScrollTop = scrollTop;                                 // 22
        }                                                              //
    });                                                                //
                                                                       //
    Accounts.ui.config({                                               // 27
        passwordSignupFields: "USERNAME_AND_EMAIL"                     // 28
    });                                                                //
                                                                       //
    /////                                                              //
    // template helpers                                                //
    /////                                                              //
                                                                       //
    // helper function that returns all available websites             //
    Template.website_list.helpers({                                    // 38
        websites: function () {                                        // 39
            return Websites.find({});                                  // 40
        }                                                              //
                                                                       //
    });                                                                //
                                                                       //
    Template.body.helpers({                                            // 45
        username: function () {                                        // 46
            if (Meteor.user()) {                                       // 47
                return Meteor.user().username;                         // 48
                //return Meteor.user().emails[0].address;              //
            } else {                                                   //
                    return "anonymous internet user";                  // 53
                }                                                      //
        }                                                              //
    });                                                                //
    Template.website_item.helpers({                                    // 57
        getUser: function (user_id) {                                  // 58
            var user = Meteor.users.findOne({ _id: user_id });         // 59
            console.log(user);                                         // 60
            if (user) {                                                // 61
                return user.username;                                  // 62
            } else {                                                   //
                return "Anonymous internet user";                      // 64
            }                                                          //
        },                                                             //
        getDate: function (createdOn) {                                // 67
            var date = createdOn; //new Date();                        // 68
            var createDate = moment(date).format("MM/DD/YY");          // 69
            return createDate;                                         // 70
        },                                                             //
        getTime: function (createdOn) {                                // 72
            var date = createdOn;                                      // 73
            var createTime = moment(date).format("h:hh A");            // 74
            return createTime;                                         // 75
        },                                                             //
        getUpVote: function (upVote) {                                 // 77
            var website_id = this._id;                                 // 78
            Websites.findOne({ _id: website_id });                     // 79
        },                                                             //
        getDownVote: function () {}                                    // 82
    });                                                                //
                                                                       //
    /////                                                              //
    // template events                                                 //
    /////                                                              //
                                                                       //
    Template.website_item.events({                                     // 93
        "click .js-upvote": function (event) {                         // 94
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)             //
            var website_id = this._id;                                 // 97
            console.log("Up voting website with id " + website_id);    // 98
            //                                                         //
            // TODO - put the code in here to add a vote to a website!
            Websites.update({ _id: website_id }, { $inc: { upvote: +1 } }); // for a vote UP
                                                                       //
            return false; // prevent the button from reloading the page
        },                                                             //
        "click .js-downvote": function (event) {                       // 105
                                                                       //
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)             //
            var website_id = this._id;                                 // 109
            console.log("Down voting website with id " + website_id);  // 110
                                                                       //
            // TODO - put the code in here to remove a vote from a website!
            Websites.update({ _id: website_id }, { $inc: { downvote: +1 } });
                                                                       //
            return false; // prevent the button from reloading the page
        }                                                              //
    });                                                                //
                                                                       //
    Template.website_form.events({                                     // 119
        "click .js-toggle-website-form": function (event) {            // 120
            $("#website_form").toggle('slow');                         // 121
        },                                                             //
        "submit .js-save-website-form": function (event) {             // 123
                                                                       //
            // here is an example of how to get the url out of the form:
            var url = event.target.url.value;                          // 126
            var title = event.target.title.value;                      // 127
            var description = event.target.description.value;          // 128
            console.log("The url they entered is: " + url);            // 129
                                                                       //
            //  TODO - put your website saving code in here!           //
            if (Meteor.user()) {                                       // 132
                var date = new Date();                                 // 133
                Websites.insert({                                      // 134
                    url: url,                                          // 135
                    title: title,                                      // 136
                    description: description,                          // 137
                    createdOn: date,                                   // 138
                    createdBy: Meteor.user()._id,                      // 139
                    upVote: 0,                                         // 140
                    downVote: 0                                        // 141
                });                                                    //
                                                                       //
                $("#url").val(" ");                                    // 145
                $("#title").val(" ");                                  // 146
                $("#description").val(" ");                            // 147
                $("#website_form").toggle('slow');                     // 148
                                                                       //
                return false;                                          // 150
            }                                                          //
                                                                       //
            return false; // stop the form submit from reloading the page
        }                                                              //
    });                                                                //
}                                                                      //
var date = Date();                                                     // 159
                                                                       //
if (Meteor.isServer) {                                                 // 161
    // start up function that creates entries in the Websites databases.
    Meteor.startup(function () {                                       // 163
        // code to run on server at startup                            //
        if (!Websites.findOne()) {                                     // 165
            console.log("No websites yet. Creating starter data.");    // 166
            Websites.insert({                                          // 167
                title: "Goldsmiths Computing Department",              // 168
                url: "http://www.gold.ac.uk/computing/",               // 169
                description: "This is where this course was developed.",
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 171
                upvote: 0,                                             // 172
                downvote: 0                                            // 173
            });                                                        //
            Websites.insert({                                          // 175
                title: "University of London",                         // 176
                url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
                description: "University of London International Programme.",
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 179
                upvote: 0,                                             // 180
                downvote: 0                                            // 181
            });                                                        //
            Websites.insert({                                          // 183
                title: "Coursera",                                     // 184
                url: "http://www.coursera.org",                        // 185
                description: "Universal access to the world’s best education.",
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 187
                upvote: 0,                                             // 188
                downvote: 0                                            // 189
            });                                                        //
            Websites.insert({                                          // 191
                title: "Google",                                       // 192
                url: "http://www.google.com",                          // 193
                description: "Popular search engine.",                 // 194
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 195
                upvote: 0,                                             // 196
                downvote: 0                                            // 197
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

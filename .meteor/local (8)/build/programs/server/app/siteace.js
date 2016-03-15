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
            // console.log(user);                                      //
            if (user) {                                                // 61
                return user.username;                                  // 62
            } else {                                                   //
                return "Anonymous internet user";                      // 64
            }                                                          //
        },                                                             //
        getDate: function (createdOn) {                                // 67
                                                                       //
            var date = createdOn; //new Date();                        // 69
            var createDate = moment(date).format("MM/DD/YY");          // 70
            return createDate;                                         // 71
        },                                                             //
        getTime: function (createdOn) {                                // 73
            console.log(createdOn);                                    // 74
            var time_date = createdOn;                                 // 75
            var createTime = moment(time_date).format("h:hh A");       // 76
            console.log(createTime);                                   // 77
            return createTime;                                         // 78
        }                                                              //
    });                                                                //
                                                                       //
    /////                                                              //
    // template events                                                 //
    /////                                                              //
                                                                       //
    Template.website_item.events({                                     // 88
        "click .js-upvote": function (event) {                         // 89
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)             //
            var website_id = this._id;                                 // 92
            console.log("Up voting website with id " + website_id);    // 93
            //                                                         //
            // TODO - put the code in here to add a vote to a website!
            Websites.update({ _id: website_id }, { $inc: { upvote: +1 } }); // for a vote UP
                                                                       //
            return false; // prevent the button from reloading the page
        },                                                             //
        "click .js-downvote": function (event) {                       // 100
                                                                       //
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)             //
            var website_id = this._id;                                 // 104
            console.log("Down voting website with id " + website_id);  // 105
                                                                       //
            // TODO - put the code in here to remove a vote from a website!
            Websites.update({ _id: website_id }, { $inc: { downvote: +1 } });
                                                                       //
            return false; // prevent the button from reloading the page
        }                                                              //
    });                                                                //
                                                                       //
    Template.website_form.events({                                     // 114
        "click .js-toggle-website-form": function (event) {            // 115
            $("#website_form").toggle('slow');                         // 116
        },                                                             //
        "submit .js-save-website-form": function (event) {             // 118
                                                                       //
            // here is an example of how to get the url out of the form:
            var url = event.target.url.value;                          // 121
            var title = event.target.title.value;                      // 122
            var description = event.target.description.value;          // 123
            console.log("The url they entered is: " + url);            // 124
                                                                       //
            //  TODO - put your website saving code in here!           //
            if (Meteor.user()) {                                       // 127
                var date = new Date();                                 // 128
                Websites.insert({                                      // 129
                    url: url,                                          // 130
                    title: title,                                      // 131
                    description: description,                          // 132
                    createdOn: date,                                   // 133
                    createdBy: Meteor.user()._id,                      // 134
                    upVote: 0,                                         // 135
                    downVote: 0                                        // 136
                });                                                    //
                                                                       //
                $("#url").val(" ");                                    // 140
                $("#title").val(" ");                                  // 141
                $("#description").val(" ");                            // 142
                $("#website_form").toggle('slow');                     // 143
                                                                       //
                return false;                                          // 145
            }                                                          //
                                                                       //
            return false; // stop the form submit from reloading the page
        }                                                              //
    });                                                                //
}                                                                      //
var date = Date();                                                     // 154
                                                                       //
if (Meteor.isServer) {                                                 // 156
    // start up function that creates entries in the Websites databases.
    Meteor.startup(function () {                                       // 158
        // code to run on server at startup                            //
        if (!Websites.findOne()) {                                     // 160
            console.log("No websites yet. Creating starter data.");    // 161
            Websites.insert({                                          // 162
                title: "Goldsmiths Computing Department",              // 163
                url: "http://www.gold.ac.uk/computing/",               // 164
                description: "This is where this course was developed.",
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 166
                upvote: 0,                                             // 167
                downvote: 0                                            // 168
            });                                                        //
            Websites.insert({                                          // 170
                title: "University of London",                         // 171
                url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
                description: "University of London International Programme.",
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 174
                upvote: 0,                                             // 175
                downvote: 0                                            // 176
            });                                                        //
            Websites.insert({                                          // 178
                title: "Coursera",                                     // 179
                url: "http://www.coursera.org",                        // 180
                description: "Universal access to the world’s best education.",
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 182
                upvote: 0,                                             // 183
                downvote: 0                                            // 184
            });                                                        //
            Websites.insert({                                          // 186
                title: "Google",                                       // 187
                url: "http://www.google.com",                          // 188
                description: "Popular search engine.",                 // 189
                createdOn: moment(date).format("MM/DD/YY h:hh A"),     // 190
                upvote: 0,                                             // 191
                downvote: 0                                            // 192
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=siteace.js.map

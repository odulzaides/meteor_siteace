(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/main.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/// routing                                                            //
Router.configure({                                                     // 2
    'layoutTemplate': 'app_layout'                                     // 3
}); ///App Layout                                                      //
                                                                       //
/// home '/'                                                           //
Router.route('/', function () {                                        // 7
    this.render('nav', {                                               // 8
        to: "navbar"                                                   // 9
    });                                                                //
    this.render('welcome', {                                           // 11
        to: "main"                                                     // 12
    });                                                                //
});                                                                    //
                                                                       //
/// Website List                                                       //
Router.route('/website_list', function () {                            // 17
    this.render('nav', {                                               // 18
        to: "navbar"                                                   // 19
    });                                                                //
    this.render('website_main_list', {                                 // 21
        to: "main"                                                     // 22
    });                                                                //
});                                                                    //
                                                                       //
/// Website Detail                                                     //
Router.route('/comments/:_id', function () {                           // 27
    this.render('nav', {                                               // 28
        to: "navbar"                                                   // 29
    });                                                                //
    this.render('comments', {                                          // 31
        to: "main",                                                    // 32
        data: function () {                                            // 33
            console.log(Websites.findOne({ _id: this.params._id }));   // 34
            return Websites.findOne({ _id: this.params._id });         // 35
        }                                                              //
    });                                                                //
});                                                                    //
                                                                       //
///     infiniscroll                                                   //
                                                                       //
Session.set("websiteLimit", 8);                                        // 42
                                                                       //
lastScrollTop = 0;                                                     // 45
$(window).scroll(function (event) {                                    // 46
                                                                       //
    /// test if we are near the bottom of the window                   //
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        // where are we in the page?                                   //
        var scrollTop = $(this).scrollTop();                           // 51
        // test if we are going down                                   //
        if (scrollTop > lastScrollTop) {                               // 53
            // yes we are heading down...                              //
            console.log("We are heading down");                        // 55
            Session.set("websiteLimit", Session.get("websiteLimit") + 4);
        }                                                              //
                                                                       //
        lastScrollTop = scrollTop;                                     // 59
    }                                                                  //
});                                                                    //
                                                                       //
/// account ui setup                                                   //
                                                                       //
Accounts.ui.config({                                                   // 66
    passwordSignupFields: "USERNAME_AND_EMAIL"                         // 67
});                                                                    //
                                                                       //
///     template helpers                                               //
                                                                       //
///     helper function that returns all available websites            //
Template.website_list.helpers({                                        // 73
    websites: function () {                                            // 74
        return Websites.find({}, { sort: { upvote: -1 } });            // 75
    }                                                                  //
                                                                       //
});                                                                    //
                                                                       //
Template.body.helpers({                                                // 80
    username: function () {                                            // 81
        if (Meteor.user()) {                                           // 82
            return Meteor.user().username;                             // 83
            //return Meteor.user().emails[0].address;                  //
        } else {                                                       //
                return "anonymous internet user";                      // 87
            }                                                          //
    }                                                                  //
});                                                                    //
Template.website_item.helpers({                                        // 91
    getUser: function (user_id) {                                      // 92
        var user = Meteor.users.findOne({ _id: user_id });             // 93
        // console.log(user);                                          //
        if (user) {                                                    // 95
            return user.username;                                      // 96
        } else {                                                       //
            return "Anonymous internet user";                          // 98
        }                                                              //
    }                                                                  //
});                                                                    //
Template.comments.helpers({                                            // 102
    getUser: function (user_id) {                                      // 103
        var user = Meteor.users.findOne({ _id: user_id });             // 104
        console.log(Meteor.users.findOne({ _id: user_id }));           // 105
        console.log(user_id);                                          // 106
        // console.log(user);                                          //
        if (user) {                                                    // 108
            return user.username;                                      // 109
        } else {                                                       //
            return "Anonymous internet user";                          // 111
        }                                                              //
    }                                                                  //
});                                                                    //
                                                                       //
///     template events                                                //
                                                                       //
///     Website Item                                                   //
Template.website_item.events({                                         // 119
    "click .js-upvote": function (event) {                             // 120
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)                 //
        var website_id = this._id;                                     // 123
        console.log("Up voting website with id " + website_id);        // 124
        //                                                             //
        // TODO - put the code in here to add a vote to a website!     //
        Websites.update({ _id: website_id }, { $inc: { upvote: +1 } }); // for a vote UP
                                                                       //
        return false; // prevent the button from reloading the page    // 129
    },                                                                 //
    "click .js-downvote": function (event) {                           // 131
                                                                       //
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)                 //
        var website_id = this._id;                                     // 135
        console.log("Down voting website with id " + website_id);      // 136
                                                                       //
        // TODO - put the code in here to remove a vote from a website!
        Websites.update({ _id: website_id }, { $inc: { downvote: +1 } });
        return false; // prevent the button from reloading the page    // 140
    }                                                                  //
});                                                                    //
                                                                       //
///     Website Form                                                   //
Template.website_form.events({                                         // 145
    "click .js-toggle-website-form": function (event) {                // 146
        $("#website_form").toggle('slow');                             // 147
    },                                                                 //
    "submit .js-save-website-form": function (event) {                 // 149
                                                                       //
        // here is an example of how to get the url out of the form:   //
        var url = event.target.url.value;                              // 152
        var title = event.target.title.value;                          // 153
        var description = event.target.description.value;              // 154
        console.log("The url they entered is: " + url);                // 155
                                                                       //
        //  TODO - put your website saving code in here!               //
        if (Meteor.user()) {                                           // 158
            var date = new Date();                                     // 159
            Websites.insert({                                          // 160
                url: url,                                              // 161
                title: title,                                          // 162
                description: description,                              // 163
                createdOn: date,                                       // 164
                createdBy: Meteor.user()._id,                          // 165
                upVote: 0,                                             // 166
                downVote: 0                                            // 167
            });                                                        //
            $("#url").val(" ");                                        // 169
            $("#title").val(" ");                                      // 170
            $("#description").val(" ");                                // 171
            $("#website_form").toggle('slow');                         // 172
            return false;                                              // 173
        }                                                              //
        return false; // stop the form submit from reloading the page  // 175
    }                                                                  //
}); /// End website form events                                        //
                                                                       //
Template.comments.events({                                             // 179
    "click .js-comment-add": function (event) {                        // 180
        var comment = $('#comments').val();                            // 181
        Websites.insert({                                              // 182
            comment: comment                                           // 183
        });                                                            //
    }                                                                  //
                                                                       //
}); /// End comments events                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);

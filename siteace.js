Websites = new Mongo.Collection("websites");

if (Meteor.isClient) {

    Session.set("websiteLimit", 8);


    lastScrollTop = 0;
    $(window).scroll(function (event) {

        // test if we are near the bottom of the window
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            // where are we in the page?
            var scrollTop = $(this).scrollTop();
            // test if we are going down
            if (scrollTop > lastScrollTop) {
                // yes we are heading down...
                console.log("We are heading down");
                Session.set("websiteLimit", Session.get("websiteLimit") + 4);
            }

            lastScrollTop = scrollTop;
        }

    })

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });


    /////
    // template helpers
    /////


    // helper function that returns all available websites
    Template.website_list.helpers({
        websites: function () {
            return Websites.find({},{sort:{upvote:-1}});
        },

    });

    Template.body.helpers({
        username: function () {
            if (Meteor.user()) {
                return Meteor.user().username;
                //return Meteor.user().emails[0].address;

            }
            else {
                return "anonymous internet user";
            }
        }
    });
    Template.website_item.helpers({
        getUser:function(user_id){
            var user = Meteor.users.findOne({_id:user_id});
            // console.log(user);
            if(user){
                return user.username;
            } else {
                return "Anonymous internet user"
            }
        }
    });



    /////
    // template events
    /////

    Template.website_item.events({
        "click .js-upvote": function (event) {
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)
            var website_id = this._id;
            console.log("Up voting website with id " + website_id);
            //
            // TODO - put the code in here to add a vote to a website!
            Websites.update({_id: website_id},{$inc: {upvote: +1}}); // for a vote UP

            return false;// prevent the button from reloading the page
        },
        "click .js-downvote": function (event) {

            // example of how you can access the id for the website in the database
            // (this is the data context for the template)
            var website_id = this._id;
            console.log("Down voting website with id " + website_id);

            // TODO - put the code in here to remove a vote from a website!
            Websites.update({_id: website_id},{$inc: {downvote: +1}});

            return false;// prevent the button from reloading the page
        }
    })

    Template.website_form.events({
        "click .js-toggle-website-form": function (event) {
            $("#website_form").toggle('slow');
        },
        "submit .js-save-website-form": function (event) {

            // here is an example of how to get the url out of the form:
            var url = event.target.url.value;
            var title = event.target.title.value;
            var description = event.target.description.value;
            console.log("The url they entered is: " + url);

            //  TODO - put your website saving code in here!
            if (Meteor.user()){
                var date = new Date();
                Websites.insert({
                    url:url,
                    title:title,
                    description:description,
                    createdOn:date,
                    createdBy:Meteor.user()._id,
                    upVote:0,
                    downVote:0
                });

                
                $("#url").val(" ");
                $("#title").val(" ");
                $("#description").val(" ");
                $("#website_form").toggle('slow');

                return false;

            }

            return false;// stop the form submit from reloading the page

        }
    });
}
var date = Date();

if (Meteor.isServer) {
    // start up function that creates entries in the Websites databases.
    Meteor.startup(function () {
        // code to run on server at startup
        if (!Websites.findOne()) {
            console.log("No websites yet. Creating starter data.");
            Websites.insert({
                title: "Goldsmiths Computing Department",
                url: "http://www.gold.ac.uk/computing/",
                description: "This is where this course was developed.",
                createdOn:Date(),
                upvote:0,
                downvote:0
            });
            Websites.insert({
                title: "University of London",
                url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
                description: "University of London International Programme.",
                createdOn:Date(),
                upvote:0,
                downvote:0
            });
            Websites.insert({
                title: "Coursera",
                url: "http://www.coursera.org",
                description: "Universal access to the world’s best education.",
                createdOn:Date(),
                upvote:0,
                downvote:0
            });
            Websites.insert({
                title: "Google",
                url: "http://www.google.com",
                description: "Popular search engine.",
                createdOn:Date(),
                upvote:0,
                downvote:0
            });
        }
    });
}

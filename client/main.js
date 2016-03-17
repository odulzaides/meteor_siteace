/// routing
Router.configure({
    'layoutTemplate': 'app_layout'
}); ///App Layout

/// home '/'
Router.route('/', function() {
    this.render('nav', {
        to: "navbar"
    });
    this.render('welcome', {
        to: "main"
    });
});

/// Website List
Router.route('/website_list', function() {
    this.render('nav', {
        to: "navbar"
    });
    this.render('website_main_list', {
        to: "main"
    });
});

/// Website Detail
Router.route('/comments/:_id', function() {
    this.render('nav', {
        to: "navbar"
    });
    this.render('comments', {
        to: "main",
        data: function() {
            return Websites.findOne({ _id: this.params._id });
        }
    });
});

///     infiniscroll

Session.set("websiteLimit", 8);


lastScrollTop = 0;
$(window).scroll(function(event) {

    /// test if we are near the bottom of the window
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        // where are we in the page?
        var scrollTop = $(this).scrollTop();
        // test if we are going down
        if (scrollTop > lastScrollTop) {
            // yes we are heading down...
           Session.set("websiteLimit", Session.get("websiteLimit") + 4);
        }

        lastScrollTop = scrollTop;
    }

});

/// account ui setup

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

///     template helpers

///     helper function that returns all available websites
Template.website_list.helpers({
    websites: function() {
        return Websites.find({}, { sort: { upvote: -1 } });
    },

});


Template.body.helpers({
    username: function() {
        if (Meteor.user()) {
            return Meteor.user().username;
            //return Meteor.user().emails[0].address;

        } else {
            return "anonymous internet user";
        }
    }
});
Template.website_item.helpers({
    getUser: function(user_id) {
        var user = Meteor.users.findOne({ _id: user_id });
        // console.log(user);
        if (user) {
            return user.username;
        } else {
            return "Anonymous internet user";
        }
    }
});
Template.comments.helpers({
    getUser: function(user_id) {
        var user = Meteor.users.findOne({ _id: user_id });
        if (user) {
            return user.username;
        } else {
            return "Anonymous internet user";
        }
    },
    comments: function() {
        var website_id = this._id;
        return Comments.find({ websiteId: website_id }, { sort: { createdOn: -1 } });
    }
});

///     template events

///     Website Item
Template.website_item.events({
    "click .js-upvote": function(event) {
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;

        //
        // TODO - put the code in here to add a vote to a website!
        Websites.update({ _id: website_id }, { $inc: { upvote: +1 } }); // for a vote UP

        return false; // prevent the button from reloading the page
    },
    "click .js-downvote": function(event) {

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;

        // TODO - put the code in here to remove a vote from a website!
        Websites.update({ _id: website_id }, { $inc: { downvote: +1 } });
        return false; // prevent the button from reloading the page
    }
})

///     Website Form
Template.website_form.events({
    "click .js-toggle-website-form": function(event) {
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function(event) {
        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var title = event.target.title.value;
        var description = event.target.description.value;
        if (Meteor.user()) {
            var date = new Date();
            date = date.toDateString();
            Websites.insert({
                url: url,
                title: title,
                description: description,
                createdOn: date,
                createdBy: Meteor.user()._id,
                upVote: 0,
                downVote: 0
            });
            $("#url").val(" ");
            $("#title").val(" ");
            $("#description").val(" ");
            $("#website_form").toggle('slow');
            return false;
        }
        return false; // stop the form submit from reloading the page
    },
}); /// End website form events

///     comments events
Template.comments.events({
    "click .js-comment-add": function(event) {
        if ($("#comment").val()) {
            var comment = $('#comment').val();
            var date = new Date();
            date = date.toDateString();
            Comments.insert({
                websiteId: this._id,
                createdBy: Meteor.user()._id,
                createdOn: date,
                content: comment
            });
            $("#comment").val("");
        }
    },
    "click .js-upvote": function(event) {
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;

        //
        // TODO - put the code in here to add a vote to a website!
        Websites.update({ _id: website_id }, { $inc: { upvote: +1 } }); // for a vote UP

        return false; // prevent the button from reloading the page
    },
    "click .js-downvote": function(event) {

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;

        // TODO - put the code in here to remove a vote from a website!
        Websites.update({ _id: website_id }, { $inc: { downvote: +1 } });
        return false; // prevent the button from reloading the page
    }

}); /// End comments events

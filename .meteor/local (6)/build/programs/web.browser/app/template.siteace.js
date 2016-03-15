(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<!-- navbar  - you will be putting the login functions here -->\n"), HTML.NAV({
    "class": "navbar navbar-default"
  }, "\n    ", HTML.DIV({
    "class": "container-fluid"
  }, "\n        ", HTML.Raw('<div class="navbar-header">\n            <a class="navbar-brand" href="#">\n                Site Ace\n            </a>\n\n        </div>'), "\n        ", HTML.DIV({
    "class": "login"
  }, HTML.Raw("<br>"), "\n            ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n\n        "), "\n    "), "\n"), "\n\n", HTML.DIV({
    "class": "container"
  }, "\n    ", HTML.H1("Welcome to the Website Share ", Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  }), " !"), "\n    ", Spacebars.include(view.lookupTemplate("website_form")), "\n    ", Spacebars.include(view.lookupTemplate("website_list")), "\n") ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("website_form");
Template["website_form"] = new Template("Template.website_form", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ HTML.Comment(" Only displays the 'add button' if someone is logged in."), "\n        ", HTML.A({
      "class": "btn btn-default js-toggle-website-form",
      href: "#"
    }, "\n            ", HTML.SPAN({
      "class": "glyphicon glyphicon-plus",
      "aria-hidden": "true"
    }), "\n        "), "\n    " ];
  }), HTML.Raw('\n    <div id="website_form" class="hidden_div">\n        <form class="js-save-website-form">\n            <div class="form-group">\n                <label for="url">Site address</label>\n                <input type="text" class="form-control" id="url" placeholder="http://www.mysite.com">\n            </div>\n            <div class="form-group">\n                <label for="title">Title</label>\n                <input type="text" class="form-control" id="title" placeholder="Mysite">\n            </div>\n            <div class="form-group">\n                <label for="description">Description</label>\n                <input type="text" class="form-control" id="description" placeholder="I found this site really useful for ...">\n            </div>\n\n            <button type="submit" class="btn btn-default">Submit</button>\n        </form>\n    </div>') ];
}));

Template.__checkName("website_list");
Template["website_list"] = new Template("Template.website_list", (function() {
  var view = this;
  return HTML.OL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("websites"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("website_item")), "\n        " ];
  }), "\n    ");
}));

Template.__checkName("website_item");
Template["website_item"] = new Template("Template.website_item", (function() {
  var view = this;
  return HTML.LI("\n        ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("url"));
    }
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n\n        ", HTML.P("\n            ", Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));
  }), "\n        "), "\n        ", HTML.P("\n            Added by: ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:getUser", function() {
    return Spacebars.mustache(view.lookup("getUser"), view.lookup("createdBy"));
  })), "  on: ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:getDate", function() {
    return Spacebars.mustache(view.lookup("getDate"));
  })), " at ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:getTime", function() {
    return Spacebars.mustache(view.lookup("getTime"));
  })), "\n            ", HTML.Raw("<!--// ADD THE NUMBER OF UP VOTES AND DOWN VOTES -->"), "\n        "), HTML.Raw('\n        <!-- <p>\n              {{getUpVotes}}  {{getDownVotes}}  \n        </p> -->\n\n\n        <!--<a href="#" class="btn btn-default js-upvote">-->\n            <!--<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>-->\n        <!--</a>-->\n        <!--<a href="#" class="btn btn-default js-downvote">-->\n            <!--<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>-->\n        <!--</a>-->\n        <!-- you will be putting your up and down vote buttons in here! -->\n        <a href="#" class="btn btn-default js-upvote">\n            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\n        </a>\n        <a href="#" class="btn btn-default js-downvote">\n            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\n        </a>\n    '));
}));

}).call(this);

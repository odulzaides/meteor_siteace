(function(){
Template.body.addContent((function() {
  var view = this;
  return "";
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("app_layout");
Template["app_layout"] = new Template("Template.app_layout", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return "navbar";
  }, function() {
    return Spacebars.include(view.lookupTemplate("yield"));
  }), " ", Blaze._TemplateWith(function() {
    return "main";
  }, function() {
    return Spacebars.include(view.lookupTemplate("yield"));
  }) ];
}));

Template.__checkName("welcome");
Template["welcome"] = new Template("Template.welcome", (function() {
  var view = this;
  return [ HTML.SECTION({
    "class": "cover"
  }, "\n        ", HTML.DIV({
    "class": "cover-caption "
  }, "\n            ", HTML.DIV({
    "class": "container"
  }, "\n                ", HTML.DIV({
    "class": "col-sm-10"
  }, "\n                    ", HTML.H1({
    "class": "display-1"
  }, "Welcome to the Website Share ", Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  }), " !"), "\n                    ", HTML.Raw('<label for="button">\n                        <a href="/website_list" class="btn btn-info">Click to Enter</a>\n                    </label>'), "\n                "), "\n            "), "\n        "), "\n    "), HTML.Raw("\n    <!-- {{> website_form}} {{> website_list}} -->") ];
}));

Template.__checkName("nav");
Template["nav"] = new Template("Template.nav", (function() {
  var view = this;
  return HTML.NAV({
    "class": "navbar navbar-default"
  }, "\n        ", HTML.DIV({
    "class": "container-fluid"
  }, "\n            ", HTML.Raw('<div class="navbar-header">\n                <a class="navbar-brand" href="#">\n                Site Ace\n            </a>\n            </div>'), "\n            ", HTML.DIV({
    "class": "login"
  }, "\n                ", HTML.Raw("<br>"), " ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n            "), "\n        "), "\n    ");
}));

Template.__checkName("website_main_list");
Template["website_main_list"] = new Template("Template.website_main_list", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("website_form")), " ", Spacebars.include(view.lookupTemplate("website_list")) ];
}));

Template.__checkName("website_form");
Template["website_form"] = new Template("Template.website_form", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n    ", HTML.Comment(" Only displays the 'add button' if someone is logged in."), "\n    ", HTML.A({
      "class": "btn btn-default js-toggle-website-form",
      href: "#"
    }, "\n        ", HTML.SPAN({
      "class": "glyphicon glyphicon-plus",
      "aria-hidden": "true"
    }), "\n    "), "\n    " ];
  }), HTML.Raw('\n    <div id="website_form" class="hidden_div">\n        <form class="js-save-website-form">\n            <div class="form-group">\n                <label for="url">Site address</label>\n                <input type="text" class="form-control" id="url" placeholder="http://www.mysite.com">\n            </div>\n            <div class="form-group">\n                <label for="title">Title</label>\n                <input type="text" class="form-control" id="title" placeholder="Mysite">\n            </div>\n            <div class="form-group">\n                <label for="description">Description</label>\n                <input type="text" class="form-control" id="description" placeholder="I found this site really useful for ...">\n            </div>\n            <button type="submit" class="btn btn-default">Submit</button>\n        </form>\n    </div>\n    <!-- /////////////////////////// -->') ];
}));

Template.__checkName("website_list");
Template["website_list"] = new Template("Template.website_list", (function() {
  var view = this;
  return HTML.OL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("websites"));
  }, function() {
    return [ " ", Spacebars.include(view.lookupTemplate("website_item")), " " ];
  }), "\n    ");
}));

Template.__checkName("website_item");
Template["website_item"] = new Template("Template.website_item", (function() {
  var view = this;
  return HTML.LI({
    style: "border-top:1px solid gray;margin-top:2%;"
  }, "\n        ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("url"));
    }
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n        ", HTML.P("\n            ", Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));
  }), "\n        "), "\n        ", HTML.P("\n            Added by: ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:getUser", function() {
    return Spacebars.mustache(view.lookup("getUser"), view.lookup("createdBy"));
  })), " on: ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:createdOn", function() {
    return Spacebars.mustache(view.lookup("createdOn"));
  })), "\n        "), HTML.Raw('\n        <a href="#" class="btn btn-default js-upvote">\n            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\n        </a>\n        <a href="#" class="btn btn-default js-downvote">\n            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\n        </a>\n        '), HTML.A({
    href: function() {
      return [ "/comments/", Spacebars.mustache(view.lookup("_id")) ];
    }
  }, "comments"), "\n        ", HTML.P({
    "class": "up-down"
  }, "\n            ", HTML.Raw('<span class="glyphicon glyphicon-thumbs-up"></span>'), " ", Blaze.View("lookup:upvote", function() {
    return Spacebars.mustache(view.lookup("upvote"));
  }), "\n            ", HTML.Raw('<span class="glyphicon glyphicon-thumbs-down"></span>'), " ", Blaze.View("lookup:downvote", function() {
    return Spacebars.mustache(view.lookup("downvote"));
  }), "\n        "), "\n    ");
}));

Template.__checkName("comments");
Template["comments"] = new Template("Template.comments", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "container"
  }, "\n        ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("url"));
    }
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n        ", HTML.P("\n            ", Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));
  }), "\n        "), "\n        ", HTML.P("\n            Added by: ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:getUser", function() {
    return Spacebars.mustache(view.lookup("getUser"), view.lookup("createdBy"));
  })), " on: ", HTML.SPAN({
    style: "color:rgb(72, 159, 218)"
  }, Blaze.View("lookup:createdOn", function() {
    return Spacebars.mustache(view.lookup("createdOn"));
  })), "\n        "), "\n        ", HTML.Raw('<a href="#" class="btn btn-default js-upvote">\n            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\n        </a>'), "\n        ", HTML.Raw('<a href="#" class="btn btn-default js-downvote">\n            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\n        </a>'), "\n        ", HTML.P({
    "class": "up-down"
  }, "\n            ", HTML.Raw('<span class="glyphicon glyphicon-thumbs-up"></span>'), " ", Blaze.View("lookup:upvote", function() {
    return Spacebars.mustache(view.lookup("upvote"));
  }), "\n            ", HTML.Raw('<span class="glyphicon glyphicon-thumbs-down"></span>'), " ", Blaze.View("lookup:downvote", function() {
    return Spacebars.mustache(view.lookup("downvote"));
  }), "\n        "), "\n        ", HTML.Raw('<div class="row">\n            <div class="col-md-5">\n                <h3 class="heading">Comments and Responses</h3>\n            </div>\n            <div class="col-md-7">\n                <div id="upper_blank"></div>\n            </div>\n        </div>'), "\n        ", HTML.DIV({
    "class": "row"
  }, "\n            ", HTML.DIV({
    "class": "col-md-12"
  }, "\n\n            ", HTML.Raw("<!-- FORM FOR COMMENTS -->"), "\n                ", HTML.FORM({
    action: "",
    "class": " js-comment-add"
  }, "\n                    ", HTML.TEXTAREA({
    style: "width:40%;height:15%;",
    placeholder: "Message",
    id: "comment"
  }), "\n                    ", HTML.Raw("<br>"), "\n                    ", HTML.Raw('<a href="#">\n                        <input type="submit" id="commentSubmit" value="Submit Comment">\n                    </a>'), "\n                "), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "row"
  }, "\n            ", HTML.P({
    id: "comments",
    "class": "comments"
  }, "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("websites"));
  }, function() {
    return [ " \n                     ", Blaze.View("lookup:comments", function() {
      return Spacebars.mustache(view.lookup("comments"));
    }), " \n                " ];
  }), "\n            "), "\n        "), "\n    "), HTML.Raw("\n    <!--  Container -->") ];
}));

}).call(this);

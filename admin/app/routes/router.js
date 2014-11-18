define(["app"], function (App) {
  App.Router.map(function() {
    this.resource('users', {path: '/usuarios'},function() {
        this.route('teste');
      }
    );
  });

  App.UsersRoute = Ember.Route.extend({
    dataModel: {"teste":"teste"},
    model: function() {


      // jQuery AJAX - returns a PROMISE!

      /*Ember.$.getJSON("http://localhost:3030/api/posts/")
      .then(function(data) {
        console.log("success", data);
        return data;

      });*/

    }
  })
});
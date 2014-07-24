define([
    "underscore",
    "backbone",
    "manager/models/clientModel"
], function(_, Backbone, Client) {
    var ClientsCollection = Backbone.Collection.extend({
        model: Client,
        url: "cliente" // url of the REST API
    });
    return new ClientsCollection();
});
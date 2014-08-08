define([
    "underscore",
    "backbone",
    "admin/models/estabModel"
], function(_, Backbone, Estab) {
    var EstabsCollection = Backbone.Collection.extend({
        model: Estab,
        url: "adm/estabelecimento" // url of the REST API
    });
    return new EstabsCollection();
});
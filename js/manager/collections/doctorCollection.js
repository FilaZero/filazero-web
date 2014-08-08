define([
    "underscore",
    "backbone",
    "manager/models/doctorModel"
], function(_, Backbone, Doctor) {
    var DoctorsCollection = Backbone.Collection.extend({
        model: Doctor,
        url: "manager/medico" // url of the REST API
    });
    return new DoctorsCollection();
});
define([
    "underscore",
    "backbone",
    "manager/models/doctorModel"
], function(_, Backbone, Doctor) {
    var DoctorsCollection = Backbone.Collection.extend({
        model: Doctor,
        url: "medico" // url of the REST API
    });
    return new DoctorsCollection();
});
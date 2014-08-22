define([
    "underscore",
    "backbone",
    "manager/models/appointmentModel"
], function(_, Backbone, Appointment) {
    var AppointmentsCollection = Backbone.Collection.extend({
        model: Appointment,
        url: "manager/consulta" // url of the REST API
    });
    return new AppointmentsCollection();
});
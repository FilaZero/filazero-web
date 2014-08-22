define([
    "underscore",
    "backbone",
    "manager/models/queueModel"
], function(_, Backbone, Queue) {
    var QueuesCollection = Backbone.Collection.extend({
        model: Queue,
        url: "manager/fila/" // url of the REST API
    });
    return new QueuesCollection();
});
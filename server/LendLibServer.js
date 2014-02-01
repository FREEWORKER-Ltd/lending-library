var lists = new Meteor.Collection("Lists");

Meteor.startup(function () {
    // code to run on server at startup

    /*
     lists.insert({
     Category: "DVDs",
     items: [{
     Name: "Mission Impossible",
     Owner: "me",
     LentTo: "Alice"
     }]
     });

     lists.insert({
     Category: "Tools",
     items: [{
     Name: "Linear Compression Wrench",
     Owner:"me",
     LentTo: "STEVE"
     }]
     });
     */

    /*
     lists.insert({
     Category: "Books"
     });
     */

    /*
     lists.remove({ Category: "DVDs"});
     lists.remove({ Category: "Tools"});
     */
});

Meteor.publish("Categories", function () {
    Meteor.flush();

    return lists.find({owner: this.userId}, {fields: {Category: 1}});
});

Meteor.publish("listDetails", function (category_id) {
    return lists.find({_id: category_id});
});


function adminUser(userId) {
    var adminUser = Meteor.users.findOne({username: "admin"});
    return (userId && adminUser && userId === adminUser._id);
}

lists.allow({
    insert: function (userId, doc) {
        doc.owner = userId;
/*
        console.log(doc);
*/
        return !!userId;
    },
    update: function (userId, docs, fields, modifier) {
/*
        console.log(docs);
        console.log(fields);
        console.log(modifier);
*/

        return !!userId;
    },
    remove: function (userId, docs) {
        return !!userId;
    }
});
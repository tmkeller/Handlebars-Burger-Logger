const orm = require( "../config/orm.js" );

const burger = {
    all: function( callback ) {
        orm.selectAll( "burgers", function( res ) {
            callback( res );
        });
    },
    // Create takes in two arrays and a callback.
    create: function( columns, values, callback ) {
        orm.insertOne( "burgers", columns, values, function( res ) {
            callback( res );
        });
    },
    update: function( colsValsObj, condition, callback ) {
        orm.updateOne( "burgers", colsValsObj, condition, function( res ) {
            callback( res );
        });
    },
    delete: function( condition, callback ) {
        orm.deleteOne( "burgers", condition, function( res ) {
            callback( res );
        });
    }
};

module.exports = burger;
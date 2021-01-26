const orm = require( "../config/orm.js" );

const cat = {
    all: function( callback ) {
        orm.all( "burgers", function( res ) {
            callback( res );
        });
    },
    // Create takes in two arrays and a callback.
    create: function( columns, values, callback ) {
        orm.create( "burgers", columns, values, function( res ) {
            callback( res );
        });
    },
    update: function( colsValsObj, condition, callback ) {
        orm.update( "burgers", colsValsObj, condition, function( res ) {
            callback( res );
        });
    },
    delete: function( condition, callback ) {
        orm.delete( "burgers", condition, function( res ) {
            callback( res );
        });
    }
};

module.export = burger;
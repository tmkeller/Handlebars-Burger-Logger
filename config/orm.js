// Import connection through MySQL
const connection = require( "../config/connection.js" );

// Helper function to print a set number of question marks for SQL queries.
// EX: printQuestionMarks( 4 );
// OUTPUT: ?,?,?,?
function printQuestionMarks( int ) {

    const arr = [];
    for ( let i = 0; i < int; i++ ) {
        arr.push("?");
    }
    return arr.toString();
}

// Converts objects' key-value pairs into a format appropriate for SQL.
// EX: { name: Wesley, cuteness: 10, fur: fluffy }
// OUTPUT: "name='Wesley', cuteness='10', fur='fluffy'"
function objectToSQL( obj ) {
    var arr = [];

    for ( let key in obj ) {
        let value = obj[ key ];
        // Don't use hidden properties
        if ( Object.hasOwnProperty.call( obj, key )) {
            // If the string has spaces, add quotations to it.
            if ( typeof value === "string" && value.indexOf( " " ) >= 0 ) {
                value = `'${ value }'`;
            }
            arr.push( `${ key }=${ value }` );
        }
    }
    return arr.toString();
}

// Create orm object for SQL statement functions.
const orm = {
    selectAll: function( table, callback ) {
        let query = `SELECT * FROM ${ table };`;
        connection.query( query, function( err, res ) {
            if ( err ) {
                throw err;
            }
            callback( res );
        })
    },
    insertOne: function( table, columns, values, callback ) {
        let query = `INSERT INTO ${ table } (${ columns.toString() }) 
        VALUES (${ printQuestionMarks( values.length ) }) `;

        console.log( query );

        connection.query( query, values, function( err, res ) {
            if ( err ) {
                throw err;
            }
            callback( res );
        })
    },
    // colValObj is just an object with key/value pairs.
    updateOne: function( table, colValObj, condition, callback ) {
        let query = `UPDATE ${ table } SET ${ objectToSQL( colValObj )} WHERE ${ condition }`;

        console.log( query );

        connection.query( query, function( err, res ) {
            if ( err ) {
                throw err;
            }

            callback( res );
        })
    },
    deleteOne: function( table, condition, callback ) {
        let query = `DELETE FROM ${ table } WHERE ${ condition }`;

        connection.query( query, function( err, res ) {
            if ( err ) {
                throw err;
            }
            callback( res );
        })
    }
};

module.exports = orm;
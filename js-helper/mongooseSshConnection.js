const tunnel = require( "tunnel-ssh" );
const mongoose = require( "mongoose" );

const connention = async (uri) => {
    await tunnel( {
        username : "userName",
        password : "password",
        host : "sshHost",
        port : "sshPort",
        dstHost : "mongoHost",
        dstPort : "mongoPort",
        localHost : "localHost",
        localPort : "localPort"
    },async ( err,server ) => {
        if( err ) {
            console.log( err )
        }
        console.log( "SSH Tunnel is up and running" )
        await mongoose.connect( uri,{} ).then( () => {
            console.log( "MongoDB is connected!" );
        } ).catch( err => console.log( err ) );
    } );
}
module.exports = connention;

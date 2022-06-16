const Agenda = require( "agenda" );
const agenda = new Agenda( { db : { address : "mongo uri",collection : 'collectionName' } } );
( async function () {
    await agenda.start().then( () => {
        console.log( "Agenda started!" );
    } ).catch( err => {
        console.log( "Agenda Error",err );
    } );
} )();

const createEvery = async ( cron,uniqueExpression ) => {
    await agenda.every( cron,uniqueExpression ).then( () => {
        console.log( "Job created! (createEvery)" );
    } ).catch( err => {
        console.log( "Job Error ",err );
    } );
}
createEvery( "* * * * * *","uniqueExpression" );

const startJob = async () => {
    agenda.define( "uniqueExpression",async ( job ) => {
        console.log( "Job started!" );
    } );
}
startJob()
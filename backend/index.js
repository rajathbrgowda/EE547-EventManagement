//Imports
const express = require('express')
const fs = require("fs")
const expressGraphQL = require('express-graphql').graphqlHTTP
// const { bodyParser } = require('body-parser')

const app = express()
// app.use(bodyParser.json())

const { 
    MongoClient,
    ObjectId
} = require("mongodb")

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')


let mongo_file_path = './data/temp.json';

//Check mongo config
function checkMongoDB(file_path){
    try{ 
        JSON.parse(fs.readFileSync(file_path,"utf8")) 
    }
    catch(e){
        return false;
    }
    return true;
}

//GraphQL schemas
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Root',
        fields: () => ({
            response: { 
                type: GraphQLString,
            }
        })
    })
})


//Endpoints
app.use('/root', expressGraphQL({
    schema: schema,
    graphiql: true,
    
}))

//Start a server

isValid = checkMongoDB(mongo_file_path)
if (!isValid) {
    process.exit(2);
} else {
    app.listen(3000, () => console.log('Started server at 3000'))
};

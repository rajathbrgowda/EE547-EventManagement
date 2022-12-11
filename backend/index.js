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
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
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

// Temporary Database
const admins = [
	{ id: 1, name: 'AIS' },
	{ id: 2, name: 'GSG' },
	{ id: 3, name: 'VGSA' }
]

<<<<<<< HEAD

=======
>>>>>>> dfef9df9bc0dedf34b80fba2ea9fb520baeb1c79
const events = [
	{ id: 1, name: 'Holi', adminId: 1 },
	{ id: 2, name: 'Diwali', adminId: 1 },
	{ id: 3, name: 'Garba', adminId: 1 },
	{ id: 4, name: 'GSG Summit', adminId: 2 },
	{ id: 5, name: 'GSG Alumni Meet', adminId: 2 },
	{ id: 6, name: 'General Body Meeting', adminId: 2 },
	{ id: 7, name: 'VGSA Fall Ball', adminId: 3 },
	{ id: 8, name: 'Internship Info Session', adminId: 3 }
]


//GraphQL schemas
const EventType = new GraphQLObjectType({
    name: 'Event',
    description: 'This shows the events',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        adminId: { type: GraphQLNonNull(GraphQLInt) },
        admin: {
        type: AdminType,
        resolve: (event) => {
            return admins.find(admin => admin.id === event.adminId)
        }
        }
    })
})

const AdminType = new GraphQLObjectType({
    name: 'Admins',
    description: 'This shows admins',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        events: {
        type: new GraphQLList(EventType),
        resolve: (admin) => {
            return events.filter(event => event.adminId === admin.id)
        }
        }
    })
})

// GraphQL Queries & Mutations

// Query
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query for GET operation',
    fields: () => ({
        event: {
        type: EventType,
        description: 'A Single Event',
        args: {
            id: { type: GraphQLInt }
        },
        resolve: (parent, args) => events.find(event => event.id === args.id)
        },
        events: {
        type: new GraphQLList(EventType),
        description: 'List of All events',
        resolve: () => events
        },
        admins: {
        type: new GraphQLList(AdminType),
        description: 'List of All admins',
        resolve: () => admins
        },
        admin: {
        type: AdminType,
        description: 'A Single Author',
        args: {
            id: { type: GraphQLInt }
        },
        resolve: (parent, args) => admins.find(admin => admin.id === args.id)
        }
    })
})

//Mutation
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addEvent: {
        type: EventType,
        description: 'Add an event',
        args: {
            name: { type: GraphQLNonNull(GraphQLString) },
            adminId: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
            const event = { id: events.length + 1, name: args.name, adminId: args.adminId }
            events.push(event)
            return event
        }
        },
        addAuthor: {
        type: AdminType,
        description: 'Add an admin',
        args: {
            name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
            const admin = { id: admins.length + 1, name: args.name }
            admins.push(admin)
            return admin
        }
        }
    })
})

//Delaration of Query and Mutations

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})


//Endpoints
app.use('/graphql', expressGraphQL({    // using graphql interface for time being to test, pls change this later
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

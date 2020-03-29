const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let aboutMessage = "Issue Tracker API V1.0";

const issueDB = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('01/16/2019'), due: undefined,
        title: 'Error in console when clicking add'
    }, {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
        created: new Date('01/26/2019'), due: new Date('02/01/2019'),
        title: 'Missing bottom border'
    }
];

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: "a Date() type in GraphQL as a scalar",
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    },
});

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage,
        issueAdd
    },
    GraphQLDate
};

function issueList() {
    return issueDB
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueAdd(_, { issue }) {
    issue.created = new Date();
    issue.id = issueDB.length + 1;
    if (issue.status == undefined) issue.status = "New";
    issueDB.push(issue);
    return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/schema.graphql", 'utf-8'),
    resolvers
});


const app = express();
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
    console.log('app started');
})
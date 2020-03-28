const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Issue Tracker API V1.0";

const issueDB = [
    {id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created: new Date('01/16/2019'), due: undefined,
    title: 'Error in console when clicking add'
}, {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created: new Date('01/26/2019'), due: new Date('02/01/2019'),
    title: 'Missing bottom border'
}
];

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage
    }
};

function issueList() {
    return issueDB
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/schema.graphql",'utf-8'),
    resolvers
});


const app = express();
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
    console.log('app started');
})
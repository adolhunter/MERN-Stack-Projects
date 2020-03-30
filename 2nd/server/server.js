const express = require('express');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
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
        const dataValue = new Date(value);
        return isNaN(dataValue) ? undefined : dataValue;
    },
    parseLiteral(ast) {
        if (ast.Kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value)? undefined : value;
        }
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

function issueValidate(issue) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status === 'Assigned' && !issue.owner) {
        errors.push('Field "Owner" is required when status is "Assigned"');
    }
    if (errors.length > 0) {
        throw new UserInputError("Invalid inputs(s)", {errors});
    }
}

function issueAdd(_, { issue }) {
    issueValidate(issue);
    issue.created = new Date();
    issue.id = issueDB.length + 1;
    issueDB.push(issue);
    return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/schema.graphql", 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
});


const app = express();
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
    console.log('app started');
})
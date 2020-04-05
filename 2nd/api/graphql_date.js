const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'a Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dataValue = new Date(value);
    return Number.isNaN(dataValue.getTime()) ? undefined : dataValue;
  },
  parseLiteral(ast) {
    if (ast.Kind === Kind.STRING) {
      const value = new Date(ast.value);
      return Number.isNaN(value.getTime()) ? undefined : value;
    }
    return undefined;
  },
});

module.exports = GraphQLDate;

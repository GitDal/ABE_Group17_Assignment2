import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { IUser } from "../../database/models/user";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        email: {
            type: GraphQLString,
            resolve: (currentUser: IUser) => currentUser.email
        },
        password: {
            type: GraphQLString,
            resolve: (currentUser: IUser) => currentUser.password
        },
        claims: {
            type: new GraphQLList(GraphQLString),
            resolve: (currentUser: IUser) => currentUser.claims
        },
    }
});

export interface IUserInput {
    email: string;
    password: string;
}

export const UserInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields: () => ({
        email: { type: new GraphQLNonNull(GraphQLString)},
        password: { type: new GraphQLNonNull(GraphQLString)},
    }),
});

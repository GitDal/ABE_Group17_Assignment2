import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, } from 'graphql';
import { HotelType } from './types/hotel'
import { UserType } from './types/user';
import dbHotel from "../database/models/hotel";
import dbUser from "../database/models/user";

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        Hotels: {
            type: new GraphQLList(new GraphQLNonNull(HotelType)),
            resolve: async () => {
                return await dbHotel.find(); //kan ikke bruge api? --> kald direkte
            },
        },
        Hotel: {
            type: HotelType,
            args: {
                name: { type: GraphQLString },
                address: { type: GraphQLString }
            },
            resolve: async (source, args) => {
                const { name, address } = args as { name: string; address: string };

                if (!name && !address) {
                    return null;
                }

                return await dbHotel.findOne({ name: name ? name : /.*/, address: address ? address : /.*/ });
            },
        },
        Users: {
            type: new GraphQLList(new GraphQLNonNull(UserType)),
            resolve: async () => {
                return await dbUser.find();
            },
        },
        User: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            resolve: async (source, args) => {
                const { email } = args as { email: string };

                if (!email) {
                    return null;
                }

                return await dbUser.findOne({ email: email ? email : /.*/ });
            },
        },
    },
});

export default QueryType;
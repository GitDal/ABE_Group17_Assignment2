import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, } from 'graphql';
import { HotelInput, HotelType, RoomInput, RoomReservationPayload, RoomType } from './types/hotel'
import { UserType, UserInput, UserPayload } from './types/user';
import * as userResolver from "./resolvers/user";
import * as hotelResolver from "./resolvers/hotel";

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        // USER MUTATIONS
        userRegister: {
            type: UserType,
            args: {
                input: { type: new GraphQLNonNull(UserInput) },
            },
            resolve: async (source, { input }) => userResolver.register(input)
        },
        userLogin: {
            type: UserPayload,
            args: {
                input: { type: new GraphQLNonNull(UserInput) },
            },
            resolve: async (source, { input }) => userResolver.login(input)
        },
        giveClaims: {
            type: UserType,
            args: {
                userEmail: { type: new GraphQLNonNull(GraphQLString) },
                newClaims: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve: async (source, { userEmail, newClaims }) => userResolver.giveClaims(userEmail, newClaims)
        },
        // HOTEL MUTATIONS
        hotelCreate: {
            type: HotelType,
            args: {
                input: { type: new GraphQLNonNull(HotelInput) },
            },
            resolve: async (source, { input }) => hotelResolver.createHotel(input)
        },
        roomCreate: {
            type: RoomType,
            args: {
                hotelName: { type: new GraphQLNonNull(GraphQLString) },
                input: { type: new GraphQLNonNull(RoomInput) }
            },
            resolve: async (source, { hotelName, input }) => hotelResolver.createRoom(hotelName, input)
        },
        reserveRoom: {
            type: RoomReservationPayload,
            args: {
                hotelName: { type: new GraphQLNonNull(GraphQLString) },
                roomNumber: { type: new GraphQLNonNull(GraphQLInt) },
                userEmail: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (source, { hotelName, roomNumber, userEmail }) => hotelResolver.reserveRoom(hotelName, roomNumber, userEmail)
        }
    })
});

export default MutationType;
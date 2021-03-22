import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, } from 'graphql';
import { HotelInput, HotelType, RoomInput, RoomReservationPayload, RoomType } from './types/hotel'
import { UserType, UserInput, UserPayload } from './types/user';
import dbHotel from "../database/models/hotel";
import * as userResolver from "./resolvers/user";
import * as hotelResolver from "./resolvers/hotel";

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        // USER MUTATIONS
        userRegister: {
            type: UserType,
            args: {
                input: {type: new GraphQLNonNull(UserInput)},
            },
            resolve: async (source, {input}) => userResolver.register(input)
        },
        userLogin: {
            type: UserPayload,
            args: {
                input: {type: new GraphQLNonNull(UserInput)},
            },
            resolve: async (source, {input}) => userResolver.login(input)
        },
        giveClaims: {
            type: UserType,
            args: {
                userEmail: {type: new GraphQLNonNull(GraphQLString)},
                newClaims: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))}
            },
            resolve: async (source, {userEmail, newClaims}) => userResolver.giveClaims(userEmail, newClaims)
        },
        // HOTEL MUTATIONS
        hotelCreate: {
            type: HotelType,
            args: {
                input: {type: new GraphQLNonNull(HotelInput)},
            },
            resolve: async (source, {input}) => hotelResolver.createHotel(input)
        },
        roomCreate: {
            type: RoomType,
            args: {
                hotelName: {type: new GraphQLNonNull(GraphQLString)},
                input: {type: new GraphQLNonNull(RoomInput)}
            },
            resolve: async (source, {hotelName, input}) => hotelResolver.createRoom(hotelName, input)
        },
        reserveRoom: {
            type: RoomReservationPayload,
            args: {
                hotelName: {type: new GraphQLNonNull(GraphQLString)},
                roomNumber: {type: new GraphQLNonNull(GraphQLInt)},
                userEmail: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (source, {hotelName, roomNumber, userEmail}) => hotelResolver.reserveRoom(hotelName, roomNumber, userEmail)
        }
    })
});

export default MutationType;

///MUTATIONS:
// AvailableRooms: {
        //     type: GraphQLList(RoomType),
        //     resolve: () => {
        //         //return Hotel["QL Hotel"].rooms.filter(x => x.isAvailable);
        //     }
        // },
        // bookRoom: {
        //     type: GraphQLString,
        //     args: {
        //         roomNumber: { type: GraphQLInt }
        //     },
        //     resolve: (source, params, args: { roomNumber: number }) => {
        //         const { roomNumber } = params as { roomNumber: number };
        //         /*
        //         let room = Hotel["QL Hotel"].rooms.find(x => x.roomNumber == roomNumber);

        //         if (!room) {
        //             return `Room ${roomNumber} not found`;
        //         }
        //         if (!room.isAvailable) {
        //             return `Room ${roomNumber} already booked`;
        //         }

        //         room.isAvailable = false;
        //         return `Room ${roomNumber} booked succesfully`;
        //         */
        //     }
        // },
        // unbookRoom: {
        //     type: GraphQLString,
        //     args: {
        //         roomNumber: { type: GraphQLInt }
        //     },
        //     resolve: (source, params, args: { roomNumber: number }) => {
        //         /*
        //         const { roomNumber } = params as { roomNumber: number };
        //         let room = Hotel["QL Hotel"].rooms.find(x => x.roomNumber == roomNumber);

        //         if (!room) {
        //             return `Room ${roomNumber} not found`;
        //         }

        //         room.isAvailable = true;
        //         return `Room ${roomNumber} now available for booking`;*/
        //     }
        // }
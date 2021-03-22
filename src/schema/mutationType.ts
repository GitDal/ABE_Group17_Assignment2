import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, } from 'graphql';
import { HotelInput, HotelType, RoomInput, RoomType } from './types/hotel'
import { UserType, UserInput } from './types/user';
import dbHotel from "../database/models/hotel";
import * as userResolver from "./resolvers/user";

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        userRegister: {
            type: UserType,
            args: {
                input: {type: new GraphQLNonNull(UserInput)},
            },
            resolve: async (source, {input}) => userResolver.register(input)
        },
        hotelCreate: {
            type: HotelType,
            args: {
                input: {type: new GraphQLNonNull(HotelInput)},
            },
            resolve: async (source, {input}) => {
                return dbHotel.create(input);
            }
            
        },
        roomCreate: {
            type: RoomType,
            args: {
                hotelName: {type: new GraphQLNonNull(GraphQLString)},
                input: {type: new GraphQLNonNull(RoomInput)}
            },
            resolve: async (source, {hotelName, input}) => {
                const hotel = await dbHotel.findOne({name: hotelName});

                if(!hotel) { throw Error("Hotel not found!") }

                await dbHotel.updateOne(
                    {_id: hotel?._id, 'rooms.number': {$ne: input.number}}, //roomNumber has to be unique in hotel (but not in all hotels)
                    {$push: {"rooms": input}}); 
                return input;
            }

        },
        reserveRoom: {
            type: RoomType,
            args: {
                hotelName: {type: new GraphQLNonNull(GraphQLString)},
                roomNumber: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: async (source, {hotelName, roomNumber}) => {
                
            }
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
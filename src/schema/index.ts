import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, } from 'graphql';
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
                return await dbUser.findOne({ "email": email });
            },
        },
    },
});

export const rootSchema = new GraphQLSchema({
    query: QueryType,
    //TODO add mutaionType
});

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
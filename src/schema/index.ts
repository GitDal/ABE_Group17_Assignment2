import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { HotelType } from './types/hotel'
import dbHotel from "../database/models/hotel";

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        Hotels: {
            type: new GraphQLList(new GraphQLNonNull(HotelType)),
            resolve: async (source, args, { mongoApi }) => {
                return await dbHotel.find(); //kan ikke bruge api? --> kald direkte
            },
        }
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
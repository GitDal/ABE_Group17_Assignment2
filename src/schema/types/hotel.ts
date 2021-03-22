import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { IHotel, IRoom } from "../../database/models/hotel";

export const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: {
        number: {
            type: GraphQLInt,
            resolve: (currentRoom: IRoom) => currentRoom.number
        },
        size: {
            type: GraphQLInt,
            resolve: (currentRoom: IRoom) => currentRoom.size
        },
        available: {
            type: GraphQLBoolean,
            resolve: (currentRoom: IRoom) => currentRoom.available
        },
        beds: {
            type: GraphQLInt,
            resolve: (currentRoom: IRoom) => currentRoom.beds
        },
        balcony: {
            type: GraphQLBoolean,
            resolve: (currentRoom: IRoom) => currentRoom.balcony
        }
    }
});

export const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (currentHotel: IHotel) => currentHotel.name
        },
        address: {
            type: GraphQLString,
            resolve: (currentHotel: IHotel) => currentHotel.address
        },
        rooms: {
            type: new GraphQLList(RoomType),
            resolve: (currentHotel: IHotel) => currentHotel.rooms
        },
        hotelManagerId: {
            type: GraphQLID,
            resolve: (currentHotel: IHotel) => currentHotel.hotelManagerId
        }
    }
});
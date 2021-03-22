import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
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
        },
        reservedByUserId: {
            type: GraphQLString,
            resolve: (currentRoom: IRoom) => currentRoom.reservedByUserId
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

export const HotelInput = new GraphQLInputObjectType({
    name: "HotelInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        hotelManagerId: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) }
    }),
});

export const RoomInput = new GraphQLInputObjectType({
    name: "RoomInput",
    fields: () => ({
        number: { type: new GraphQLNonNull(GraphQLInt) },
        size: { type: new GraphQLNonNull(GraphQLInt) },
        beds: { type: new GraphQLNonNull(GraphQLInt) },
        balcony: { type: new GraphQLNonNull(GraphQLBoolean) }
    }),
});

export interface IRoomReservationPayload {
    status: string;
    reservedBy?: string;
}

export const RoomReservationPayload = new GraphQLObjectType({
    name: "RoomReservationPayload",
    fields: () => ({
        status: { type: new GraphQLNonNull(GraphQLString) },
        reservedBy: { type: GraphQLString },
    }),
});
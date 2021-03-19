import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: {
        number: { 
            type: GraphQLInt,
            resolve: (currentRoom, args) => currentRoom.number
        },
        size: { 
            type: GraphQLInt,
            resolve: (currentRoom, args) => currentRoom.size
        },
        available: { 
            type: GraphQLBoolean,
            resolve: (currentRoom, args) => currentRoom.available
        },
        beds: {
            type: GraphQLInt,
            resolve: (currentRoom, args) => currentRoom.beds
        },
        balcony: {
            type: GraphQLBoolean,
            resolve: (currentRoom, args) => currentRoom.balcony
        }
    }
});

export const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: {
        name: { 
            type: new GraphQLNonNull(GraphQLString),
            resolve: (currentHotel, args) => currentHotel.name
        },
        rooms: { 
            type: new GraphQLList(RoomType),
            resolve: (currentHotel, args) => currentHotel.rooms
        }
    }
});
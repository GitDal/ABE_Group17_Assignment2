import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: {
        roomNumber: { type: GraphQLInt },
        size: { type: GraphQLInt },
        isAvailable: { type: GraphQLBoolean },
        beds: {type: GraphQLInt},
        balcony: {type: GraphQLBoolean}
    }
});

export const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: {
        hotelName: { type: GraphQLString },
        rooms: { type: GraphQLList(RoomType) }
    }
});
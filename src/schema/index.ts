import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
  } from 'graphql';

  import {HotelType, RoomType} from './types/hotel'


  const HotelQueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        Hotel: {
            type: HotelType,
            resolve: () => {
                //return Hotel['QL Hotel'];
            },
        },
        HotelName: {
            type: GraphQLString,
            resolve: () => {
                //return Hotel['QL Hotel'].hotelName;
            }
        },
        Rooms: {
            type: GraphQLList(RoomType),
            resolve: () => {
                //return Hotel["QL Hotel"].rooms;
            }
        },
        AvailableRooms: {
            type: GraphQLList(RoomType),
            resolve: () => {
                //return Hotel["QL Hotel"].rooms.filter(x => x.isAvailable);
            }
        },
        bookRoom: {
            type: GraphQLString,
            args: {
                roomNumber: { type: GraphQLInt }
            },
            resolve: (source, params, args: { roomNumber: number }) => {
                const { roomNumber } = params as { roomNumber: number };
                /*
                let room = Hotel["QL Hotel"].rooms.find(x => x.roomNumber == roomNumber);

                if (!room) {
                    return `Room ${roomNumber} not found`;
                }
                if (!room.isAvailable) {
                    return `Room ${roomNumber} already booked`;
                }

                room.isAvailable = false;
                return `Room ${roomNumber} booked succesfully`;
                */
            }
        },
        unbookRoom: {
            type: GraphQLString,
            args: {
                roomNumber: { type: GraphQLInt }
            },
            resolve: (source, params, args: { roomNumber: number }) => {
                /*
                const { roomNumber } = params as { roomNumber: number };
                let room = Hotel["QL Hotel"].rooms.find(x => x.roomNumber == roomNumber);

                if (!room) {
                    return `Room ${roomNumber} not found`;
                }

                room.isAvailable = true;
                return `Room ${roomNumber} now available for booking`;*/
            }
        }
    },
});

export const HotelScema = new GraphQLSchema({
    query: HotelQueryType,
});

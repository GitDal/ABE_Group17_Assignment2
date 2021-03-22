import dbHotel, { IHotel, IRoom } from "../../database/models/hotel";
import { IRoomReservationPayload } from "../types/hotel";

export async function createHotel(hotel: IHotel) {
    return dbHotel.create(hotel);
}

export async function createRoom(hotelName: string, room: IRoom) {

    const hotel = await dbHotel.findOne({ name: hotelName });

    if (!hotel) { throw Error("Hotel not found!") }

    await dbHotel.updateOne(
        { _id: hotel?._id, 'rooms.number': { $ne: room.number } }, //roomNumber has to be unique in hotel (but not in all hotels)
        { $push: { "rooms": room } });
    return room;
}

export async function reserveRoom(hotelName: string, roomNumber: number, userEmail: string): Promise<IRoomReservationPayload> {
    
    const hotel = await dbHotel.findOne({ name: hotelName });

    let result = await dbHotel.updateOne(
        {_id: hotel?._id, "rooms": { $elemMatch: { "number": roomNumber, "available": true}}},
        {$set: {"rooms.$.available" : false, "rooms.$.reservedByUserId" : userEmail}});

    if(result.nModified === 0){
        return { status: `Room with roomNumber=${roomNumber} couldn't be reserved (maybe its already reserved)`}
    } else {
        return { status: `Reserved room with roomNumber ${roomNumber}!`, reservedBy: userEmail}
    }
}

import dbHotel from "./models/hotel";

const mongoApi = async () => {
    return {
        getHotels: async () => await dbHotel.find(),
    }
};

export default mongoApi;
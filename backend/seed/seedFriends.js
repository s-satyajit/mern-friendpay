import { friends } from "../data/friendsData.js";
import Friend from "../models/friend.js";

const seedFriends = async () => {
  try {
    await Friend.deleteMany();
    const seededFriends = await Friend.insertMany(friends);
    console.log("Seeded friends:", seededFriends);
    return seededFriends;
  } catch (error) {
    console.error("Error seeding friends data:", error);
  }
};

export default seedFriends;

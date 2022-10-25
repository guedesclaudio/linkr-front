import { getFollowedList } from "../services/services.js";
async function checkFollow(post_userId) {
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).user_id;

  try {
    const followed_list = await getFollowedList(userToken);

    if (Number(userId) === Number(post_userId)) {
      return "owner";
    } else if (
      followed_list.data.find(
        (item) => Number(item.followed_id) === Number(post_userId)
      )
    ) {
      return "following";
    }

    return false;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export default checkFollow;

import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { postFollowOrUnfollow } from "../services/services";

export default function FollowButton({
  isFollowed,
  user_id,
  callApi,
  setCallApi,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { userData } = useContext(UserContext);

  async function followOrUnfollow() {
    setButtonDisabled(true);
    const token =
      JSON.parse(localStorage.getItem("user")).token || userData.token;
    const followed_id = user_id;
    const follow_type = isFollowed ? "unfollow" : "follow";
    try {
      await postFollowOrUnfollow(token, followed_id, follow_type);
    } catch (error) {
      alert(error.message);
    }
    setCallApi(callApi + 1);
    setButtonDisabled(false);
  }
  return (
    <ButtonWrapper
      disabled={buttonDisabled}
      isFollowed={isFollowed}
      onClick={followOrUnfollow}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  background-color: ${(props) => (props.isFollowed ? "#FFFFFF" : "#1877f2")};
  color: ${(props) => (!props.isFollowed ? "#FFFFFF" : "#1877f2")};
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  border-radius: 5px;
  width: 112px;
  height: 31px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 2vh;
  cursor: pointer;

  @media (max-width: 450px) {
    left: calc((100vw - 112px) / 2);
    top: 7vh;
  }
`;

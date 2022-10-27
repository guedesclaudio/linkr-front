import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { getFollowedList, postSearchUser } from "../services/services";
import SearchUser from "./SearchUser";
import { DebounceInput } from "react-debounce-input";
import { UserContext } from "../contexts/UserContext";

export default function Search() {
  const { userData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;

  useEffect(() => {
    async function sendSearch() {
      if (search.length > 2) {
        try {
          const followed_list = await getFollowedList(userToken);
          const promise = await postSearchUser(userToken, { search });
          let newList = promise.data;
          newList.map((user) => {
            if (
              followed_list.data.find(
                (item) => Number(item.followed_id) === Number(user.id)
              )
            )
              user.isFollowed = "following";
          });
          return newList;
        } catch (error) {
          console.log(error);
          alert(JSON.stringify(error.response.data));
        }
      } else {
        setList([]);
      }
    }
    async function filterFollowedUsers(filteredList) {
      if (filteredList !== undefined) setList(filteredList);
    }
    const res = sendSearch();
    res.then((searchList) => filterFollowedUsers(searchList));
  }, [search]);

  return (
    <Wrapper>
      <BoxSearch>
        <DebounceInput
          placeholder="Search for people"
          type="text"
          name="search"
          value={search}
          debounceTimeout={300}
          onChange={(e) => setSearch(e.target.value)}
        ></DebounceInput>
      </BoxSearch>

      <ResultList>
        {list.length !== 0
          ? list
              .sort((a, b) => {
                if (a.isFollowed == "following") return -1;
              })
              .map((value, index) => (
                <SearchUser
                  key={index}
                  userId={value.id}
                  username={value.username}
                  picture_url={value.picture_url}
                  setSearch={setSearch}
                  isFollowed={value.isFollowed}
                />
              ))
          : ""}
      </ResultList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const BoxSearch = styled.form`
  input {
    background-color: #ffffff;
    height: 45px;
    width: 563px;
    border-radius: 8px;
    border: none;
    font-size: 19px;
    align-items: center;
    padding: 0 15px;
    margin-top: 12px;
    z-index: 1;

    @media (max-width: 850px) {
      width: 95vw;
    }
  }

  input::placeholder {
    color: #c6c6c6;
  }
  textarea:focus,
  input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const ResultList = styled.div`
  @media (max-width: 850px) {
    position: absolute;
    width: 95%;
    height: auto;
    margin-top: 58px;
  }
`;

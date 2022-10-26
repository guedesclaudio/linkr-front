import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { postSearchUser } from "../services/services";
import SearchUser from "./SearchUser";
import { DebounceInput } from "react-debounce-input";
import { UserContext } from "../contexts/UserContext";
import { FiSearch } from "react-icons/fi";
import checkFollow from "../helpers/checkFollow";

export default function Search() {
  const { userData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;
  async function sendSearch() {
    if (search.length > 2) {
      try {
        const promise = await postSearchUser(userToken, { search });
        setList(promise.data);
        promise.data.map((value) => {
          checkFollow(value.id).then((res) => {
            const isFollowed = res;
            // console.log(isFollowed);
            value.isFollowed = isFollowed;
          });
        });
      } catch (error) {
        alert(JSON.stringify(error.response.data));
        console.log(error);
      }
    } else {
      setList([]);
    }
  }

  useEffect(() => {
    sendSearch();
  }, [search]);

  return (
    <Wrapper>
      <BoxSearch>
        <DebounceInput
          autocomplete="off"
          placeholder="Search for people"
          type="text"
          name="search"
          value={search}
          debounceTimeout={300}
          onChange={(e) => setSearch(e.target.value)}
        ></DebounceInput>
      </BoxSearch>
      <StyledSearch>
        <FiSearch />
      </StyledSearch>
      <ResultList>
        {list.map((value, index) => (
          <SearchUser
            key={index}
            userId={value.id}
            username={value.username}
            picture_url={value.picture_url}
            setSearch={setSearch}
            isFollowed={value.isFollowed}
          />
        ))}
      </ResultList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
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
const StyledSearch = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 8;
  font-size: 19px;
  color: #c6c6c6;
  font-size: 28px;
  cursor: pointer;
`;

import styled from "styled-components";
import { useEffect, useState } from "react";
import { postSearchUser } from "../services/services";
import SearchUser from "./SearchUser";
import { DebounceInput } from "react-debounce-input";

export default function Search() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  async function sendSearch() {
    if (search.length > 2) {
      try {
        const promise = await postSearchUser({ search });
        setList(promise.data);
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
          placeholder="Search for people"
          type="text"
          name="search"
          value={search}
          debounceTimeout={300}
          onChange={(e) => setSearch(e.target.value)}
        ></DebounceInput>
      </BoxSearch>

      <ResultList>
        {list.map((value, index) => (
          <SearchUser
            key={index}
            userId={value.id}
            username={value.username}
            picture_url={value.picture_url}
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

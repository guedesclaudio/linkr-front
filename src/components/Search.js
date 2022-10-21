import styled from "styled-components";
import { useEffect, useState } from "react";
import { postSearchUser } from "../services/services";

export default function Search() {
  const [search, setSearch] = useState("");

  async function sendSearch() {
    try {
      const promise = await postSearchUser({ search });
      console.log(promise.data);
    } catch (error) {
      alert(JSON.stringify(error.response.data));
      console.log(error);
    }
  }

  useEffect(() => {
    sendSearch();
  }, [search]);

  return (
    <>
      <BoxSearch>
        <input
          placeholder="Search for people"
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </BoxSearch>
      ;
    </>
  );
}

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

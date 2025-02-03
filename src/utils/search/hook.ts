import { useState } from "react";
import { useRouter } from "next/router";

export default function useSearchWithEnterState() {
  // BASIC
  const router = useRouter();

  const [tempSearchKeyword, setTempSearchKeyword] = useState("");
  const [get, setSearchKeyword] = useState("");
  function set(value: string) {
    setTempSearchKeyword(value);
    setSearchKeyword(value);
  }
  function reset() {
    set("");
  }
  // --

  // MECHANIC: Enter
  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    setSearchKeyword(tempSearchKeyword);
    router.replace({
      query: {
        ...router.query,
        search: tempSearchKeyword,
      },
    });
  };

  const trigger = () => {
    handleSearch();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  // --

  const props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeKeyword(e),
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e),
    value: tempSearchKeyword,
  };

  return {
    get,
    set,
    reset,
    trigger,
    props,
  };
}

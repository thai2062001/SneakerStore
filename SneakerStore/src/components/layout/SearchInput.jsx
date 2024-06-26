import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Search = () => {
  return (
    <>
      <Input
        size="large"
        placeholder="Search"
        addonAfter={<SearchOutlined className="text-white" />}
      />
    </>
  );
};
const SearchInput = () => {
  return (
    <>
      <div>
        <div className="lg:w-[60rem] bg-black md:w-[30rem] hidden md:flex mt-5 ">
          <Search />
        </div>
      </div>
    </>
  );
};
export default SearchInput;

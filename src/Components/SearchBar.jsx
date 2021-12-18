import React, { useState } from "react";
import data from "../data.json";
function SearchBar() {
  //   console.log(data);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const Search = (e) => {
    if (e.target.value.length > 1) {
      setText(e.target.value);
      let x = data.map((el) => {
        var y = el[0].slice(0, e.target.value.length);
        if (y === e.target.value.toUpperCase()) {
          return el;
        }
        return "0";
      });
      let s = x.filter((el) => el !== "0");
      setList(s);
      console.log(list);
    }
  };
  return (
    <div>
      <input type="text" placeholder="Search Stocks..." onInput={Search} />
      <div>
        {list.map((e) => {
          let name = e[0].split("::");
          let per = (((e[1] - e[2]) / e[2]) * 100).toFixed(2);
          return (
            <>
              <div>{name[0]}</div>
              <div>{name[1]}</div>
              <div>{e[1]}</div>
              <div>{per}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;

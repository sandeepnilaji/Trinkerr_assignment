import React, { useState } from "react";
// import ArrowDropDownIcon from "@material-ui/core/ArrowDropDown";

import data from "../data.json";
// import down from "down-arrow.png";
import "./SearchBar.css";
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
    <div className="show">
      <input type="text" placeholder="Search Stocks..." onInput={Search} />
      <div>
        {list.map((e) => {
          let name = e[0].split("::");
          let per = (((e[1] - e[2]) / e[2]) * 100).toFixed(2);
          return (
            <>
              <div className="main">
                <div className="box1">
                  {" "}
                  <div
                    className="text1"
                    style={
                      per > 0
                        ? { color: "rgb(41,197,193)" }
                        : { color: "rgb(231,89,46)" }
                    }
                  >
                    {name[0]}
                  </div>
                  <div className="text2">{name[1]}</div>
                </div>
                <div className="box2">
                  {" "}
                  <div
                    className="text3"
                    style={
                      per > 0
                        ? { color: "rgb(41,197,193)" }
                        : { color: "rgb(231,89,46)" }
                    }
                  >
                    {e[1]}
                  </div>
                  <div className="text4">
                    {per > 0 ? (
                      <span className="arrow-up"></span>
                    ) : (
                      <span className="arrow-down"></span>
                    )}
                    {per}%
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;

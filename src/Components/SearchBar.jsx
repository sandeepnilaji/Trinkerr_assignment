import React, { useState } from "react";
// import ArrowDropDownIcon from "@material-ui/core/ArrowDropDown";

import data from "../data.json";
// import down from "down-arrow.png";
import "./SearchBar.css";
data = data.map((e) => {
  e.push(false);
  return e;
});
var ls = function () {
  var arr = JSON.parse(localStorage.getItem("watchList"));
  if (arr === null) {
    arr = [];
  }
  localStorage.setItem("watchList", JSON.stringify(arr));
  var arr1 = JSON.parse(localStorage.getItem("watchList"));
  return arr1;
};

function SearchBar() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [watch, setWatch] = useState(ls);
  const Search = (e) => {
    // if (e.target.value.length === 0) {
    //   return false;
    // }
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
    }
  };
  const show_btn = (e) => {
    if (e[3] === false) {
      e[3] = true;
    }
    setShow(true);
  };
  const hide_btn = (e) => {
    if (e[3] === true) {
      e[3] = false;
    }
    setShow(false);
  };
  const addToWatch = (e) => {
    if (e[3] === true) {
      e[3] = false;
    }
    var arr = JSON.parse(localStorage.getItem("watchList"));
    arr.push(e);
    localStorage.setItem("watchList", JSON.stringify(arr));
    var arr1 = JSON.parse(localStorage.getItem("watchList"));
    setWatch(arr1);
  };
  const deleteWatch = (e) => {
    var arr = watch.filter((el) => el[0] !== e[0]);
    console.log(arr);
    localStorage.setItem("watchList", JSON.stringify(arr));
    var arr1 = JSON.parse(localStorage.getItem("watchList"));
    setWatch(arr1);
  };
  return (
    <div className="show">
      <input type="text" placeholder="Search Stocks..." onInput={Search} />
      <div>
        {watch.map((el) => {
          console.log(el);
          let name = el[0].split("::");
          let per = (((el[1] - el[2]) / el[2]) * 100).toFixed(2);
          // el.push(false);
          return (
            <>
              <div
                className="main"
                onMouseOver={() => show_btn(el)}
                onMouseLeave={() => hide_btn(el)}
              >
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
                    {el[1]}
                  </div>
                  <div className="show_add">
                    {" "}
                    {el[3] ? (
                      <>
                        <button className="blue_btn">B</button>
                        <button className="red_btn">S</button>
                        <button
                          className="del_btn"
                          onClick={() => deleteWatch(el)}
                        >
                          de
                        </button>
                        <button>i</button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <button onClick={() => deleteWatch(el)}>de</button> */}
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
      <div>
        {list.map((e) => {
          let name = e[0].split("::");
          let per = (((e[1] - e[2]) / e[2]) * 100).toFixed(2);
          // e.push(false);
          return (
            <>
              <div
                className="main"
                onMouseOver={() => show_btn(e)}
                onMouseLeave={() => hide_btn(e)}
              >
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
                  <div className="show_add">
                    {" "}
                    {e[3] ? (
                      <>
                        <button>B</button>
                        <button>S</button>
                        <button onClick={() => addToWatch(e)}>+</button>
                        <button>i</button>
                      </>
                    ) : (
                      ""
                    )}
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

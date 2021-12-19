import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import data from "../data.json";
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
    if (e.target.value.length === 0) {
      setList([]);
    }
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
    } else {
      e[3] = true;
    }
    var arr = JSON.parse(localStorage.getItem("watchList"));
    arr.push(e);
    localStorage.setItem("watchList", JSON.stringify(arr));
    var arr1 = JSON.parse(localStorage.getItem("watchList"));
    setWatch(arr1);
  };
  const deleteWatch = (e) => {
    var arr = watch.filter((el) => el[0] !== e[0]);
    // console.log(arr);
    localStorage.setItem("watchList", JSON.stringify(arr));
    var arr1 = JSON.parse(localStorage.getItem("watchList"));
    setWatch(arr1);
  };
  const hide_data = () => {
    // console.log(e.target.value.length);
    Search();
  };
  return (
    <div className="show">
      <input
        type="search"
        placeholder="Search Stocks..."
        onInput={Search}
        onKeyDown={hide_data}
      />
      <div>
        <div className="watch_listname">
          <div style={{ marginLeft: "40px", fontSize: "25px" }}> Gaurav</div>
          <div>
            <img
              className="watch_icon"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAADi4uJUVFShoaG8vLzo6Oi5ubn8/PxeXl5bW1vr6+sWFhaenp7j4+NYWFgqKioPDw9jY2Orq6vY2NgeHh5paWkJCQn29vbBwcHIyMgbGxslJSVubm45OTmHh4dISEh/f39BQUGVlZV2dnZCQkLQ0NCPj48uLi4MRJWOAAAD+0lEQVR4nO2dW2OiMBSEA1pErNbetLWttZe1+/9/4UpbWUhOUKwE53S+R8lDZjOTcwKUNYYQQgghhBBCCCGEEEIIIYQQQgghhBBCOia+mo26nkOrTC6jaJp0PYsWSaKcW72rGEdfXGqVGJ9/K4wedRo1mUcFU42rmERlzvVJjOcVhdGDNon/M1gYVVcWE1tfvt1oWsWJIFBV0XAtqqxo5K2ajJKiIWVwi4oGLq4RqCKLvgwWRkXPYjKvFwifRblMKDJq7O6isyfnJ+DtRsjgMDVXerIolImL/PeZ8zNoAydk8OLriisRMouyRb9wjQrYwAmtWpYWV4Usoq2ikMGsfN01KtiRWGjVsuoIVyLUjY26DG6BLhpSmbAFitsNyioKZSKTxsEWDaFVG8ojXYm3CEad7JHBLW6Pugo40wPZVSYq9J2xU98/xskglIkL7+CxO/g+4FwPYp8yUeCuYHQWcrKHIJzosyYCByEnewiNMihY9ORX0H74UisQ0aI/zSCiRYVW7RtEgfu2ap9AZlCwqHcwYgbrT/QWiBbVXybcOTdq1U5f4C9s1XSVCf0ZFHZR72BEi/7KVs07GFGg/+GLAGQGtZcJtmplIC3aJIOIFv2VZUKVQP0n+r0fvhjMDDZ5+AJp0R8+fDl9gTzRl0HMYMJWrQSkRfnwpYQSi7JVw7IoW7USiBb9aat28ivIVq0M4gqqf/hy1ySDiBY19w0EIlpUWBZdZcK47yvrymDO0hLoHQiZwQ2jarumq1X75EZ3BjcMKpOOfcNQLbrhuTzp8zvPKFiLGmsrXXoG4VrUmLSylT7Jg5AFmlFl3tfiGOAMGnsrXUhDkDNo7OlLGw20RY21lUbCAHSBZlWe+sq9jp3BnMrcP5zL4Bk0O7dSeIvax98b6yq+Reu30jt8ixrrryCXxcEiXoxnK+HzSGgW3TAtzz/v2dL14OX1wdWGKjCtCMj6mUcaqkXtnm0HiAKFO4l+AC264UP5ChpTnzsFAu07ifoE1n0wrwJmBs3+WynqChpzrV2gedNtUSOeHSwe3/sIHyTxUpPD+TJ7u/feAcehJ4mbDl8GN9ArV8J+EerPy3g98t3Zx2SyPT49Xo3PtKybxeL5/flsrWvdCCGEEEIIBGkSt0+HHyvtr3wPXo7K/LbXze2PRQh1Wy47uEkw2D2to7IOLbD+vxRpgYfQB0/3C81t477e0SrCHx60TliFoVOYMwmqcM+7+EdFfBlQlcKwu2nQYvhN2N4m3T2hY/M3qED7XcsQyG8dt0c63T2no9ILLHDT1ATpugteO7iXPhoGFPjezXf04/GwF4JZP2yxJ4QQQgghhBBCCCGEEEIIIYQQQgghhBDSHf8A9jUx+ev6zD0AAAAASUVORK5CYII="
              alt="edit"
            />
            <span>
              <img
                className="watch_icon"
                src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png"
                alt="del"
              />
            </span>
          </div>
        </div>
        {watch.map((el) => {
          let name = el[0].split("::");
          let per = (((el[1] - el[2]) / el[2]) * 100).toFixed(2);

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
                          <img
                            src="https://icon-library.com/images/delete-icon-android/delete-icon-android-7.jpg"
                            alt="del"
                            title="Delete Stock"
                          />
                        </button>
                        <button className="i_btn">&#9432;</button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <button onClick={() => deleteWatch(el)}>de</button> */}
                  <div className="text4">
                    {per > 0 ? (
                      <ArrowDropUpIcon style={{ color: "rgb(41,197,193)" }} />
                    ) : (
                      <ArrowDropDownIcon style={{ color: "rgb(231,89,46)" }} />
                    )}
                    {per}%
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="search_show">
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
                        <button className="blue_btn">B</button>
                        <button className="red_btn">S</button>
                        <button
                          className="add_btn"
                          onClick={() => addToWatch(e)}
                          title="Add Stock"
                        >
                          +
                        </button>
                        <button className="i_btn">&#9432;</button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text4">
                    {per > 0 ? (
                      <ArrowDropUpIcon style={{ color: "rgb(41,197,193)" }} />
                    ) : (
                      <ArrowDropDownIcon style={{ color: "rgb(231,89,46)" }} />
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

import React, { Component } from "react";
import _ from "lodash";
import { ReactComponent as Bin } from "../assets/images/recycle.svg";

class Todo extends Component {
  constructor(props) {
    super(props);
    let data = [];
    this.state = {
      data,
      popup: false,
      popupContext: "",
    };
  }

  submit = (event) => {
    let { data } = this.state;
    event.preventDefault();
    if (this.element.value !== "") {
      data.push({
        id: _.uniqueId(),
        name: this.element.value,
        done: false,
        visible: false,
      });
      this.element.value = "";
    }
    this.setState({ data });
  };

  did = (id) => {
    let { data } = this.state;
    data.map((item) => {
      if (id === item.id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({ data });
  };

  ev = (event) => {
    event.preventDefault();
  };

  popupcl = (id) => {
    let { popup, data, popupContext } = this.state;
    this.setState({ popup: !popup });
    data.map((item) => {
      if (id === item.id) {
        popupContext = item.name;
      }
      this.setState({ popupContext });
      return item;
    });
  };

  deldo = (ind) => {
    let { data } = this.state;
    console.log(ind);
    data.map((item, index) => {
      if (ind === index) {
        data.splice(ind, 1);
      }
    });
  };

  popupmec = (event) => {
    let { popup } = this.state;
    this.setState({ popup: !popup });
  };

  popuppst = (event) => {
    event.stopPropagation();
  };

  doneBtn = () => {
    let { data } = this.state;
    data.map((item) => {
      if (item.done === false) {
        item.visible = !item.visible;
      }
      return item;
    });
    this.setState({ data });
  };

  active = () => {
    let { data } = this.state;
    data.map((item) => {
      if (item.done !== false) {
        item.visible = !item.visible;
      }
      return item;
    });
    this.setState({ data });
  };

  search = (event) => {
    event.preventDefault();
    let { data } = this.state;
    let val = this.searchElement.value;
    val = val.toLowerCase();
    if (val !== "") {
      data.map((item) => {
        console.log(item.name, val, item.name.search(val));
        if (item.name.search(val) === -1) {
          item.visible = !false;
        } else {
          item.visible = false;
        }
        return data;
      });
      this.setState({ data });
    } else if (val === "") {
      data.map((item) => {
        item.visible = false;
        return item;
      });
      this.setState({ data });
    }
  };

  render() {
    let { data, popup, popupContext } = this.state;
    return (
      <div>
        <div className={"todoWindow"}>
          <div className={"addBlock"}>
            <form onSubmit={this.submit}>
              <input
                ref={(e) => (this.element = e)}
                type="text"
                placeholder={"I need to Do . . ."}
              />
              <button>Add</button>
            </form>
          </div>
          <div className={"listBlock"} onContextMenu={this.ev}>
            {data.map((item, index) =>
              !item.visible ? (
                <div
                  key={item.id}
                  className={"listDo"}
                  onClick={() => this.did(item.id)}
                  onContextMenu={() => this.popupcl(item.id)}
                >
                  {item.done ? (
                    <del>
                      <p>
                        {" "}
                        {item.name}{" "}
                        <button
                          style={{
                            width: "28px",
                            height: "28px",
                            position: "absolute",
                            right: "10px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0",
                            background: "#E62222",
                            borderRadius: "10px",
                            border: "none",
                            outline: "none",
                            bottom: "10px",
                            paddingBottom: "1px",
                            boxShadow: "0 0 2px 0 red",
                            opacity: "0.9",
                          }}
                          onClick={() => this.deldo(index)}
                        >
                          <Bin
                            style={{
                              width: "20px",
                              height: "20px",
                              fill: "white",
                            }}
                          />
                        </button>
                      </p>
                    </del>
                  ) : (
                    <p>
                      {item.name}{" "}
                      <button
                        style={{
                          width: "28px",
                          height: "28px",
                          position: "absolute",
                          right: "10px",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0",
                          background: "#E62222",
                          borderRadius: "10px",
                          border: "none",
                          outline: "none",
                          bottom: "10px",
                          paddingBottom: "1px",
                          boxShadow: "0 0 2px 0 red",
                          opacity: "0.9",
                        }}
                        onClick={() => this.deldo(index)}
                      >
                        <Bin
                          style={{
                            width: "20px",
                            height: "20px",
                            fill: "white",
                          }}
                        />
                      </button>
                    </p>
                  )}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          {popup ? (
            <div
              onClick={this.popupmec}
              style={{
                width: window.innerWidth,
                height: window.innerHeight,
                position: "absolute",
                background: "rgba(0, 0, 0, 0.4)",
                left: "0",
                top: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1",
              }}
            >
              <div
                onClick={this.popuppst}
                style={{
                  width: "500px",
                  height: "400px",
                  background: "white",
                  boxShadow: "0 0 10px 0 grey",
                  borderRadius: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    width: "80%",
                    height: "80%",
                    wordWrap: "break-word",
                    textAlign: "center",
                  }}
                >
                  {popupContext}
                </h2>
              </div>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={this.search}>
            <input
              onChange={this.search}
              ref={(s) => (this.searchElement = s)}
              type={"search"}
              placeholder={"Search . . ."}
              className={"search"}
            />
          </form>
          <div
            className={"activebuts"}
            style={{
              width: "360px",
              height: "30px",
            }}
          >
            <button onClick={this.active}>Active</button>
            <span>Filter</span>
            <button onClick={this.doneBtn}>Done</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;

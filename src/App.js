import React, { Component } from "react";
import Todo from "./components/Todo";
import { ReactComponent as fav } from "./assets/images/fav.png";

class App extends Component {
  render() {
    return (
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={require("./assets/images/fav.png")}
            width={"40px"}
            style={{ marginRight: "5px" }}
            alt=""
          />
          T o D o L i s t
        </h1>
        <Todo />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";

class App extends Component {
  onChange = ({ target }) => {
    if (target.matches(".id")) {
      console.log("사용자 아이디 입력 중...");
    } else {
      console.log("사용자 패스워드 입력 중...");
    }
  };

  onClick = () => {
    console.log("로그인 시도");
  };

  render() {
    return (
      <div className="container">
        <h1>LogIn</h1>
        <form className="form-container">
          <input
            className="id"
            placeholder="ID를 입력하세요"
            onChange={this.onChange}
          />
          <input
            className="pw"
            placeholder="PW를 입력하세요"
            onChange={this.onChange}
          />
          <button type="button" className="btn" onClick={this.onClick}>
            LogIn
          </button>
        </form>
      </div>
    );
  }
}

export default App;

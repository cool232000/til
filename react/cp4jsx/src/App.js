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

  onClick = (e) => {
    e.preventDefault();
    alert("로그인 시도!");
  };

  render() {
    return (
      <div className="container">
        <form className="form-container">
          <fieldset>
            <legend>회원가입 폼</legend>
            <label htmlFor="userID">
              <span className="a11y-hidden">아이디</span>
              <input
                className="id"
                placeholder="ID를 입력하세요"
                onChange={this.onChange}
              />
            </label>
            <label htmlFor="userPW">
              <span className="a11y-hidden">비밀번호</span>
              <input
                className="pw"
                placeholder="PW를 입력하세요"
                onChange={this.onChange}
              />
            </label>
            <button type="submit" className="btn" onClick={this.onClick}>
              LogIn
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;

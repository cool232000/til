import React from 'react';
import './App.css';
import LoginTemplate from './components/templates/LoginTemplate';
import Form from './components/organisms/Form';
import Fieldset from './components/molecules/Fieldset';
import Input from './components/atoms/Input';
import './components/atoms/Input.css';
import Button from './components/atoms/Button';

const App = () => {
  const userInput = ['id', 'password'];

  const handlechange = (key) => {
    if (key === 'id') {
      console.log('사용자 아이디 입력 중...');
    } else {
      console.log('사용자 패스워드 입력 중...');
    }
  };

  const handleButtonClick = () => {
    alert('로그인 시도!');
  };

  return (
    <LoginTemplate>
      <Form>
        <Fieldset>
          {userInput.map((input, idx) => (
            <Input
              input={input}
              key={`input${idx}`}
              handlechange={handlechange}
            />
          ))}
          <Button handleButtonClick={handleButtonClick} />
        </Fieldset>
      </Form>
    </LoginTemplate>
  );
};

export default App;

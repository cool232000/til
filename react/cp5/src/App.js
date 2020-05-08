import React from 'react';
import './App.css';
import LoginTemplate from './templates/LoginTemplate';
import Form from './organisms/Form';
import Fieldset from './molecules/Fieldset';
import Inputs from './molecules/Inputs';
import Button from './atoms/Button';

const App = () => {
  return (
    <LoginTemplate>
      <Form>
        <Fieldset>
          <Inputs />
          <Button />
        </Fieldset>
      </Form>
    </LoginTemplate>
  );
};

export default App;

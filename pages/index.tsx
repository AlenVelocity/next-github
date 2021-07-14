import React, { useState } from 'react';
import Router from 'next/router';
import { MarkGithubIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import { theme, mixins}  from '../styles';
const { colors, fonts } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.black};
  background-image: linear-gradient(${colors.black} 0%, ${colors.darkGrey} 100%);
  color: ${colors.offWhite};
  height: 100vh;
  form {
    background-color: transparent;
    border-radius: 5px;
    padding: 2rem;
    margin-bottom: 20vh;
    max-width: 600px;
    text-align: center;
    svg {
      color: ${colors.blue};
    }
    label {
      display: block;
      font-size: 2.5rem;
      font-weight: 500;
      margin: 2rem;
    }
    input {
      background-color: #26303c;
      outline: 0;
      border: 0;
      border-radius: 0.25rem;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
      color: ${colors.lightblue};
      font-family: ${fonts.mono};
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
    .submit {
      ${mixins.blueButton};
      margin-top: 3rem;
      filter: none;
    }
  }
`;

const Home = () => {
  const [username, setUsername] = useState('');
  const handleChange = (e: { target: { value: string }}) => setUsername(e.target.value);

  return (
    <main>
      <StyledContainer>
        <form
          onSubmit={e => {
            e.preventDefault();
            Router.push({
              pathname: '/api/card',
              query: { username },
            });
          }}>
          <MarkGithubIcon size="large" />
          <label htmlFor="username">Find Your Profile</label>
          <input name="username" type="text" onChange={handleChange} />
        </form>
      </StyledContainer>
    </main>
  );
};
export default Home
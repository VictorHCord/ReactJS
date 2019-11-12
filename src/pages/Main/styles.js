import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form.attrs(props => ({
  error: props.error,
}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 15px;
    font-size: 16px;
  }
  ${props =>
    props.error &&
    css`
      input {
        border: 1px solid red;
      }
    `}
`;

const rotate = keyframes`
    from{
        transform:rotate(0deg)
    }
    to{
        transform:rotate(3600deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #3c4556;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 0;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #3c4556;
      text-decoration: none;
    }
  }
`;

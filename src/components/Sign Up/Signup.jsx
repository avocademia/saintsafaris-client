import styled from "styled-components"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import signup from '../../hooks/Signup'
import { useNavigate } from "react-router-dom"
import PhoneInput from "react-phone-input-2"

const SignUpForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 10px;
`
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 10px;
`
const ShortInput = styled.input`
  margin-top: 5px;
  width: 130px;
  font-size: 13px;
  height: 25px;
  font-family: "poppins", sans-serif;
  background-color: #f0f0f0;
  color: #1b1b1b;
  border-radius: 5px;
  border: 1px #1b1b1b solid;
  padding: 3px;
`
const LongInput = styled.input`
  font-size: 14px;
  height: 25px;
  margin-top: 5px;
  width: 260px;
  background-color: #f0f0f0;
  color: #1b1b1b;
  border-radius: 5px;
  border: 1px #1b1b1b solid;
  padding: 3px;
`
const Label = styled.label`
  font-size: 11px;
  font-family: "nunito", sans-serif;
`
const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  font-family: "nunito", sans-serif;
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`
const Checkbox = styled.input`
  margin-right: 10px;
`
const TermsLabel = styled.label`
  font-size: 12px;
  font-family: "nunito", sans-serif;
`
const Button = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: none;
  transition: 0.3s ease;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff6f00")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#944103")};
  }
`
const A = styled.a`
  color: #c95802;
`
const UsernameErrorLink = styled.a`
  font-size: 12px;
  color: red;
  font-family: "nunito", sans-serif;
  margin-top: 5px;
  text-decoration: underline;
  cursor: default;
`

const Signup = () => {
  const initialUser = {
    first_name: "",
    middle_name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    dob: "",
    dp: null,
  }

  const navigate = useNavigate()
  const [user, setUser] = useState(initialUser)
  const [agreed, setAgreed] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [usernameError, setUsernameError] = useState()

  const handleChange = ({ target }) => {
    const { name, value } = target

    if (name === 'username') {
      const allowed = /^[a-z0-9._]*$/
      if (allowed.test(value) || value === '') {
        setUser((currentUser) => ({
          ...currentUser,
          [name]: value,
        }))
        setUsernameError('')
      } else {
        setUsernameError(
          `Username can only contain lowercase letters, 
           numbers, dots (.) and underscores (_)
          `
        )
      }
    }
    
    if (name === "confirm_password" || name === "password") {
      setPasswordMatch(user.password === value || user.confirm_password === value);
    }

    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }))
  }


  const handleCheckboxChange = () => {
    setAgreed((prev) => !prev)
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (!agreed) return

    try {
      await signup(user)
      setUser(initialUser)
      navigate("/")
    } catch (error) {
      setUser(initialUser)
    }
  }

  return (
    <SignUpForm onSubmit={handleSignUp}>
      <FieldContainer>
        <Label htmlFor="first_name">First Name</Label>
        <ShortInput
          type="text"
          name="first_name"
          placeholder="First Name"
          required
          value={user.first_name}
          onChange={handleChange}
        />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="middleName">Middle Name</Label>
        <ShortInput
          type="text"
          name="middle_name"
          placeholder="Middle Name"
          value={user.middle_name}
          onChange={handleChange}
        />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="surname">Surname</Label>
        <ShortInput
          type="text"
          name="surname"
          placeholder="Surname"
          required
          value={user.surname}
          onChange={handleChange}
        />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="username">Username</Label>
        <ShortInput
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          required
          value={user.username}
          onChange={handleChange}
        />
        {usernameError && (
          <UsernameErrorLink>
            {usernameError}
          </UsernameErrorLink>
        )}
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="email">Email</Label>
        <LongInput
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={user.email}
          onChange={handleChange}
        />
      </FieldContainer>

      <FieldContainer>
        <PhoneInput
           country={'ke'}
           name="phone_number"
           value={user.phone_number}
           onChange={(value) => {
              setUser((currentUser) =>({
                 ...currentUser,
                phone_number: value
              }))
           }}
           inputStyle={{ width: '100%' }}
           required
        />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="password">Password</Label>
        <LongInput
          type="password"
          name="password"
          placeholder="Password"
          required
          value={user.password}
          onChange={handleChange}
        />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <LongInput
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          required
          value={user.confirm_password}
          onChange={handleChange}
        />
        {!passwordMatch && (
          <ErrorMessage>Passwords do not match</ErrorMessage>
        )}
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="dob">Date Of Birth</Label>
        <LongInput
          type="date"
          name="dob"
          required
          value={user.dob}
          onChange={handleChange}
        />
      </FieldContainer>

      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={handleCheckboxChange}
        />
        <TermsLabel htmlFor="terms">
          I agree to the{" "}
          <A href="/terms+conditions" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </A>{" "}
          and{" "}
          <A href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </A>
        </TermsLabel>
      </CheckboxContainer>

      <FieldContainer style={{ marginTop: "20px" }}>
        <Button type="submit" disabled={!agreed}>
          Sign Up
        </Button>
      </FieldContainer>
      <ToastContainer />
    </SignUpForm>
  );
};

export default Signup;

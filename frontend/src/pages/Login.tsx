import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import axios from 'axios';
import { BottomWarning } from '../components/BottomWarning';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
  return (
    <div className="bg-linear-to-b to-pink-300 from-pink-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading
            label={"Enter your credientials to access your account"}
          />
          <InputBox 
            onChange={(e : any) => {
              setEmail(e.target.value);
            }}
            placeholder="abcde@gmail.com"
            label={"Email"}
          />
          <InputBox 
            onChange={(e : any) => {
              setPassword(e.target.value);
            }}
            placeholder="Must be greater than 8"
            label={"Password"} type={"password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://assignment-task-ckag.onrender.com/api/v1/login",
                    {
                      email,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  alert(error || "Invalid credentials");
                }
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
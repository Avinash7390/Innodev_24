import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { Alert, Button, Label , Spinner , TextInput } from "flowbite-react";

import { useEffect } from 'react';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error:errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    dispatch(signInFailure(null));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

if(!formData.email || !formData.password)
{
  return dispatch(signInFailure('Please fill all the fields'));
}

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      if(res.ok)
      {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row p-3 max-w-3xl mx-auto md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Aman's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google
          </p>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label value="Your email"></Label>
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <Label value="Your password" />
              <input
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              disabled={loading}
              type="submit"
              className=" text-white p-2 rounded-lg uppercase"
            >
               {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <p>Dont Have an account?</p>
            <Link to="/sign-up">
              <span
                onClick={() => dispatch(signInFailure(null))}
                className="text-blue-500"
              >
                Sign up
              </span>
            </Link>
          </div>
{errorMessage && (
  <Alert color="failure" className="mt-5">
   {errorMessage}
  </Alert>
)}


          
        </div>
      </div>
    </div>
  );
}

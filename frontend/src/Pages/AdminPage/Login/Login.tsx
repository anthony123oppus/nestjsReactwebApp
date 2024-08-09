import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { loginBg, sadasd, loginImage } from "../../../util/Image";
import { Input } from "../../../Components/Form/Input";

import { authSliceActions } from "../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PiEyeClosed, PiEye } from "react-icons/pi";

// types
import { loginData } from "../../../types/login";
import PublicLayout from "../../../Components/Layout/PublicLayout";
// import axios from "axios";
import api from "../../../Components/API/api";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [data, setData] = useState<loginData>({
    username : '',
    password : ''
  })

  const [errMsg , setErrMsg] = useState<string>('')

  useEffect(() => {
    if(errMsg){
      setTimeout(() => setErrMsg('') ,4000 )
    }
  }, [errMsg])

  const [isPassShow, setIsPassShow] = useState<boolean>(false)

  const handleShowPass = () => {
    setIsPassShow(!isPassShow)
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.id
    const inputValue = event.target.value

    setData(prevData => ({
      ...prevData,
      [inputName] : inputValue
    }))
  }

  const submitForm: FormEventHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (data.password !== '' && data.username !== '') {
      try {
        const responseToken = await api.post('/api/auth/login', data);
        console.log(responseToken, "responseToken")
        if (responseToken.data) {
          localStorage.setItem('access_token', responseToken.data.accessToken);
          localStorage.setItem('refresh_token', responseToken.data.refreshToken);

          const responseStatus = await api.get('/api/auth/status', {
            headers: {
              Authorization: `Bearer ${responseToken.data.accessToken}`
            }
          });
          if (responseStatus.data) {
            dispatch(authSliceActions.authenticate(responseStatus.data));
            navigate('/dashboard');
          }
        }
      } catch (error) {
        setErrMsg('Sorry, Incorrect Credentials');
      }
    } else {
      setErrMsg('Please Enter Credentials');
    }
  };

  return (
    <PublicLayout>
      {/* <div className="h-20">
        hello
      </div> */}
      <section className="w-full h-screen flex relative overflow-hidden">
        <img
          src={sadasd}
          alt=""
          className="absolute bottom-0 left-0 z-1 h-[500px] w-[1200px] bg-red-"
        />
        <div className="anthonyName absolute left-12 bottom-20 h-80 w-20 z-30 flex flex-col gap-1 items-end justify-center">
          <h5 className="text-5xl font-coolFont text-white">OPPUS</h5>
          <h5 className="text-base font-work-sans bg-black text-white rounded-[2px] font-bold">ANTHONY</h5>
        </div>
        <div className="h-full w-[55%] flex justify-center items-center z-10 flex-col pt-32">
          <div className="flex justify-center items-end relative h-full w-full ">
            <div className="absolute -top-6 flex flex-col items-center">
              <h5 className=" text-[55px] font-bold font-coolFont text-[#0166ff] h-[65px]">Welcome</h5>
              <p className="font-work-sans text-lg">We are glad to see you again, <span className="text-[#0166ff] font-coolFont">Master</span>.</p>
            </div>
            <img src={loginBg} alt="" className="h-[600px] w-[600px] z-20" />
          </div>
        </div>
        <div className="relative w-[45%] h-full flex justify-start items-start z-2 pt-40">
          <img
          src={loginImage}
          alt=""
          className="absolute bottom-0 top-0 right-0 z-1 h-[300px] w-[400px] bg-red-"
        />
          <div className="w-[60%] flex flex-col gap-6 z-20 rounded-[8px] pt-5 pb-10 px-2"> 
              <div className="flex flex-col items-center">
                <h5 className="text-5xl w-full text-center text-[#0166ff] font-coolFont">Lets get started.</h5>
                <p className="text-[13px] font-work-sans">Please login correct credentials to proceed.</p>
                <p className={`h-6 w-full bg-red-200 text-red-800 flex justify-center items-center text-[13px] mt-1 rounded-[8px] transition-all duration-200 delay-75 ${errMsg !== '' ? 'visible scale-100' : 'invisible scale-50'}`}>{errMsg}</p>
              </div>
             <form method="" onSubmit={submitForm} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Username</label>
                      <Input
                        id="username"
                        placeholder="sample@gmail.com"
                        name="Username"
                        className="personalInformation"
                        type="text"
                        value={data.username}
                        onChange={handleInput}
                      />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="password">Password</label>
                      <Input
                        id="password"
                        placeholder="Password"
                        name="Password"
                        className="personalInformation"
                        type={isPassShow ? 'text' : 'password'}
                        value={data.password}
                        onChange={handleInput}
                      />
                      {data.password &&
                        (isPassShow ?
                          <PiEyeClosed className="text-[#0166ff] absolute bottom-3 right-3 h-5 w-5 cursor-pointer" onClick={handleShowPass}/>
                            :
                          <PiEye className="text-[#0166ff] absolute bottom-3 right-3 h-5 w-5 cursor-pointer" onClick={handleShowPass}/>
                        )
                      }
                  </div>

                  <button type="submit" className="bg-[#0166ff] rounded-[8px] w-full h-[40px] mt-8 text-white">Login</button>
             </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Login;

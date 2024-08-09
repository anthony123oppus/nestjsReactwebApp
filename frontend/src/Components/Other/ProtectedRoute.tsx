/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/AuthSlice";
import api from "../API/api";
import { infoDataTypes } from "../../types/devInfo";
import axios from "axios";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isAuth = useSelector(
    (state: RootState) => ({
      isAuth: state.AuthSlice.isAuth,
      userLogin: state.AuthSlice.user,
    }),
    shallowEqual
  );

  const handleLogin = useCallback(async (accessToken: string, refreshToken: string) => {
    try {
      const responseStatus = await api.get("/api/auth/status", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (responseStatus.status === 200 && responseStatus.data) {
        try {
          const response = await axios.get<infoDataTypes[]>('http://localhost:3000/api/dev-info')
          const { devInfo } = response.data[0]
          dispatch(authSliceActions.authenticate({...isAuth.userLogin, devInfo : devInfo}))
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
      if ((error as any).response && (error as any).response.status === 401) {
        try {
          const responseToken = await api.post("/api/auth/refresh", {
            refresh: refreshToken,
          });

          if (responseToken.status === 200 && responseToken.data) {
            const newAccessToken = responseToken.data.accessToken;
            localStorage.setItem('access_token', newAccessToken);
            localStorage.setItem('refresh_token', refreshToken);
            
            await handleLogin(newAccessToken, refreshToken); // Retry login with new token
          }
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError);
          navigate("/login", {replace : true}); // Navigate to login on refresh token failure
        }
      } else {
        console.error('Authentication failed', error);
        navigate("/error"); // Navigate to error page for other errors
      }
    }
  }, [dispatch, navigate, isAuth.userLogin]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!accessToken || !refreshToken) {
      navigate('/login', { replace: true });
    } else if (!isAuth.isAuth) {
        handleLogin(accessToken, refreshToken);
    }
  }, [isAuth.isAuth, navigate, handleLogin]);

  return children;
};

export default ProtectedRoute;

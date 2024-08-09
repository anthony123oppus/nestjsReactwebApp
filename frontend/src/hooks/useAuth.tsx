// /* eslint-disable @typescript-eslint/no-explicit-any */
// // apiService.ts

// // wala ni sya gamit na hook

// import axios from 'axios';

// export const checkAuthStatus = (accessToken: string) => {
//   return axios.get("http://localhost:3000/api/auth/status", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// };

// export const refreshAccessToken = (refreshToken: string) => {
//   return axios.post("http://localhost:3000/api/auth/refresh", JSON.stringify({
//     refresh: refreshToken,
//   }));
// };

// // useAuth.ts
// // import { useCallback, useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { authSliceActions } from '../store/AuthSlice';

// // const useAuth = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogin = useCallback(async (accessToken: string, refreshToken: string) => {
// //     try {
// //       const responseStatus = await checkAuthStatus(accessToken);

// //       if (responseStatus.status === 200 && responseStatus.data) {
// //         dispatch(authSliceActions.authenticate(responseStatus.data));
// //         navigate("/dashboard", {replace : true});
// //       }
// //     } catch (error) {
// //       if ((error as any).response && (error as any).response.status === 401) {
// //         console.log('erroring')
// //         try {
// //           const responseToken = await refreshAccessToken(refreshToken);
// //           console.log(responseToken)
// //           if (responseToken.status === 200 && responseToken.data) {
// //             const newAccessToken = responseToken.data.accessToken;
// //             localStorage.setItem("token", JSON.stringify({
// //               accessToken: newAccessToken,
// //               refreshToken: refreshToken
// //             }));
// //             const responseStatus = await checkAuthStatus(newAccessToken);

// //             if (responseStatus.status === 200 && responseStatus.data) {
// //                 dispatch(authSliceActions.authenticate(responseStatus.data));
// //                 navigate("/dashboard");
// //             }
// //             await handleLogin(newAccessToken, refreshToken); // Retry login with new token
// //           }
// //         } catch (refreshError) {
// //           console.error('Token refresh failed', refreshError);
// //           navigate("/login", {replace : true}); // Navigate to login on refresh token failure
// //         }
// //       } else {
// //         console.error('Authentication failed', error);
// //         navigate("/error"); // Navigate to error page for other errors
// //       }
// //     }
// //   }, [dispatch, navigate]);

// //   useEffect(() => {
// //     const storageToken = localStorage.getItem("token");
// //     if (storageToken) {
// //       const { accessToken, refreshToken } = JSON.parse(storageToken);
// //       handleLogin(accessToken, refreshToken);
// //     }
// //   }, [handleLogin]);

// //   return null;
// // };

// // export default useAuth;

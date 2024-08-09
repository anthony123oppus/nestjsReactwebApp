/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, ChangeEvent, FormEventHandler, useEffect, useCallback} from "react";
import DefaultLayout from "../../../Components/Layout/DefaultLayout";
import { FaUserShield } from "react-icons/fa6";

import Info from "../../../Components/Other/Info";
import Modal from "../../../Components/Form/Modal";
import { Input } from "../../../Components/Form/Input";
import { Select } from "../../../Components/Form/Select";

// import Userone from '../../../assets/images/user/user-01.png'
import { profile } from "../../../util/Image";
import { Textarea } from "../../../Components/Form/Textarea";
import { addInfo, infoDataTypes } from "../../../types/devInfo";
import { UploadImg } from "../../../Components/Form/UploadImg";

import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../../store/AuthSlice";
import { RootState } from "../../../store";
import ImageCropper from "../../../Components/Form/ImageCropper";
import { dialogSliceActions } from "../../../store/dialog";
import ComponentsHeader from "../../../Components/Other/Header";
import WorkExp from "./WorkExp";
import Education from "./Education";

const User = () => {

  const dispatch = useDispatch()

  const isAuth = useSelector(
    (state: RootState) => ({
      isAuth: state.AuthSlice.isAuth,
      userLogin: state.AuthSlice.user,
    }),
    shallowEqual
  );

  const [data, setData] = useState<addInfo>({
      firstName : '',
      middleName : '',
      lastName : '',
      age : null,
      birthDate : '',
      gender : '',
      devMotto : '',
      devImage : null
  })

  const handleResetData = () => {
    setData(prevData => ({
      ...prevData,
      firstName : '',
      middleName : '',
      lastName : '',
      age : null,
      birthDate : '',
      gender : '',
      devMotto : '',
      devImage : null
    }))
  }

  const AgeCalculator = ( birthDate  : string) => {

    const calculateAge = (birthDate: Date, currentDate: Date): number => {
      const diff = currentDate.getTime() - birthDate.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
  
    const currentDate = new Date();
    const convertedBirthDate = new Date(birthDate);
    const age = calculateAge(convertedBirthDate, currentDate);
  
    return age;
  };

  useEffect(() => {
    if(data.birthDate){
      const ageCalculate = AgeCalculator(data.birthDate)
      setData(prevData => ({
        ...prevData,
        age : ageCalculate
      }))
    }
  },[data.birthDate])


  const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleModal = () => {
        setIsOpen(!isOpen)
        if(!isOpen){
          handleResetData()
        }
    }

    const [isUpload, setIsUpload] = useState<boolean>(false)

    const handleUploadModal = () => {
        setIsUpload(!isUpload)
    }
  

  const handleInput = (event : ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.id
    const inputValue = event.target.value

    setData(prevData => ({
      ...prevData,
      [inputName] : inputValue
    }))
  }

  const handleSelect = (event : ChangeEvent<HTMLSelectElement>) => {
    const inputName = event.target.id
    const inputValue = event.target.value

    setData(prevData => ({
      ...prevData,
      [inputName] : inputValue
    }))
  }

  const handleTextArea = (event : ChangeEvent<HTMLTextAreaElement>) => {
    const inputName = event.target.id
    const inputValue = event.target.value

    setData(prevData => ({
      ...prevData,
      [inputName] : inputValue
    }))
  }

  const appendToFormData = (data: addInfo): FormData => {
    const formData = new FormData();
  
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof addInfo];
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      }
    }
  
    return formData;
  };

  
  const handleResponseStatus = (status : number, type : string) => {
    if(status === 200){
      handleModal()
      handleResetData()
      handleFetch()
      if(type === 'update'){
        dispatch(
          dialogSliceActions.onDialog({
            type: "success",
            header:  'Updated Successfully' ,
            message:  'Developer Information Successfully Updated' ,
          })
        );
      }else{
        dispatch(
          dialogSliceActions.onDialog({
            type: "success",
            header:  'Added Successfully' ,
            message:  'Developer Information Successfully Added' ,
          })
        );
      }
    }
  }

  const handleSubmit : FormEventHandler = async(event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const formData = appendToFormData(data)
    try {
      console.log('try')
        if(dataFetch){
          if(dataFetch.devInfo.id){
            const response = await axios.patch(`http://localhost:3000/api/dev-info/${dataFetch.id}/info`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            handleResponseStatus(response.status, 'update')
          }else{
            const response = await axios.post(`http://localhost:3000/api/dev-info/${dataFetch.id}/info`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            handleResponseStatus(response.status, 'create')
          }
      }
    } catch (error) {
      dispatch(
        dialogSliceActions.onDialog({
          type: "error",
          header: "Adding Failure",
          message: "Failed in Adding Skill, Be sure to Provide all input Form",
        })
      );
      console.error(error)
    }

  }

  const [dataFetch, setDataFetch] = useState<infoDataTypes>()

  const handleFetch = useCallback(async() => {
    try {
      const response = await axios.get<infoDataTypes[]>('http://localhost:3000/api/dev-info')
      const { devInfo } = response.data[0]
      setDataFetch(response.data[0])
      dispatch(authSliceActions.authenticate({...isAuth.userLogin, devInfo : devInfo}))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]);

  // convert database date to new Date 
  const convertDate = (date : string) => {
    const birthDate = new Date(date);
    const adjustedDate = new Date(birthDate.getTime() - birthDate.getTimezoneOffset() * 60000);
    const isoString = adjustedDate.toISOString().split('T')[0];

    return  isoString
  }
  
  
  useEffect(() => {
    const handleDataUpdate = () => {

      if (dataFetch?.devInfo) {
        const updateImg = new Image();
        const imageUrl = `http://localhost:3000/uploads/${dataFetch.devInfo.devImage}`;
    
        updateImg.src = imageUrl;
        updateImg.crossOrigin = "anonymous"; // Allow cross-origin loading
    
        updateImg.onload = () => {
          console.log("Image loaded successfully");
          const canvas = document.createElement("canvas");
          canvas.width = updateImg.naturalWidth;
          canvas.height = updateImg.naturalHeight;
    
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(updateImg, 0, 0);
    
            canvas.toBlob((blob) => {
              if (blob) {
                console.log("Image blob created");
                const file = new File([blob], dataFetch.devInfo.devImage, { type: blob.type });
                console.log("File created:", file);
    
                setData((prevData) => ({
                  ...prevData,
                  firstName: dataFetch.devInfo.firstName,
                  middleName: dataFetch.devInfo.middleName,
                  lastName: dataFetch.devInfo.lastName,
                  age: dataFetch.devInfo.age,
                  birthDate: convertDate(dataFetch.devInfo.birthDate),
                  gender: dataFetch.devInfo.gender,
                  devMotto: dataFetch.devInfo.devMotto,
                  devImage: file,
                }));
    
                console.log("State updated with new data");
              }
            }, "image/jpeg");
          }
        };
    
        updateImg.onerror = (error) => {
          console.error("Failed to load image:", error);
        };
      }
    }; 

    if (isOpen) {
      handleDataUpdate();
    }
  }, [isOpen, dataFetch]);
  
  

  useEffect(() => {
    handleFetch()
  }, [handleFetch])
  

  const formatDate = (date : string ) => {
    const datecre = new Date(date)
    const dateD = datecre.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    })
    return dateD;
}


  return (
    <DefaultLayout>
      <div className=" bg-white flex flex-col gap-4">
        <div className="w-full h-full rounded-[8px] shadow-lg border border-indigo-800 py-[40px] px-2 md:px-[30px]" >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <ComponentsHeader headerIcon={<FaUserShield className="h-6 w-6"/>} title={'Developer Account'} description={'One and only user can login in this admin'}/>
              <div className="mt-8 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleModal}
                >
                  {dataFetch?.devInfo ? 'Update' : 'Add'} Developer
                </button>
              </div>
            </div>
          </div>
          <hr className="mt-4 text-indigo-600" />
          <div className="mt-8 h-full overflow-hidden ">
            <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
                <div className="h-fit flex flex-col md:flex-row gap-2">
                    <UploadImg className="w-full md:w-1/2 ">
                        <img src={`http://localhost:3000/uploads/${dataFetch ? dataFetch.devInfo.devImage : ''}`} alt="" className="w-full rounded-[8px]"/>
                    </UploadImg>
                    <div className="w-full md:w-1/2 flex flex-col gap-1">
                        <div className="mt-4 w-full flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl font-work-sans">{dataFetch && `${dataFetch.devInfo.firstName} ${dataFetch.devInfo.middleName.charAt(0)}. ${dataFetch.devInfo.lastName}`}</h1>
                            <h5 className="text-lg font-inter">Software Developer</h5>
                        </div>
                        <div className="w-full h-full flex flex-col gap-1 p-2">
                            <h2 className="text-md font-work-sans">Developer Information</h2>
                            <div className="md:pl-20 flex flex-col gap-1 text-base font-inter">

                                <Info label="Firstname" value={dataFetch ? dataFetch.devInfo.firstName : ''} />
                                <Info label="Middlename" value={dataFetch ? dataFetch.devInfo.middleName : ''} />
                                <Info label="Lastname" value={dataFetch ? dataFetch.devInfo.lastName : ''} />
                                <Info label="Age" value={dataFetch ? dataFetch.devInfo.age.toString() : ''} />
                                <Info label="Gender" value={dataFetch ? dataFetch.devInfo.gender : ''} />
                                <Info label="Birth Date" value={dataFetch ? formatDate(dataFetch.devInfo.birthDate) : ''} />
                            </div>
                        </div>
                        <div className="w-full flex flex-col border-2 border-indigo-500 rounded-[8px] bg-gray  p-2 gap-2">
                            <h2 className="text-md font-work-sans">Developer Motto</h2>
                            <p className="indent-10 font-inter h-20 text-[14px]">{dataFetch ? dataFetch.devInfo.devMotto : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <WorkExp />
        <Education />
      </div>
      

      <Modal className="h-[95vh] w-full md:w-[900px]" isOpen={isOpen} onClick={handleModal}>
        <form method="" onSubmit={handleSubmit} className="w-full h-full py-8 px-8 flex flex-col gap-4">
          <h5 className="text-center w-full text-2xl">Developer Information</h5>
          <div className="flex flex-col md:gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col md:gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <label htmlFor="firstName">Firstname</label>
                    <Input
                        id="firstName"
                        placeholder="First Name"
                        name="First Name"
                        className="personalInformation"
                        type="text"
                        value={data.firstName}
                        onChange={handleInput}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="middleName">MiddleName</label>
                    <Input
                        id="middleName"
                        placeholder="Middle Name"
                        name="Middle Name"
                        className="personalInformation"
                        type="text"
                        value={data.middleName}
                        onChange={handleInput}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lastName">Lastname</label>
                    <Input
                        id="lastName"
                        placeholder="Last Name"
                        name="Last Name"
                        className="personalInformation"
                        type="text"
                        value={data.lastName}
                        onChange={handleInput}
                    />
                </div>
                <div className="flex flex-row md:flex-col gap-1"> 
                  <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="birthDate">Birth Date</label>
                        <Input
                            id="birthDate"
                            placeholder="Birthday"
                            className="personalInformation flex flex-col justify-between"
                            type="date"
                            value={data.birthDate}
                            onChange={handleInput}
                            max={'9999-12-31'}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="gender">Gender</label>
                        <Select
                            id="gender"
                            value={data.gender}
                            className="personalInformation"
                            name="Gender"
                            onChange={handleSelect}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                    </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col md:gap-3">
                <div className="h-full w-full md:flex flex-col gap-1">
                    <label htmlFor="profile">Profile Picture</label>
                    <UploadImg className="h-[310px] w-[410px] hidden md:flex rounded-[8px] border-2 border-dashed border-indigo-500 cursor-pointer" onClick={handleUploadModal}>
                      {data.devImage ?
                        <div className="w-full h-full rounded-[8px] bg-white">
                          <img src={URL.createObjectURL(data.devImage)} alt="" className="object-fill object-center w-full h-full rounded-[8px]"/>
                        </div>
                            :
                        <div className="w-full h-full rounded-[8px] bg-white">
                          <img src={profile} alt="" className="object-fill object-center w-full h-full rounded-[8px]"/>
                        </div>
                      }
                    </UploadImg>
                </div>
                <button type="button" onClick={handleUploadModal} className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload Photo</button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
                    <label htmlFor="devMotto">Developer Motto</label>
                    <Textarea
                        id="devMotto"
                        placeholder="Type your motto..."
                        name="Developer Motto"
                        className="h-20"
                        value={data.devMotto}
                        onChange={handleTextArea}
                    />
                </div>
          </div>
          <div className="w-full mt-2 flex h-[40px] pr-4 gap-6 justify-end">
            <button type="button" className="h-[40px] w-fit px-10 flex justify-center items-center bg-black/40 bg-gray rounded-[8px]" onClick={handleModal}>Cancel</button>
            <button type="submit" className="h-[40px] w-fit px-10 flex justify-center items-center bg-indigo-600 rounded-[8px] text-white">Submit</button>
          </div>
        </form>
      </Modal>

      <ImageCropper isUpload={isUpload} handleUploadModal={handleUploadModal} setData={setData} aspectRatio={1.2} minHeight={150} minWidth={200} dataName="devImage"/>

    </DefaultLayout>
  );
};

export default User;

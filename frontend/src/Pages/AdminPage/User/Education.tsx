import React, { Fragment, useEffect, useState } from "react";
import ComponentsHeader from "../../../Components/Other/Header";
import { FaNetworkWired } from "react-icons/fa";
import api from "../../../Components/API/api";
// import DeleteToast from "../../../Components/Other/DeleteToast";

import { educationFetchTypes, educationTypes } from "../../../types/education";
import EducationModal from "./EducationModal";
import DeleteToast from "../../../Components/Other/DeleteToast";

const Education = () => {
  const [educationModal, setEducationModal] = useState<boolean>(false);
  const [updatedId, setUpdatedId] = useState<number | null>(null);

  const [data, setData] = useState<educationTypes>({
    degree: "",
    schoolName: "",
    course: "",
    monthGraduated: "",
    yearGraduated: "",
    schoolAddress: "",
    schoolImage: null,
  });

  const handleReset = () => {
    setData((prevData) => ({
      ...prevData,
      degree: "",
      schoolName: "",
      course: "",
      monthGraduated: "",
      yearGraduated: "",
      schoolAddress: "",
      schoolImage: null,
    }));
    setUpdatedId(null);
  };

  const handleEducationModal = () => {
    setEducationModal(!educationModal);
    if (educationModal) {
      handleReset();
    }
  };

  const [education, setEducation] = useState<educationFetchTypes[]>();

  const handleFetch = async () => {
    try {
      const response = await api.get("/api/education");
      if (response.status === 200) {
        setEducation(response.data);
      }
      console.log(response, "ressponssible");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleUpdate = async (item: educationFetchTypes) => {
    try {
        const imageUrl = `http://localhost:3000/uploads/${item.schoolImage}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], item.schoolImage, { type: blob.type });

      setData((prevData)  => ({
        ...prevData,
        degree: item.degree.id.toString(),
        schoolName: item.schoolName,
        course: item.course,
        monthGraduated: item.monthGraduated,
        yearGraduated: item.yearGraduated,
        schoolAddress: item.schoolAddress,
        schoolImage: file,
      }));

      handleEducationModal();
      setUpdatedId(item.id);

    } catch (error) {
      console.log(error);
    }
  };

  const [isModalDelete, setIsModalDelete] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<{
    id: number | null;
    name: string;
  }>({
    id: null,
    name: "",
  });

  const handleDeleteModal = () => {
    setIsModalDelete(!isModalDelete);
    if(isModalDelete) {
      setDeleteItem((prevItem) => ({
        ...prevItem,
        id: null,
        name: "",
      }));
    }
  };

  const handleDeleteClick = async (id: number, name: string) => {
    setDeleteItem((prevItem) => ({
      ...prevItem,
      id,
      name,
    }));
    handleDeleteModal();
  };

  return (
    <div className="w-full bg-white h-full rounded-[8px] shadow-lg border border-indigo-800 py-[40px] px-2 md:px-[30px]">
      <div className="px-8 mt-8 w-full h-full flex flex-col gap-8">
        <div className="w-full h-full  xl:px-24 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <ComponentsHeader
              headerIcon={<FaNetworkWired className="h-6 w-6" />}
              title={"Education Attainment"}
              description={"List of Education Attainment"}
            />
            <button
              type="button"
              onClick={handleEducationModal}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Education
            </button>
          </div>
          <hr className="text-indigo-700" />
          <div className="w-full flex flex-col rounded-[8px] overflow-hidden p-5 xl:p-10 gap-8">
            {Array.isArray(education) ? (
              education.map((item, itemIndex) => (
                <Fragment key={item.id} >
                  <div className="flex flex-col h-fit">
                    <div className="flex h-full">
                      <div className="w-[35%] flex flex-col items-center pr-4">
                        <img
                          src={`http://localhost:3000/uploads/${item.schoolImage}`}
                          alt="School logo"
                          className="w-full h-full rounded-[8px]"
                        />
                        <h5 className="">
                          {item.monthGraduated} {item.yearGraduated}
                        </h5>
                        <h5 className="font-semibold">Graduated</h5>
                      </div>
                      <div className="w-[2%] relative flex items-center justify-center">
                        <div className="absolute top-0 bg-black h-3 w-3 rounded-full" />
                        <div className="w-[3px] bg-black h-full" />
                        <div className="absolute bottom-0 bg-black h-3 w-3 rounded-full" />
                      </div>
                      <div className="w-[63%] px-4 flex flex-col gap-3">
                        <div className="flex flex-col">
                          <label
                            htmlFor="title"
                            className="text-sm text-[#737373] font-semibold"
                          >
                            Course
                          </label>
                          <h5 className="text-3xl font-bold">{item.course}</h5>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="title"
                            className="text-sm text-[#737373] font-semibold"
                          >
                            Degree
                          </label>
                          <h5 className="text-md">{item.degree.degree}</h5>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="title"
                            className="text-sm text-[#737373] font-semibold"
                          >
                            School Name
                          </label>
                          <h5 className="text-md">{item.schoolName}</h5>
                        </div>
                        <div className="flex flex-col min-h-20">
                          <label
                            htmlFor="title"
                            className="text-sm text-[#737373] font-semibold"
                          >
                            Address
                          </label>
                          <h5 className="text-md">{item.schoolAddress}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mt-4">
                      <button
                        className="px-4 text-indigo-800 font-semibold text-md hover:bg-red-500 hover:text-white py-1 rounded-[8px] transition-all duration-300 delay-75"
                        onClick={() =>
                          handleDeleteClick(item.id, item.schoolName)
                        }
                      >
                        Remove
                      </button>
                      <button
                        className="px-4 text-indigo-800 font-semibold text-md hover:bg-indigo-500 hover:text-white py-1 rounded-[8px] transition-all duration-300 delay-75"
                        onClick={() => handleUpdate(item)}
                      >
                        Edit Education
                      </button>
                    </div>
                  </div>
                  <hr
                    className={`text-indigo-500 ${
                      education.length === itemIndex + 1
                        ? "invisible"
                        : "visible"
                    }`}
                  />
                </Fragment>
              ))
            ) : (
              <Fragment>
                <div className="flex flex-col h-fit gap-4 justify-center items-center">
                  No Education Attainment Data Saved
                  <button
                    type="button"
                    onClick={handleEducationModal}
                    className=" w-fit block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Education
                  </button>
                </div>
                <hr className={`text-indigo-500`} />
              </Fragment>
            )}
          </div>
        </div>
      </div>

      {/* <WorkExpModal
        workModal={workModal}
        handleWorkModal={handleWorkModal}
        data={data}
        setData={setData}
        handleFetch={handleFetch}
        updatedId={updatedId}
      /> */}

      <EducationModal
        educationModal={educationModal}
        handleEducationModal={handleEducationModal}
        data={data}
        setData={setData}
        handleFetch={handleFetch}
        updatedId={updatedId}
      />

       <DeleteToast
        isDelete={isModalDelete}
        handleDeleteModal={handleDeleteModal}
        route="/api/education"
        id={deleteItem.id ? deleteItem.id : 0}
        name={deleteItem.name}
        header="Deleting Education?"
        handleFetch={handleFetch}
      /> 
    </div>
  );
};

export default Education;

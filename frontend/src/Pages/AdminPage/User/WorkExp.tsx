import React, { Fragment, useEffect, useState } from "react";
import ComponentsHeader from "../../../Components/Other/Header";
import { FaNetworkWired } from "react-icons/fa";
import WorkExpModal from "./WorkExpModal";
import { WorkExperienceTypes, WorkExpDataFetch } from "../../../types/workExp";
import api from "../../../Components/API/api";
import DeleteToast from "../../../Components/Other/DeleteToast";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const WorkExp = () => {
  const [workModal, setWorkModal] = useState<boolean>(false);
  const [workExpData, setWorkExpData] = useState<WorkExpDataFetch[]>([]);
  const [updatedId, setUpdatedId] = useState<number | null>(null);

  const [data, setData] = useState<WorkExperienceTypes>({
    companyName: "",
    jobTitle: "",
    employmentType: "",
    startMonth: "",
    startYear: "",
    untilPresent: "Not Present",
    endMonth: "",
    endYear: "",
    jobDescription: "",
    monthlySalary: null,
  });

  const handleReset = () => {
    setData((prevData) => ({
      ...prevData,
      companyName: "",
      jobTitle: "",
      employmentType: "",
      startMonth: "",
      startYear: "",
      untilPresent: "Not Present",
      endMonth: "",
      endYear: "",
      jobDescription: "",
      monthlySalary: null,
    }));
    setUpdatedId(null)
  };

  const handleWorkModal = () => {
    setWorkModal(!workModal);
    if (workModal) {
      handleReset();
    }
  };

  const handleFetch = async () => {
    try {
      const response = await api.get("/api/workExperience");
      if (response.status === 200) {
        // if (Array.isArray(workExpData)) {
          setWorkExpData(response.data);
        // } else {
        //   setWorkExpData([]);
        // }
      }
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const parseDate = (dateStr: string) => {
    const [monthStr, yearStr] = dateStr.split(" ");
    const year = parseInt(yearStr);
    const month = new Date(Date.parse(monthStr + " 1, 2021")).getMonth(); // Any non-leap year will work

    return new Date(year, month);
  };

  // Function to calculate experience
  const calculateExperience = (startStr: string, endStr: string) => {
    const start = parseDate(startStr);
    const end = parseDate(endStr);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years !== 0 ? years : ""} ${
      years !== 0 ? `yr${years > 1 ? "s" : ""} and` : ""
    } ${months} month${months > 1 ? "s" : ""}`;
  };

  const handleUpdate = (item: WorkExpDataFetch) => {
    handleWorkModal();
    setUpdatedId(item.id);
    setData((prevData) => ({
      ...prevData,
      companyName: item.companyName,
      jobTitle: item.jobTitle,
      employmentType: item.employmentType,
      startMonth: item.startMonth,
      startYear: item.startYear,
      untilPresent:
        item.untilPresent === "Present" ? item.untilPresent : "Not Present",
      endMonth: item.endMonth,
      endYear: item.endYear,
      jobDescription: item.jobDescription,
      monthlySalary: item.monthlySalary,
    }));
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
              title={"Work Experience"}
              description={"List of work Experience"}
            />
            <button
              type="button"
              onClick={handleWorkModal}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Experience
            </button>
          </div>
          <hr className="text-indigo-700" />
          <div className="w-full flex flex-col rounded-[8px] overflow-hidden p-5 xl:p-10 gap-8">
            {Array.isArray(workExpData) ?
              workExpData.map((item, itemIndex) => {
                const todayDate = new Date();
                const startDate = `${item.startMonth} ${item.startYear}`;
                const endDate =
                  item.untilPresent === "Present"
                    ? `${todayDate.toLocaleString("default", {
                        month: "long",
                      })} ${todayDate.getFullYear()}`
                    : `${item.endMonth} ${item.endYear}`;
                return (
                  <Fragment key={item.id}>
                    <div className="flex flex-col h-fit">
                      <div className="flex h-full">
                        <div className="w-[35%] flex flex-col items-end pr-4">
                          <h5 className="">
                            {item.startMonth} {item.startYear} -{" "}
                            {`${
                              item.untilPresent === "Present"
                                ? item.untilPresent
                                : `${item.endMonth} ${item.endYear}`
                            }`}{" "}
                          </h5>
                          <h5 className="font-semibold">
                            {calculateExperience(startDate, endDate)}
                          </h5>
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
                              Title
                            </label>
                            <h5 className="text-xl font-bold">
                              {item.jobTitle}
                            </h5>
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="title"
                              className="text-sm text-[#737373] font-semibold"
                            >
                              Company Name
                            </label>
                            <h5 className="text-md">{item.companyName}</h5>
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="title"
                              className="text-sm text-[#737373] font-semibold"
                            >
                              Monthly Salary
                            </label>
                            <h5 className="text-md">
                              {formatter.format(item.monthlySalary)}
                            </h5>
                          </div>
                          <div className="flex flex-col min-h-20">
                            <label
                              htmlFor="title"
                              className="text-sm text-[#737373] font-semibold"
                            >
                              Job Description
                            </label>
                            <h5 className="text-md">{item.jobDescription}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex justify-between mt-4">
                        <button
                          className="px-4 text-indigo-800 font-semibold text-md hover:bg-red-500 hover:text-white py-1 rounded-[8px] transition-all duration-300 delay-75"
                          onClick={() =>
                            handleDeleteClick(item.id, item.companyName)
                          }
                        >
                          Remove
                        </button>
                        <button
                          className="px-4 text-indigo-800 font-semibold text-md hover:bg-indigo-500 hover:text-white py-1 rounded-[8px] transition-all duration-300 delay-75"
                          onClick={() => handleUpdate(item)}
                        >
                          Edit Experience
                        </button>
                      </div>
                    </div>
                    <hr
                      className={`text-indigo-500 ${
                        workExpData.length === itemIndex + 1
                          ? "invisible"
                          : "visible"
                      }`}
                    />
                  </Fragment>
                );
              })
              :
            <Fragment>
                <div className="flex flex-col h-fit gap-4 justify-center items-center">
                    No work Experience Data Saved
                    <button
                    type="button"
                    onClick={handleWorkModal}
                    className=" w-fit block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Add Experience
            </button>
                </div>
                <hr
                    className={`text-indigo-500`}
                />
            </Fragment>
            }

          </div>
        </div>
      </div>
      <WorkExpModal
        workModal={workModal}
        handleWorkModal={handleWorkModal}
        data={data}
        setData={setData}
        handleFetch={handleFetch}
        updatedId={updatedId}
      />

      <DeleteToast
        isDelete={isModalDelete}
        handleDeleteModal={handleDeleteModal}
        route="/api/workExperience"
        id={deleteItem.id ? deleteItem.id : 0}
        name={deleteItem.name}
        header="Deleting Skills?"
        handleFetch={handleFetch}
      />
    </div>
  );
};

export default WorkExp;

import React, { ChangeEvent, FormEventHandler } from "react";
import Modal from "../../../Components/Form/Modal";
import { Input } from "../../../Components/Form/Input";
import { Select } from "../../../Components/Form/Select";
import { Textarea } from "../../../Components/Form/Textarea";
import { WorkExperienceTypes } from "../../../types/workExp";
import api from "../../../Components/API/api";
import { useDispatch } from "react-redux";
import { dialogSliceActions } from "../../../store/dialog";

interface WorkExpModalProps {
  workModal: boolean;
  handleWorkModal: () => void;
  handleFetch: () => void;
  data: WorkExperienceTypes;
  setData: React.Dispatch<React.SetStateAction<WorkExperienceTypes>>;
  updatedId : number | null
}

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WorkExpModal: React.FC<WorkExpModalProps> = ({
  workModal,
  handleWorkModal,
  handleFetch,
  data,
  setData,
  updatedId 
}) => {
  const dispatch = useDispatch();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;
    const inputType = event.target.type;

    if (inputType === "checkbox") {
      setData((prevData) => ({
        ...prevData,
        [inputName]: event.target.checked ? "Present" : "Not Present",
      }));
      if (event.target.checked) {
        setData((prevData) => ({
          ...prevData,
          endMonth: "",
          endYear: "",
        }));
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [inputName]: inputValue,
      }));
    }
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectName = event.target.id;
    const selectValue = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [selectName]: selectValue,
    }));
  };

  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [inputName]: inputValue,
    }));
  };

  const handleSubmit: FormEventHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    try {
      let status
      if(updatedId){
        console.log(updatedId, "updatedId")
        const responseData = await api.patch(`/api/workExperience/${updatedId}`, data);
        status = responseData.status
      }else{
        console.log(updatedId, "updatedId")
        const responseData = await api.post("/api/workExperience", data);
        status = responseData.status
      }
      if (status === 201 || status === 200) {
        handleWorkModal();
        handleFetch();
        dispatch(
          dialogSliceActions.onDialog({
            type: "success",
            header: updatedId ? "Updated Successfully" : "Added Successfully",
            message: updatedId ? "Work Experience Successfully Updated" : "Work Experience Successfully Added",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        dialogSliceActions.onDialog({
          type: "error",
          header: "Adding Failure",
          message:
            "Failed in Adding Work Experience, Be sure to Provide all input Form",
        })
      );
    }
  };

  return (
    <Modal
      className="h-fit w-full md:w-[800px]"
      isOpen={workModal}
      onClick={handleWorkModal}
    >
      <form
        method=""
        onSubmit={handleSubmit}
        className="w-full h-full py-8 px-8 flex flex-col gap-4"
      >
        <h5 className="text-center w-full text-2xl font-work-sans">
          {updatedId ? 'Edit' : 'Add'} Work Experience
        </h5>
        <div className="flex md:gap-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="companyName">Company Name</label>
              <Input
                id="companyName"
                placeholder="ex. zongHa Software Solutions"
                name="Company Name"
                className="personalInformation"
                type="text"
                value={data.companyName}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="jobTitle">Job Title</label>
              <Input
                id="jobTitle"
                placeholder="Software Developer"
                name="Job Title"
                className="personalInformation"
                type="text"
                value={data.jobTitle}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="employmentType">Employment Type</label>
              <Select
                id="employmentType"
                className="personalInformation"
                name="Employment Type"
                value={data.employmentType}
                onChange={handleSelect}
              >
                <option value="">Select Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contractual">Contractual</option>
                <option value="OJT/Intern">OJT/Intern</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="level">Start Date</label>
              <div className="flex flex-row gap-1 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    id="startMonth"
                    className="personalInformation"
                    name="Month Started"
                    value={data.startMonth}
                    onChange={handleSelect}
                  >
                    <option value="">Select Month</option>
                    {Months.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    id="startYear"
                    className="personalInformation"
                    name="Year Started"
                    value={data.startYear}
                    onChange={handleSelect}
                  >
                    <option value="">Select Year</option>
                    {Array.from(
                      { length: new Date().getFullYear() - 1980 + 1 },
                      (_, index: number) => new Date().getFullYear() - index
                    ).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full items-center">
              <input
                type="checkbox"
                id="untilPresent"
                className="h-4 w-4 rounded border-[#02266F] text-indigo-600 focus:ring-indigo-600"
                name="Until Present"
                checked={data.untilPresent === "Present"}
                onChange={handleInput}
              />
              <label htmlFor="untilPresent">I Currently Work Here.</label>
            </div>
            <div
              className={`flex flex-col gap-1 w-full ${
                data.untilPresent === "Present" ? "hidden" : "flex"
              }`}
            >
              <label htmlFor="level">End Date</label>
              <div className="flex flex-row gap-1 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    id="endMonth"
                    className="personalInformation"
                    name="Month End"
                    value={data.endMonth}
                    onChange={handleSelect}
                  >
                    <option value="">Select Month</option>
                    {Months.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    id="endYear"
                    className="personalInformation"
                    name="Year End"
                    value={data.endYear}
                    onChange={handleSelect}
                  >
                    <option value="">Select Year</option>
                    {Array.from(
                      { length: new Date().getFullYear() - +data.startYear + 1 },
                      (_, index: number) => new Date().getFullYear() - index
                    ).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="jobDescription">Job Description</label>
              <Textarea
                id="jobDescription"
                placeholder="Job Description"
                name="Job Description"
                className="h-[304px]"
                value={data.jobDescription}
                onChange={handleTextArea}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="monthlySalary">Monthly Salary</label>
              <Input
                id="monthlySalary"
                placeholder="Monthly Salary"
                name="Monthly Salary"
                className="personalInformation"
                type="number"
                value={data.monthlySalary ? data.monthlySalary : ""}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-2 flex h-[40px] pr-4 gap-6 justify-end">
          <button
            type="button"
            className="h-[40px] w-fit px-10 flex justify-center items-center bg-black/40 bg-gray rounded-[8px]"
            onClick={handleWorkModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-[40px] w-fit px-10 flex justify-center items-center bg-indigo-600 rounded-[8px] text-white"
          >
            {updatedId ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WorkExpModal;

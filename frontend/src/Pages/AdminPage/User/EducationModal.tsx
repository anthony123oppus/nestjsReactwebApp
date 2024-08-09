import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import Modal from "../../../Components/Form/Modal";
import { Input } from "../../../Components/Form/Input";
import { Select } from "../../../Components/Form/Select";
import api from "../../../Components/API/api";
import { useDispatch } from "react-redux";
import { dialogSliceActions } from "../../../store/dialog";
import { degreeOptions, educationTypes } from "../../../types/education";
import { UploadImg } from "../../../Components/Form/UploadImg";
import { schoolLogo } from "../../../util/Image";
import ImageCropper from "../../../Components/Form/ImageCropper";

interface EducationModalProps {
  educationModal: boolean;
  handleEducationModal: () => void;
  handleFetch: () => void;
  data: educationTypes;
  setData: React.Dispatch<React.SetStateAction<educationTypes>>;
  updatedId: number | null;
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

const EducationModal: React.FC<EducationModalProps> = ({
  educationModal,
  handleEducationModal,
  handleFetch,
  data,
  setData,
  updatedId,
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

//   const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
//     const selectName = event.target.id;
//     const selectValue = event.target.value
//     const selectValueId = event.target.selectedOptions[0].getAttribute('data-value')

//     setData((prevData) => ({
//       ...prevData,
//       degreeName : selectValue,
//       [selectName]: selectValueId,
//     }));
//   };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectName = event.target.id;
    const selectValue = event.target.value

    setData((prevData) => ({
      ...prevData,
      [selectName]: selectValue,
    }));
  };

  const appendToFormData = (data: educationTypes): FormData => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof educationTypes];
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      }
    }

    return formData;
  };

  const handleSubmit: FormEventHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const formData = appendToFormData(data);
    try {
      let status
      if(updatedId){
        const responseData = await api.patch(`/api/education/${updatedId}`, formData, {headers: {
            'Content-Type': 'multipart/form-data',
          }});
        status = responseData.status
      }else{
        const responseData = await api.post(`/api/education`, formData, {headers: {
            'Content-Type': 'multipart/form-data',
          }});
        status = responseData.status
      }
      if (status === 201 || status === 200) {
        handleEducationModal();
        handleFetch();
        dispatch(
          dialogSliceActions.onDialog({
            type: "success",
            header: updatedId ? "Updated Successfully" : "Added Successfully",
            message: updatedId ? "Education Successfully Updated" : "Education Successfully Added",
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
            "Failed in Adding  Educational Attainment, Be sure to Provide all input Form and School Name and Degree not exist",
        })
      );
    }
  };

  const [isUpload, setIsUpload] = useState<boolean>(false);

  const handleUploadModal = () => {
    setIsUpload(!isUpload);
  };

  const [degree , setDegree] = useState<degreeOptions[]>()

  const handleFetchDegree = async() => {
    try {
        const responseDegree = await api.get<degreeOptions[]>('/api/education/degree')
        if(responseDegree.status === 200){
            setDegree(responseDegree.data)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    handleFetchDegree()
  }, [])

  return (
    <>
      <Modal
        className="h-fit w-full md:w-[870px]"
        isOpen={educationModal}
        onClick={handleEducationModal}
      >
        <form
          method=""
          onSubmit={handleSubmit}
          className="w-full h-full py-8 px-8 flex flex-col gap-4"
        >
          <h5 className="text-center w-full text-2xl font-work-sans">
            {updatedId ? "Edit" : "Add"} Education
          </h5>
          <div className="flex md:gap-4">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1">
                <label htmlFor="schoolName">School Name</label>
                <Input
                  id="schoolName"
                  placeholder="ex. Bohol Island State University"
                  name="School Name"
                  className="personalInformation"
                  type="text"
                  value={data.schoolName}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="course">Course</label>
                <Input
                  id="course"
                  placeholder="Bachelor of Science in Computer Science"
                  name="Course"
                  className="personalInformation"
                  type="text"
                  value={data.course}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="degree">Degree</label>
                <Select
                  id="degree"
                  className="personalInformation"
                  name="Degree"
                  value={data.degree}
                  onChange={handleSelect}
                >
                  <option value="">Select Degree</option>
                  {degree && degree.map(item => (
                    <option key={item.id} data-value={item.id} value={item.id}>{item.degree}</option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="level">Date Graduated</label>
                <div className="flex flex-row gap-1 md:gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <Select
                      id="monthGraduated"
                      className="personalInformation"
                      name="Month Started"
                      value={data.monthGraduated}
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
                      id="yearGraduated"
                      className="personalInformation"
                      name="Year Started"
                      value={data.yearGraduated}
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
              <div className="flex flex-col gap-1">
                <label htmlFor="schoolAddress">School Address</label>
                <Input
                  id="schoolAddress"
                  placeholder="Zamora Bilar, Bohol"
                  name="School Address"
                  className="personalInformation"
                  type="text"
                  value={data.schoolAddress}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 h-full w-full">
              <label htmlFor="jobDescription">School Profile</label>
              <UploadImg
                className="h-[357px] w-full hidden md:flex rounded-[8px] border-2 border-dashed border-indigo-500 cursor-pointer"
                onClick={handleUploadModal}
              >
                {data.schoolImage ? (
                  <div className="w-full h-full rounded-[8px] bg-white">
                    <img
                      src={URL.createObjectURL(data.schoolImage)}
                      alt=""
                      className="object-fill object-center w-full h-full rounded-[8px]"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-[8px] bg-white">
                    <img
                      src={schoolLogo}
                      alt=""
                      className="object-fill object-center w-full h-full rounded-[8px]"
                    />
                  </div>
                )}
              </UploadImg>
            </div>
          </div>
          <div className="w-full mt-2 flex h-[40px] pr-4 gap-6 justify-end">
            <button
              type="button"
              className="h-[40px] w-fit px-10 flex justify-center items-center bg-black/40 bg-gray rounded-[8px]"
              onClick={handleEducationModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[40px] w-fit px-10 flex justify-center items-center bg-indigo-600 rounded-[8px] text-white"
            >
              {updatedId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>

      <ImageCropper isUpload={isUpload} handleUploadModal={handleUploadModal} setData={setData} aspectRatio={1} minHeight={150} minWidth={150} dataName="schoolImage"/>
    </>
  );
};

export default EducationModal;

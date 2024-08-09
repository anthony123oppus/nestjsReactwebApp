import React, { ChangeEvent, FormEventHandler, useRef } from "react";
import Modal from "../../../Components/Form/Modal";
import { skillDataTypes } from "../../../types/skill";
import { UploadImg } from "../../../Components/Form/UploadImg";
import { reactImg } from "../../../util/Image";
import { Input } from "../../../Components/Form/Input";
import { Select } from "../../../Components/Form/Select";
import api from "../../../Components/API/api";
import { dialogSliceActions } from "../../../store/dialog";
import { useDispatch } from "react-redux";

interface skillModalProps {
  isSkillModal: boolean;
  updateId: number | null;
  handleSkillModal: () => void;
  resetData: () => void;
  handleFetch: () => void;
  data: skillDataTypes;
  setData: React.Dispatch<React.SetStateAction<skillDataTypes>>;
}

const SkillModal: React.FC<skillModalProps> = ({
  isSkillModal,
  updateId,
  handleSkillModal,
  resetData,
  handleFetch,
  data,
  setData,
}) => {
  const dispatch = useDispatch();

  const imageRef = useRef<HTMLInputElement>(null);
  const handleChooseImg = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.id;
    let inputValue;
    if (event.target.type === "file") {
      inputValue = event.target.files?.[0];
    } else {
      inputValue = event.target.value;
    }

    setData((prevData) => ({
      ...prevData,
      [inputName]: inputValue,
    }));
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [inputName]: inputValue,
    }));
  };

  const appendToFormData = (data: skillDataTypes): FormData => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof skillDataTypes];
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      }
    }

    return formData;
  };

  const handleSubmit: FormEventHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const formData = appendToFormData(data);
    try {
        let status 
        if(updateId){
            const response = await api.patch(`/api/skills/${updateId}`, formData, {headers: {
                'Content-Type': 'multipart/form-data',
              }
            }); 
            console.log(response)
            status = response.status
        }else{
            const response = await api.post("/api/skills", formData, {headers: {
                'Content-Type': 'multipart/form-data',
              }
            }); 
            console.log(response)
            status = response.status
        }
        if (status === 201 || status === 200) {
            resetData();
            handleSkillModal();
            handleFetch();
            dispatch(
              dialogSliceActions.onDialog({
                type: "success",
                header: updateId ? 'Updated Successfully' : 'Added Successfully',
                message: updateId ? 'Skill Successfully Updated' : 'Skill Successfully Added',
              })
            );
          }
    } catch (error) {
      dispatch(
        dialogSliceActions.onDialog({
          type: "error",
          header: "Adding Failure",
          message: "Failed in Adding Skill, Be sure to Provide all input Form",
        })
      );
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        className="h-[88vh] w-full md:w-[600px]"
        isOpen={isSkillModal}
        onClick={handleSkillModal}
      >
        <form
          method=""
          onSubmit={handleSubmit}
          className="w-full h-full py-8 px-8 flex flex-col gap-4"
        >
          <h5 className="text-center w-full text-2xl font-work-sans">
            {updateId ? "Edit" : "Add"} Experience
          </h5>
          <div className="flex flex-col md:gap-4">
            <div className="w-full h-full flex flex-col md:gap-3">
              <div className="h-full w-full md:flex flex-col gap-1">
                <label htmlFor="profile">3D Map Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/jpeg"
                  ref={imageRef}
                  className="hidden"
                  onChange={handleInput}
                />
                <UploadImg
                  className="h-[250px] w-full hidden md:flex rounded-[8px] border-2 border-dashed border-indigo-500 cursor-pointer"
                  onClick={handleChooseImg}
                >
                  <div className="w-full h-full rounded-[8px] bg-white">
                    <img
                      src={
                        data.image ? URL.createObjectURL(data.image) : reactImg
                      }
                      alt=""
                      className="object-fill object-center w-full h-full rounded-[8px]"
                    />
                  </div>
                  {/* {data.devImage ?
                        <div className="w-full h-full rounded-[8px] bg-white">
                          <img src={URL.createObjectURL(data.devImage)} alt="" className="object-fill object-center w-full h-full rounded-[8px]"/>
                        </div>
                            :
                        <div className="w-full h-full rounded-[8px] bg-white">
                          <img src={profile} alt="" className="object-fill object-center w-full h-full rounded-[8px]"/>
                        </div>
                      } */}
                </UploadImg>
              </div>
              <button
                type="button"
                onClick={handleChooseImg}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {!data.image ? "Upload" : "Change"} Photo
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Skill</label>
                <Input
                  id="name"
                  placeholder="ex. Reactjs"
                  name="Name"
                  className="personalInformation"
                  type="text"
                  value={data.name}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-row gap-1 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="level">Level</label>
                  <Select
                    id="level"
                    value={data.level}
                    className="personalInformation"
                    name="Level"
                    onChange={handleSelect}
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Average">Average</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </Select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="yrsExperience">Year of Experience</label>
                  <Input
                    id="yrsExperience"
                    placeholder="Yrs. of Experience"
                    className="personalInformation flex flex-col justify-between"
                    type="text"
                    value={data.yrsExperience ? data.yrsExperience : ""}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 flex h-[40px] pr-4 gap-6 justify-end">
            <button
              type="button"
              className="h-[40px] w-fit px-10 flex justify-center items-center bg-black/40 bg-gray rounded-[8px]"
              onClick={handleSkillModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[40px] w-fit px-10 flex justify-center items-center bg-indigo-600 rounded-[8px] text-white"
            >
              {updateId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SkillModal;

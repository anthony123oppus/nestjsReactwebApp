import React, { ChangeEvent, FormEventHandler, useState } from "react";
import Modal from "../../../Components/Form/Modal";
import { ImacFrame, IphoneFrame, macScreen, phoneScreen } from "../../../util/Image";
import { Input } from "../../../Components/Form/Input";
import api from "../../../Components/API/api";
import { dialogSliceActions } from "../../../store/dialog";
import { useDispatch } from "react-redux";
import { Textarea } from "../../../Components/Form/Textarea";
import { projectTypes } from "../../../types/project";
import ImageCropper from "../../../Components/Form/ImageCropper";

interface projectModalProps {
  isProjectModal: boolean;
  updateId: number | null;
  handleProjectModal: () => void;
  resetData: () => void;
  handleFetch: () => void;
  data: projectTypes;
  setData: React.Dispatch<React.SetStateAction<projectTypes>>;
}

const ProjectModal: React.FC<projectModalProps> = ({
  isProjectModal,
  updateId,
  handleProjectModal,
  resetData,
  handleFetch,
  data,
  setData,
}) => {
  const dispatch = useDispatch();

    const handleTextArea = (event : ChangeEvent<HTMLTextAreaElement>) => {
        const inputName = event.target.id
        const inputValue = event.target.value

        setData(prevData => ({
        ...prevData,
        [inputName] : inputValue
        }))
    }

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

  const appendToFormData = (data: projectTypes): FormData => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof projectTypes];
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
            const response = await api.patch(`/api/project/${updateId}`, formData, {headers: {
                'Content-Type': 'multipart/form-data',
              }
            }); 
            console.log(response)
            status = response.status
        }else{
            const response = await api.post("/api/project", formData, {headers: {
                'Content-Type': 'multipart/form-data',
              }
            }); 
            console.log(response)
            status = response.status
        }
        if (status === 201 || status === 200) {
            resetData();
            handleProjectModal();
            handleFetch();
            dispatch(
              dialogSliceActions.onDialog({
                type: "success",
                header: updateId ? 'Updated Successfully' : 'Added Successfully',
                message: updateId ? 'Project Successfully Updated' : 'Project Successfully Added',
              })
            );
          }
    } catch (error) {
        dispatch(
            dialogSliceActions.onDialog({
              type: "error",
              header: "Adding Failure",
              message: "Failed in Adding Project, Be sure to Provide all input Form",
            })
          );
          console.log(error);
    }
  };

  
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [typeUpload, setTypeUpload] = useState<"Phone" | "Desktop">('Phone')

  const handleUploadModal = () => {
    setIsUpload(!isUpload);
  };

  return (
    <>
      <Modal
        className="h-[94vh] w-full md:w-[750px]"
        isOpen={isProjectModal}
        onClick={handleProjectModal}
      >
        <form
          method=""
          onSubmit={handleSubmit}
          className="w-full h-full py-8 px-8 flex flex-col gap-4"
        >
          <h5 className="text-center w-full text-2xl font-work-sans">
            {updateId ? "Edit" : "Add"} Project
          </h5>
          <div className="flex flex-col md:gap-4 h-full">
            <div className="w-full h-[60%] flex gap-4 justify-center items-center ">
                <div className="flex items-center">
                    <h5 className="anthonyName font-work-sans pointer-events-none font-semibold text-indigo-700">PHONE</h5>
                    <div className="relative h-[280px] px-2 py-[6.2px] cursor-pointer" onClick={() => {handleUploadModal(); setTypeUpload('Phone') }}>
                        {data.phoneImage ? 
                            <img src={URL.createObjectURL(data.phoneImage)} alt=""  className="w-[150px] h-full rounded-[10px]"/>
                            :
                            <img src={phoneScreen} alt=""  className="w-[150px] h-full rounded-[10px]"/>
                        }
                        <img src={IphoneFrame} alt=""  className="h-full w-full z-10 absolute top-0 left-0"/>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="relative h-[280px] w-[350px] px-2 py-[6.2px] cursor-pointer" onClick={() => {handleUploadModal(); setTypeUpload('Desktop') }}>
                        {data.desktopImage ? 
                            <img src={URL.createObjectURL(data.desktopImage)} alt=""  className="w-full h-[72%] rounded-[10px]"/>
                            :
                            <img src={macScreen} alt=""  className="w-full h-[72%] rounded-[10px]"/>
                        }
                        <img src={ImacFrame} alt=""  className="h-full w-full z-10 absolute top-0 left-0"/>
                    </div>
                    <h5 className="anthonyName font-work-sans pointer-events-none font-semibold text-indigo-700">DESKTOP</h5>
                </div>
            </div> 
            <div className="h-full flex gap-4">
                    <div className="w-full h-full flex flex-col md:gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Project Name</label>
                            <Input
                            id="name"
                            placeholder="ex. Weather Monitoring System"
                            name="Name"
                            className="personalInformation"
                            type="text"
                            value={data.name}
                            onChange={handleInput}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="techStack">Tech Stack</label>
                            <Input
                            id="techStack"
                            placeholder="ex. Reactjs, Nodejs and Typescript"
                            name="Name"
                            className="personalInformation"
                            type="text"
                            value={data.techStack}
                            onChange={handleInput}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="link">Project Links</label>
                            <Input
                            id="link"
                            placeholder="ex. https://vercel.app"
                            name="Link"
                            className="flex flex-col justify-between"
                            type="text"
                            value={data.link}
                            onChange={handleInput}
                            />
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <div className="flex flex-col gap-1 h-full">
                            <label htmlFor="description">Project Description</label>
                            <Textarea
                                id="description"
                                placeholder="Short description..."
                                name="Developer Motto"
                                className="h-[210px]"
                                value={data.description}
                                onChange={handleTextArea}
                            />
                        </div>
                    </div>
            </div>
          </div>
          <div className="w-full mt-2 flex h-[40px] pr-4 gap-6 justify-end">
            <button
              type="button"
              className="h-[40px] w-fit px-10 flex justify-center items-center bg-black/40 bg-gray rounded-[8px]"
              onClick={handleProjectModal}
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


      <ImageCropper isUpload={isUpload} handleUploadModal={handleUploadModal} setData={setData} aspectRatio={typeUpload === 'Desktop' ? 1.41 : 0.552} minHeight={typeUpload === 'Desktop' ? 150 : 280} minWidth={typeUpload === 'Desktop' ? 250 : 120} dataName={typeUpload === 'Desktop' ? "desktopImage" : "phoneImage"}/>
    </>
  );
};

export default ProjectModal;

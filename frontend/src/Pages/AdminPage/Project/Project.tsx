// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Fragment, useEffect, useState } from "react";
import DefaultLayout from "../../../Components/Layout/DefaultLayout";
import ComponentsHeader from "../../../Components/Other/Header";
import { CgProductHunt } from "react-icons/cg";
import ModelView from "../../../Components/Model/ModelView";
import { bgModel, macScreen, phoneScreen } from "../../../util/Image";
import { BsThreeDots } from "react-icons/bs";
import ProjectModal from "./Modal";
import { projectFetchTypes, projectTypes } from "../../../types/project";
import api from "../../../Components/API/api";
import { AnimatePresence, motion } from "framer-motion";
import { menuPopup } from "../../../Components/Functions/transistion";
import DeleteToast from "../../../Components/Other/DeleteToast";


const Skill = () => {

  const [projectData, setProjectData] = useState<projectFetchTypes[]>([])
  const [projectDataSelect, setProjectDataSelect] = useState<projectFetchTypes | null>(null)
  const [updateId, setUpdateId] = useState<number | null>(null)

  const [data, setData] = useState<projectTypes>({
    name : '',
    techStack : '',
    description : '',
    link : '',
    phoneImage : null,
    desktopImage : null
  })

  const resetData = () => {
    setData(prevData => ({
      ...prevData,
      name : '',
      techStack : '',
      description : '',
      link : '',
      phoneImage : null,
      desktopImage : null
    }))
    setUpdateId(null)

  }

  const [isProjectModal, setIsProjectModal] = useState<boolean>(false)

  const handleProjectModal = () => {
    setIsProjectModal(!isProjectModal)
    if(isProjectModal){
      resetData()
    }
  }


  const handleFetch = async() => {
    try {
      const responseData = await api.get('/api/project')
      if(Array.isArray(responseData.data)){
        setProjectData(responseData.data)
        setProjectDataSelect(responseData.data[0])
      }else{
        setProjectData([])
        setProjectDataSelect(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

    //   for context menu start
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
    const toggleMenu = (event: React.MouseEvent<HTMLDivElement>, item: number, select: number) => {
        if (select === item) {
            setMenuVisible(false)
            setSelectedItem(0);
        } else {
            setMenuVisible(true);
            setPosition({ x: event.clientX, y: event.clientY });
            setSelectedItem(item);
        }
    };
  
    const handleCloseMenu = () => {
        setMenuVisible(false)
        setSelectedItem(0)
    }

  useEffect(() => {
    handleFetch();
    window.addEventListener("scroll", handleCloseMenu);
    return () => {
      window.removeEventListener("scroll", handleCloseMenu);
    };
  }, []);


  const handleContext = async( project : projectFetchTypes) => {
    try {
      const desktopimageUrl = `http://localhost:3000/uploads/${project.desktopImage}`;
      const desktopresponse = await fetch(desktopimageUrl);
      const desktopblob = await desktopresponse.blob();
      const desktopImage = new File([desktopblob], project.desktopImage, { type: desktopblob.type });

      const phoneimageUrl = `http://localhost:3000/uploads/${project.phoneImage}`;
      const phoneresponse = await fetch(phoneimageUrl);
      const phoneblob = await phoneresponse.blob();
      const phoneImage = new File([phoneblob], project.phoneImage, { type: phoneblob.type });

      setData(prevData => ({
        ...prevData,
        name : project.name,
        link : project.link,
        description : project.description,
        techStack : project.techStack,
        desktopImage,
        phoneImage
      }));
      
      setUpdateId(project.id) 
      handleCloseMenu()
      handleProjectModal()

    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [deleteItem ,setDeleteItem] = useState<{id : number | null, name : string}>({
    id : null,
    name : ''
  })

  const handleDeleteModal = () => {
    setIsModalDelete(!isModalDelete)
    if(isModalDelete){
      setDeleteItem(prevItem => ({
        ...prevItem, 
        id : null,
        name : ''
      }))
    }
  } 


  const handleDeleteClick = async(id : number, name : string) => {
    setDeleteItem(prevItem => ({
      ...prevItem,
      id,
      name
    }))
    handleCloseMenu() 
    handleDeleteModal()
  }


  return (
    <DefaultLayout>
      <div className="bg-white w-full h-full rounded-[8px] shadow-lg border border-indigo-800 py-[40px] px-2 md:px-[30px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <ComponentsHeader
              headerIcon={<CgProductHunt className="h-6 w-6" />}
              title={"CodeMaster Projects"}
              description={
                "A detailed collection of my professional projects and development milestones."
              }
            />
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleProjectModal}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-4 text-indigo-600" />
        <div className="w-full h-full mt-8 flex flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className=" h-[80vh] w-full flex flex-col md:flex-row justify-center items-center relative">
            {/* <div className="absolute top-2 left-2 text-indigo font-work-sans text-xl flex flex-col px-2 py-1 bg-indigo-500 text-white rounded-[8px]">Catalyst Website Design
                <h5 className="text-sm indent-10"></h5>
              </div> */}
            <img
              src={bgModel}
              alt=""
              className="w-full absolute bottom-0 left-0"
            />
            <div className="w-full md:w-1/4  h-full">
              <ModelView type="Iphone" image={`${projectDataSelect ? `http://localhost:3000/uploads/${projectDataSelect.phoneImage}` : phoneScreen}`}/>
            </div>
            <div className="w-full md:w-[60%] h-full">
              <ModelView type="Macbook" image={`${projectDataSelect ? `http://localhost:3000/uploads/${projectDataSelect.desktopImage}` : macScreen}`}/>
            </div>
          </div>
          <div className="bg-indigo-400 font-work-sans rounded-[8px] p-6 h-fit">
              <h5 className="text-xl text-center"><TitleModel projectName={projectDataSelect ? projectDataSelect.name : 'No data'}/></h5>
              <div className="flex ">
                  <h5 className="mr-2 font-semibold"><span className="text-xl font-coolFont">T</span>ech Stack:</h5><h5>{projectDataSelect ? projectDataSelect.techStack : 'No data'}</h5>
              </div>
              <div className="flex ">
                  <h5 className="mr-2 font-semibold whitespace-nowrap"><span className="text-xl font-coolFont">P</span>roject Description:</h5><h5>{projectDataSelect ? projectDataSelect.description : 'No data'}</h5>
              </div>
          </div>
        </div>
        <hr className=" mt-8 text-indigo-500" />
        <div className=" w-full h-full mt-8 flex flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-4xl font-semibold font-work-sans">Lists of all project</div>
          {projectData.length !== 0 ? 
            projectData.map((item, index) => (
              <div key={index} className={`shadow-projectWidget h-[50vh] w-full flex rounded-[8px] overflow-hidden group border border-indigo-500 cursor-pointer ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`} onClick={() => setProjectDataSelect(item)}>
                <div className="w-1/2 h-full relative overflow-hidden">
                  <div className={`flex ${index % 2 === 0 ? 'justify-start' : ' justify-end'} w-full`}>
                    <div className="z-[201] mt-4 mx-4 w-8 h-4 flex justify-center items-center" onClick={(e) => toggleMenu(e, item.id, selectedItem)}>
                      <BsThreeDots className="group-hover:text-indigo-600 text-2xl text-black cursor-pointer transiton-all duration-300 delay-75" />
                    </div>
                  </div>
                  {menuVisible && selectedItem === item.id && (
                    <div className='inset-0 fixed z-[200]' onClick={(e) => { toggleMenu(e, item.id, selectedItem); }}>
                        <AnimatePresence mode='wait'>
                            <motion.ul variants={menuPopup} initial="initial" animate="enter" exit="exit" className='absolute rouned-md overflow-hidden rounded-md shadow-md bg-white border-[1px] border-[#033AA9]' style={{ right: index % 2 !== 0 ? window.innerWidth - position.x - 20 : window.innerWidth - position.x - 55, top: position.y + 10 }} onClick={(e) => e.stopPropagation()}>
                                <li className='cursor-pointer text-[13px] font-inter leading-[28px] w-full px-4 text-textColor hover:bg-indigo-600 hover:text-white transiton-all duration-200 delay-75' onClick={() => handleContext(item)}>Update</li>
                                <li className='cursor-pointer text-[13px] font-inter leading-[28px] w-full px-4 text-textColor hover:bg-indigo-600 hover:text-white transiton-all duration-200 delay-75' onClick={() => handleDeleteClick(item.id, item.name)}>Delete</li>
                            </motion.ul>
                        </AnimatePresence>
                    </div>
                  )}
                  <img src={`http://localhost:3000/uploads/${item.desktopImage}`} alt="macscreen" className={`shadow-project border border-indigo-600 h-80 w-full rounded-[8px] absolute -bottom-2 ${index % 2 !== 0 ? '-right-5 group-hover:-rotate-2' : '-left-5 group-hover:rotate-2'}   transition-all duration-500 delay-75`}/>
                </div>
                <div className="w-1/2 h-full p-6 flex flex-col gap-4">
                      <h5 className="text-center text-4xl font-coolFont group-hover:text-indigo-500 transition-all duration-300 delay-75">{item.name}</h5>
                  <div className="flex flex-col">
                      <h5 className="mr-2 font-semibold"><span className="text-xl font-coolFont">T</span>ech Stack:</h5><h5 className="indent-10">{item.techStack}</h5>
                  </div>
                  <div className="flex flex-col">
                      <h5 className="mr-2 font-semibold whitespace-nowrap"><span className="text-xl font-coolFont">P</span>roject Description:</h5><h5 className="indent-10">{item.description}</h5>
                  </div>
                  <div>
                    <button type="button" className="border border-indigo-500 px-3 py-1 rounded-[8px] hover:shadow-buttonShadow transition-all duration-300 delay-75 font-work-sans hover:text-indigo-500">Demo Live</button>
                  </div>
                </div>
              </div>
            ))
            :
              <div className="flex flex-col h-32 gap-4 justify-center items-center shadow-projectWidget p-6 rounded-[8px]">
                No Project Data Saved
                <button
                  type="button"
                  onClick={handleProjectModal}
                  className=" w-fit block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Project
                </button>
              </div>
          }
        </div>
      </div>

      <ProjectModal isProjectModal={isProjectModal} updateId={updateId} handleProjectModal={handleProjectModal} resetData={resetData} handleFetch={handleFetch} data={data} setData={setData}/>
   
      <DeleteToast isDelete={isModalDelete} handleDeleteModal={handleDeleteModal} route="/api/project" id={deleteItem.id ? deleteItem.id : 0} name={deleteItem.name} header="Deleting Project?" handleFetch={handleFetch}/>   

    </DefaultLayout>
  );
};

export default Skill;


const TitleModel = ({projectName } : {projectName : string}) => {
  const splitProject = projectName.split(' ')
  return (
    <>
    {splitProject.map(item => (
      <Fragment key={item}>
        <span className="font-coolFont text-4xl font-semibold">{item.charAt(0).toUpperCase()}</span><span className="font-work-sans font-semibold">{item.slice(1)}</span>{` `}
      </Fragment>
    ))}
    </>
  )
}
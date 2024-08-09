import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../Components/Layout/DefaultLayout";
import { GiSkills } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { skillBg, expBg } from "../../../util/Image";
import ThreeSphere from "../../../Components/Other/ThreeSphere";
import { skillDataFetch, skillDataTypes, skillsDataPagination, metaTypes, linksTypes } from "../../../types/skill";
import api from "../../../Components/API/api";

import { AnimatePresence, motion } from "framer-motion";

import { menuPopup } from "../../../Components/Functions/transistion";
import SkillModal from "./Modal";
import DeleteToast from "../../../Components/Other/DeleteToast";
import ComponentsHeader from "../../../Components/Other/Header";

const Skill = () => {

  const [isSkillModal, setIsSkillModal] = useState<boolean>(false);
  const [skillData, setSkillData] = useState<skillDataFetch[]>([]);
  const [metaPage,  setMetaPage] = useState<metaTypes | null>(null)
  const [links, setLinks] = useState<linksTypes | null>(null)
  const [updateId, setUpdateId] = useState<number | null>(null)

  const [data, setData] = useState<skillDataTypes>({
    name : '',
    level : '',
    yrsExperience : '',
    image : null
  })

  const resetData = () => {
    setData(prevData => ({
      ...prevData,
      name : '',
      level : '',
      yrsExperience : '',
      image : null
    }))
    setUpdateId(null)
  }

  const handleSkillModal = () => {
    setIsSkillModal(!isSkillModal);
    if (isSkillModal) {
      resetData();
    }
  };

  
  const [tabButton, setTabButton] = useState<string[]>([])
  const [tabActive, setTabActive] = useState<string>('')

  const handleFetch = async(route: string) => {
    console.log(route, "routehahaha")
    try {
      const routeLink = route ? `/api${route}` : "/api/skills"
      const responseData = await api.get<skillsDataPagination>(routeLink)
      console.log(responseData.data,"responseData")
      if(responseData.data){
        if(Array.isArray(responseData.data.items)){
          setSkillData(responseData.data.items)
          setMetaPage(responseData.data.meta)
          setLinks(responseData.data.links)
          const levelArray = responseData.data.items.flatMap(item => item.level)
          const finayArray = Array.from(new Set(levelArray))
          setTabButton(finayArray)
          setTabActive(finayArray[0])
        }else{
          setSkillData([])
          setTabButton([])
          setTabActive('')
        }
      }
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch('')
  }, [])

  useEffect(() => {
    const sortedSkills = [...skillData].sort((a, b) => {
      if (a.level === tabActive && b.level !== tabActive) return -1;
      if (a.level !== tabActive && b.level === tabActive) return 1;
      return 0;
    });
    setSkillData(sortedSkills);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive]);



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
      window.addEventListener('scroll', () => {
          setMenuVisible(false)
          setSelectedItem(0)
      });
  }, []);

  const handleContext = async( skill : skillDataFetch) => {
    try {
      const imageUrl = `http://localhost:3000/uploads/${skill.image}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], skill.image, { type: blob.type });

      setData({
        name: skill.name,
        level: skill.level,
        yrsExperience: skill.yrsExperience.toString(),
        image: file
      });
      
      setUpdateId(skill.id) 
      handleCloseMenu()
      handleSkillModal()

    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  // const handleDelete = (id : number, name : string) => {
  //   dispatch(deleteSliceActions.onDelete({id : id, name : name, route : '/api/skills', header : 'Delete Skill?'}))
  // }

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
      <div className=" bg-white w-full h-full rounded-[8px] shadow-lg border border-indigo-800 py-[40px] px-2 md:px-[30px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <ComponentsHeader headerIcon={<GiSkills className="h-6 w-6"/>} title={'Programming Skills'} description={'Comprehensive list of proficient programming skills and expertise'}/>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSkillModal}
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-4 text-indigo-600" />
        <div className=" mt-8 w-full h-full flex flex-col gap-8">
          {/* button Tab */}
          <div className="w-full flex gap-2">
            {/* Beginner, Average, Advanced, Expert */}
            {tabButton && tabButton.map((item : string, itemIndex : number) => (
              <button
                key={itemIndex}
                onClick={() => setTabActive(item)}
                type="button"
                className={`${tabActive === item ? 'border-2 border-indigo-700 bg-emerald-500' : 'border-2 border-indigo-600 '} text-white block rounded-md bg-indigo-600 px-3 py-[6px] text-center text-sm font-semibold shadow-sm hover:bg-emerald-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* skill data */}
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {skillData.length !== 0 && skillData.map(item => (
               <div key={item.id} className="w-full md:w-[276px] bg-white h-80 rounded-[8px] border-indigo-900 border overflow-hidden">
               <div className="flex justify-between items-center bg-indigo-600 h-10 px-4">
                 <h5 className="text-white font-coolFont">Experience</h5>
                 <div className="z-[201] h-4 flex justify-center items-center" onClick={(e) => toggleMenu(e, item.id, selectedItem)}>
                  <BsThreeDots className="group-hover:text-black text-2xl text-white cursor-pointer transiton-all duration-300 delay-75" />
                 </div>
               </div>
               {menuVisible && selectedItem === item.id && (
                  <div className='inset-0 fixed z-[200]' onClick={(e) => { toggleMenu(e, item.id, selectedItem); }}>
                      <AnimatePresence mode='wait'>
                          <motion.ul variants={menuPopup} initial="initial" animate="enter" exit="exit" className='absolute rouned-md overflow-hidden rounded-md shadow-md bg-white border-[1px] border-[#033AA9]' style={{ right: window.innerWidth - position.x - 20, top: position.y + 10 }} onClick={(e) => e.stopPropagation()}>
                              <li className='cursor-pointer text-[13px] font-inter leading-[28px] w-full px-4 text-textColor hover:bg-indigo-600 hover:text-white transiton-all duration-200 delay-75' onClick={() => handleContext(item)}>Update</li>
                              <li className='cursor-pointer text-[13px] font-inter leading-[28px] w-full px-4 text-textColor hover:bg-indigo-600 hover:text-white transiton-all duration-200 delay-75' onClick={() => handleDeleteClick(item.id, item.name)}>Delete</li>
                          </motion.ul>
                      </AnimatePresence>
                  </div>
                )}
               <div className="relative flex flex-col gap-3 items-center py-2 mt-2">
                 <img
                   src={skillBg}
                   alt=""
                   className="absolute -top-2 w-full h-46 z-1"
                 />
                 <div className="h-28 w-28 rounded-full z-10 mt-[20px]">
                   <ThreeSphere image={`http://localhost:3000/uploads/${item.image}`}/>
                 </div>
                 <h4 className="text-xl text-black font-semibold leading-[5px] font-work-sans mt-8">
                   {item.name}
                 </h4>
                 <h5 className="text-sm text-indigo-700">{item.level}</h5>
                 <div className="h-6 w-36 font-coolFont relative text-white flex justify-center items-center">
                   <img
                     src={expBg}
                     alt=""
                     className="absolute -top-2 w-full z-1"
                   />
                   <span className="z-10">{item.yrsExperience} Years</span>
                 </div>
               </div>
             </div>
            ))}
            <div className="cursor-pointer w-full md:w-[276px] h-80 rounded-[8px] border-indigo-900 border border-dashed overflow-hidden flex flex-col justify-center items-center gap-2" onClick={handleSkillModal}>
              <GiSkills className="h-6 w-6" />
              <h5 className="font-semibold font-work-sans">+ Add Skill</h5>
            </div>
          </div>

          {/* pagination */}
          <div className="flex items-center justify-between border-t border-indigo-700 bg-white px-4 pt-8 sm:px-6">
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between gap-2 md:gap-0">
              <div >
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{metaPage ? metaPage.itemsPerPage : 0}</span> of{' '}
                  <span className="font-medium">{metaPage ? metaPage.totalItems : 0}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() =>  handleFetch(links ? links.previous : '')}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:bg-indigo-100"
                  >
                    <span className="sr-only">Previous</span>
                    <MdArrowLeft className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  {metaPage && Array.from({length : metaPage.totalPages}, (_, item) => (item + 1)).map( item =>
                      <button
                        key={item}
                        onClick={() =>  handleFetch(`/skills?page=${item}&limit=${metaPage ? metaPage.itemsPerPage : 7}`)}
                        aria-current="page"
                        className={`relative flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 md:hover:bg-indigo-100 focus:z-20 focus:outline-offset-0 ${metaPage && metaPage.currentPage === item ? 'bg-indigo-600 text-white' : 'bg-white text-black'}`}
                      >
                        {item}
                      </button>
                  )}
                  <button
                    onClick={() =>  handleFetch(links ? links.next : '')}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:bg-indigo-100"
                  >
                    <span className="sr-only">Next</span>
                    <MdArrowRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

      <SkillModal isSkillModal={isSkillModal} updateId={updateId} handleSkillModal={handleSkillModal} resetData={resetData} handleFetch={() => handleFetch('')} data={data} setData={setData}/>

      <DeleteToast isDelete={isModalDelete} handleDeleteModal={handleDeleteModal} route="/api/skills" id={deleteItem.id ? deleteItem.id : 0} name={deleteItem.name} header="Deleting Skills?" handleFetch={() => handleFetch('')}/>

    </DefaultLayout>
  );
};

export default Skill;

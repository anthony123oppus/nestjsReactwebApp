// import React from 'react'
import DefaultLayout from "../../../Components/Layout/DefaultLayout";
import CardDashboard from "../../../Components/Other/CardDashboard";

import { GiSkills } from "react-icons/gi";
import { CgProductHunt } from "react-icons/cg";
import PieGraph from "../../../Components/Chart/PieGraphSkill";
import ChatCard from "../../../Components/Other/ChatCard";

import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useState } from "react";
import api from "../../../Components/API/api";

gsap.registerPlugin(ScrollTrigger)    

interface pieData {
  series : string
  dataSet : {
    x : string
    y : number
  }[]
}

interface cardData {
  project: number
  skill: number
  message: number
}

const Dashboard = () => {

  useGSAP(() => {

    const timeline = gsap.timeline()

    timeline.from('#cardDash', {
      duration : .5,
      opacity : 0,
      ease : 'power1.inOut',
      borderRadius : '0%',
      stagger:{
          amount : 1,
          // from : 'center',
      }
    })

    timeline.from('#pieGraph', {
      position : 'relative',
      duration : .5,
      right : '5%',
      opacity : 0,
      ease : 'power1.inOut',
      borderRadius : '0%',
    })


    timeline.from('#chatCard', {
      position : 'relative',
      duration : .5,
      left : '5%',
      opacity : 0,
      ease : 'power1.inOut',
      borderRadius : '0%',
    })

  }, [])

  const [cardData, setCardData] = useState<cardData | null>(null)
  const [pieData, setPieData] = useState<pieData>({
    series : 'Level',
    dataSet : []
  })

  const getDashboardData = async() => {
    try {
      const response = await api.get('/api/dashboard')
      const {pieData, ...cardData} = response.data

      setCardData(cardData)
      setPieData(data => ({
        ...data,
        dataSet : pieData
      }))
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])


  return (
    <DefaultLayout>

      <div className="flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDashboard to="/project" title="Total Project" total={cardData ? cardData.project.toString() : '0'} rate="0.43%" levelUp>
            <CgProductHunt className="fill-primary dark:fill-white text-2xl text-indigo-500" />
          </CardDashboard>
          <CardDashboard to="/skill" title="Total Languages " total={cardData ? cardData.skill.toString() : "0"} rate="4.35%" levelUp>
            <GiSkills className="fill-primary dark:fill-white text-2xl text-indigo-500" />
          </CardDashboard>
          <CardDashboard to="/project" title="Total Messages" total="6" rate="2.59%" levelUp>
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z"
                fill=""
              />
              <path
                d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z"
                fill=""
              />
              <path
                d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z"
                fill=""
              />
              <path
                d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z"
                fill=""
              />
            </svg>
          </CardDashboard>
          <CardDashboard to="/skill" title="Total Users" total="3.456" rate="0.95%" levelDown>
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                fill=""
              />
              <path
                d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                fill=""
              />
              <path
                d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                fill=""
              />
            </svg>
          </CardDashboard>
        </div>

        <div className="flex lg:flex-row flex-col w-full gap-4 md:gap-6 2xl:gap-7.5 ">
          <div id="pieGraph" className="w-full xl:w-[60%] py-10 h-[600px] rounded-sm border border-stroke bg-white pt-6 pb-5 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <PieGraph pieData={pieData}/>
          </div>
          <ChatCard />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;

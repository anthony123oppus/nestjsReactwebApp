import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import DefaultLayout from "../../../Components/Layout/DefaultLayout";
import ComponentsHeader from "../../../Components/Other/Header";

const About = () => {
  return (
    <DefaultLayout>
      <div className="w-full h-full rounded-[8px] shadow-lg border border-gray py-[40px] px-2 md:px-[30px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <ComponentsHeader
              headerIcon={<FaInfoCircle className="h-6 w-6" />}
              title={"About Developer"}
              description={"Developer Information"}
            />
          </div>
        </div>
        <hr className="mt-4 text-indigo-600" />
        <div className="px-8 mt-8 w-full h-full flex flex-col gap-8">
          <div className="w-full h-full px-40 flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <h5 className="font-coolFont text-2xl">Work Experience</h5>
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Experience
              </button>
            </div>
            <div className="w-full flex flex-col h-40 bg-black/50">

            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;

import React from 'react'

const Info = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto mt-30">
        <div className=" min-h-[75px] w-full py-[10px] px-[30px] md:px-[50px] flex flex-col items-center justify-center">
          <div className=" mb-[50px] mx-auto flex flex-col-reverse md:flex-row-reverse items-center justify-center max-w-[1320px] w-full gap-10 md:gap-0">
            <div className="relative pattern-dots-md w-full md:w-1/2">
              <img
                className="w-full transform -translate-x-6 translate-y-6 h-auto rounded-[10px] drop-shadow-2xl"
                src="/calc.png"
                alt="Main"
              />
              <div
                className="bg-[#141452] p-5 rounded-[10px] flex flex-col items-start max-w-[430px] 
                  static md:absolute md:bottom-[-55px] md:left-[-12%] 
                  mt-0 md:mt-0 z-10"
              >
                <p className="text-white text-base  leading-[22px] md:leading-[26px] mb-2.5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                  purus lectus viverra in semper nec pretium mus.
                </p>
                <img
                  className="w-[55%] md:w-auto mt-3"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg"
                  alt="Stars"
                />
              </div>
            </div>

            <div className="w-full md:w-[40%] flex flex-col items-start justify-start md:mr-10 py-0 pr-[15px] pl-0 mt-[100px] md:mt-0">
              <p className="text-[#4d4d7a] underline underline-offset-8 text-3xl font-extrabold leading-[30px] mb-6 p-0">
                About Calculator
              </p>
              <p className="text-[#939191] italic text-xl md:text-xl font-bold leading-7 md:leading-8 mb-2 p-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="text-[#777171] text-base  font-normal leading-[22px] md:leading-[26px] mb-[50px] p-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fermentum pulvinar ullamcorper suspendisse ac eget. Pellentesque
                tempus leo in ullamcorper quis vestibulum ligula elementum ut.
              </p>
              <a
                href="#"
                className="inline-block text-[#666666] rounded-lg text-base leading-7 border-2 border-[#666666] py-2 px-10 bg-white transition-colors duration-300 hover:bg-[#b062ff] hover:text-white hover:border-transparent cursor-pointer"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto mt-30  text-gray-200 bg-[#0a0a39] rounded-2xl font-sans">
        <div className="max-w-6xl mx-auto px-5 py-24 ">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl text-center mb-2 font-extrabold text-white">
              Calculator Features
            </h1>
            <p className="w-2/3 m-auto text-center font-semibold text-[#8c8989]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
              nesciunt quae fugit laudantium magnam est? Tenetur excepturi harum
              molestias sunt. Ratione, laborum!
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-[#3d3dfe] inline-flex"></div>
            </div>
          </div>
          {/* Cards Grid */}
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col">
              <div className="pattern-dots-md text-gray-100">
                {" "}
                {/* Changed color class for visibility */}
                <div className=" bg-[#141452] transition-all rounded p-4 transform translate-x-6 -translate-y-6 hover:bg-[#141470] hover:translate-x-4 hover:-translate-y-4 duration-300">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0 p-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl title-font font-medium mb-3">
                      Highly Accurate
                    </h2>
                    <p className=" text-sm text-[#b3b3d7] font-semibold">
                      Donner du goût et de la couleur aux applications, je le
                      fais afin de rendre vos sites attrayants. Depuis tout
                      petit, j'étais déjà familier avec le dessin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col">
              <div className="pattern-dots-md text-gray-100">
                {" "}
                {/* Changed color class for visibility */}
                <div className=" bg-[#141452] transition-all rounded p-4 transform translate-x-6 -translate-y-6 hover:bg-[#141470] hover:translate-x-4 hover:-translate-y-4 duration-300">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0 p-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl title-font font-medium mb-3">
                      Highly Accurate
                    </h2>
                    <p className=" text-sm text-[#b3b3d7] font-semibold">
                      Donner du goût et de la couleur aux applications, je le
                      fais afin de rendre vos sites attrayants. Depuis tout
                      petit, j'étais déjà familier avec le dessin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col">
              <div className="pattern-dots-md text-gray-100">
                {" "}
                {/* Changed color class for visibility */}
                <div className=" bg-[#141452] transition-all rounded p-4 transform translate-x-6 -translate-y-6 hover:bg-[#141470] hover:translate-x-4 hover:-translate-y-4 duration-300">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0 p-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl title-font font-medium mb-3">
                      Highly Accurate
                    </h2>
                    <p className=" text-sm text-[#b3b3d7] font-semibold">
                      Donner du goût et de la couleur aux applications, je le
                      fais afin de rendre vos sites attrayants. Depuis tout
                      petit, j'étais déjà familier avec le dessin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Info
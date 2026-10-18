import React from 'react';
import { FaReact } from "react-icons/fa";
import { SiDjango, SiOpenproject } from "react-icons/si";
import { Link } from 'react-router-dom';

const About = ()=>{
    return (<section class="overflow-hidden bg-white py-8 sm:py-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class='text-center flex flex-col justify-center mb-4'>
        <p class='font-bold text-2xl'>This Vehicle Routing Problem Solver has been developed as a part of the project Optimising distribution transport in the food ecosystem at the University of Vaasa, Finland.</p>
        <div class='flex justify-center items-center gap-x-3 font-bold'>
          <a href="https://github.com/r1azmh/vrp-backend" class='flex justify-between items-center gap-x-2'><span class='text-indigo-600'>Backend-Code</span></a>
          | <a href="https://github.com/r1azmh/vrp-frontend" class='flex justify-between items-center gap-x-2'><span class='text-indigo-600'>Fontend-Code</span></a>
          | <a href="https://www.uwasa.fi/en/elintarvike-ekosysteemi" class='flex justify-between items-center gap-x-2'><span class='text-indigo-600'>Project-Link</span></a>
        </div>
        </div>
      <div>
        <div class='font-bold text-lg'>Project Actors at the University of Vaasa:</div>
        <div class="relative pl-9">
                <p class="font-normal text-lg">Research Group: Networked value systems NeVS<br/>
                School of Technology and Innovations</p><br/>
              </div>

        <div class='font-bold text-lg'>Personnel:</div>
        <div class="relative pl-9">
                <p class="font-normal text-lg">Petri Helo, Principal Investigator, Professor, Industrial Management, University of Vaasa.<br/>
                Riaz Mahmud, Project Researcher, Industrial Systems Analytics, University of Vaasa.</p><br/>
              </div>
  
        <div class='font-bold text-lg'>Funding Partners:</div>
        <div class="relative pl-9">
                <p class="font-normal text-lg">EU - European regional development fund ERDF (2021-2027)<br/>
                Etelä-Pohjanmaan liitto, Seinäjoki</p><br/>
              </div>

        <div class='font-bold text-lg'>License:</div>
        <div class="relative pl-9">
                <p class="font-normal text-lg">Apache License<br/>
                Version 2.0, January 2004<br/>
                Copyright © 2024 Petri Helo and Riaz Mahmud.<br/>
                <br/>
                Licensed under the Apache License, Version 2.0; you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.</p><br/>
              </div>
      </div>
    </div>
  </section>
  )
}

export default About;
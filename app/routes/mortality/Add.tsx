import { ArrowLeftIcon, ArrowLeftToLineIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const Add = () => {
  const [FarmsStatus, setFarmsStatus] = useState<"free" | "occupied">("free");

  return (
    <>

      <div className="mb-8">
        <h2 className="text-[#141118] dark:text-white text-3xl font-black tracking-tight mb-2">Add Mortality Record</h2>
        <p className="text-[#756189] dark:text-[#a393b5] text-base">Track and record livestock losses to maintain accurate inventory records and health monitoring.</p>
      </div>
      <div className="bg-white dark:bg-[#21172a] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e0dbe6] dark:border-[#3b2d4a] overflow-hidden">
        <div className="flex flex-col @xl:flex-row items-center p-6 border-b border-[#f2f0f4] dark:border-[#3b2d4a] bg-gradient-to-r from-primary/5 to-transparent">
          <div className="w-full @xl:w-48 h-32 bg-center bg-no-repeat bg-cover rounded-lg mb-4 @xl:mb-0 @xl:mr-6 shrink-0 shadow-sm" data-alt="Interior of a modern poultry farm facility"
            style={{ backgroundImage: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCeP9oT6Vfv1S0FM-nQ8Gv-O-NJNukVf3jLO0543xCLhq5fWYvkf79pYJI29nV_0vXLIU27zN7XSuUX2eLPaPYG1lWOObE-CX1KYIUyb1mBlcQOEycfLHG9l8oBhCBXmP-b-A0RUjMyZsvdyBs9dVy6W3UqRRhIra1mA-a4m5mp_-xpzOGuQ-SxrE8uFzh7iOysu9jcLiBd8K_6L2PNmUy43NUX5u1j1VY0qZJ0qScZIZtgXogBpphvp1-X1FpHxVx0Q2-0Yvxhvsdx);" }}>

          </div>
          <div>
            <h3 className="text-[#141118] dark:text-white text-lg font-bold">Record Details</h3>
            <p className="text-[#756189] dark:text-[#a393b5] text-sm mt-1">Please fill out all required fields to document the incident. This data helps in identifying potential disease outbreaks early.</p>
          </div>
        </div>
        <div className="p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[#141118] dark:text-white text-sm font-semibold flex items-center gap-1">
                Farm Location
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full rounded-lg border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#2a1f38] text-[#141118] dark:text-white focus:border-primary focus:ring-primary/20 h-12 px-4 appearance-none transition-all">
                  <option value="">Search and select farm location...</option>
                  <option value="green-valley">Green Valley East - Barn 04</option>
                  <option value="highlands">Highlands Poultry - Barn 01</option>
                  <option value="riverbank">Riverbank Farm - Broiler Section</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#756189]">search</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#141118] dark:text-white text-sm font-semibold flex items-center gap-1">
                Date of Incident
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input className="w-full rounded-lg border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#2a1f38] text-[#141118] dark:text-white focus:border-primary focus:ring-primary/20 h-12 px-4 transition-all" type="date" value="2023-10-27" />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#756189]">calendar_today</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#141118] dark:text-white text-sm font-semibold flex items-center gap-1">
                Number of Birds
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input className="w-full rounded-lg border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#2a1f38] text-[#141118] dark:text-white focus:border-primary focus:ring-primary/20 h-12 px-4 transition-all" placeholder="0" type="number" />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#756189]">numbers</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[#141118] dark:text-white text-sm font-semibold flex items-center gap-1">
                Primary Reason
                <span className="text-red-500">*</span>
              </label>
              <select className="w-full rounded-lg border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#2a1f38] text-[#141118] dark:text-white focus:border-primary focus:ring-primary/20 h-12 px-4 transition-all">
                <option value="">Select category...</option>
                <option value="heat">Heat Stress</option>
                <option value="disease">Suspected Disease</option>
                <option value="predators">Predators</option>
                <option value="culling">Intentional Culling (Health reasons)</option>
                <option value="other">Other / Unknown</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[#141118] dark:text-white text-sm font-semibold">Detailed Notes</label>
              <textarea className="w-full rounded-lg border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#2a1f38] text-[#141118] dark:text-white focus:border-primary focus:ring-primary/20 p-4 transition-all resize-none" placeholder="Describe symptoms, environmental factors, or additional context..." rows="4"></textarea>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 md:col-span-2 border-t border-[#f2f0f4] dark:border-[#3b2d4a] mt-2">
              <button className="w-full sm:w-auto px-6 h-12 rounded-lg text-[#756189] dark:text-[#a393b5] font-bold hover:bg-[#f2f0f4] dark:hover:bg-[#3b2d4a] transition-all" type="button">
                Cancel
              </button>
              <button className="w-full sm:w-auto px-8 h-12 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2" type="submit">
                <span className="material-symbols-outlined text-xl">save</span>
                Submit Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;

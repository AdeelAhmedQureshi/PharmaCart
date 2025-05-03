// import Sidebar from "../../Admin_Dashboard/components/Sidebar";
// import DashboardCards from "../../Admin_Dashboard/components/DashboardCards";
// import { useState } from "react";

// export default function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar Section */}
//       <aside
//         onMouseEnter={() => setIsSidebarOpen(true)}
//         onMouseLeave={() => setIsSidebarOpen(false)}
//         className={`transition-all duration-300 ${
//           isSidebarOpen ? "w-64" : "w-16"
//         }`}
//       >
//         <Sidebar isOpen={isSidebarOpen} />
//       </aside>

//       {/* Main Dashboard Section */}
//       <main
//         className={`flex-1 p-6 transition-all duration-300 bg-white rounded-lg shadow-lg m-4 ${
//           isSidebarOpen ? "ml-64" : "ml-16"
//         }`}
//       >
//         {/* Welcome Header */}
//         <section className="mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 text-center">
//             Welcome Admin
//           </h1>
//           {/* Optional Divider */}
//           <div className="my-8 h-1 bg-gradient-to-r from-blue-800 via-cyan-400 to-blue-800 rounded-full shadow-xl shadow-blue-500/30"></div>
//         </section>

//         {/* Dashboard Cards Section */}
//         <section>
//           <DashboardCards />
//         </section>
//       </main>
//     </div>
//   );
// }



// lovable
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import Products from "../components/Products";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar Section */}
      <aside
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        className={`transition-all duration-300 bg-gray-900 text-white shadow-lg ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </aside>

      {/* Main Dashboard Section */}
      <main
        className={`flex-1 p-8 transition-all duration-300 bg-white rounded-xl shadow-lg m-6 border border-gray-200 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Welcome Header */}
        <section className="mb-16">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
            Welcome, Admin
          </h1>
          {/* Optional Divider */}
          <div className="my-8 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full shadow-md"></div>
        </section>

        {/* Dashboard Cards Section */}
        <section className="mb-16">
          <DashboardCards />
        </section>

        {/* Nested Routes */}
        {/* <section className="mb-16">
          <Outlet />
        </section> */}

        {/* Products Section */}
        <section className="mt-16">
          <Products />
        </section>
      </main>
    </div>
  );
}
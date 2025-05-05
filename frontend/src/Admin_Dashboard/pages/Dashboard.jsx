// Dashboard.jsx
// This is the main dashboard component that serves as the layout for the admin dashboard. It includes a sidebar for navigation and a main content area that displays various sections such as welcome message, dashboard cards, and products list. The sidebar can be toggled open or closed based on mouse events.

// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import DashboardCards from "../components/DashboardCards";
// import Products from "../components/ProductsTable";
// // import { Outlet } from "react-router-dom";

// export default function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       {/* Sidebar Section */}
//       <aside
//         onMouseEnter={() => setIsSidebarOpen(true)}
//         onMouseLeave={() => setIsSidebarOpen(false)}
//         className={`transition-all duration-300 bg-gray-900 text-white shadow-lg ${
//           isSidebarOpen ? "w-64" : "w-16"
//         }`}
//       >
//         <Sidebar isOpen={isSidebarOpen} />
//       </aside>

//       {/* Main Dashboard Section */}
//       <main
//         className={`flex-1 p-8 transition-all duration-300 bg-white rounded-xl shadow-lg m-6 border border-gray-200 ${
//           isSidebarOpen ? "ml-64" : "ml-16"
//         }`}
//       >
//         {/* Welcome Header */}
//         <section className="mb-16">
//           <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
//             Welcome, Admin
//           </h1>
//           {/* Optional Divider */}
//           <div className="my-8 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full shadow-md"></div>
//         </section>

//         {/* Dashboard Cards Section */}
//         <section className="mb-16">
//           <DashboardCards />
//         </section>

//         {/* Nested Routes */}
//         {/* <section className="mb-16">
//           <Outlet />
//         </section> */}

//         {/* Products Section */}
//         <section className="mt-16">
//           <Products />
//         </section>
//       </main>
//     </div>
//   );
// }





import DashboardCards from "../components/DashboardCards";
import Products from "../components/ProductsTable";

export default function Dashboard() {
  return (
    <main className="p-6 w-full bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <section className="mb-16">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Welcome, Admin
        </h1>
        <div className="my-8 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full shadow-md"></div>
      </section>

      {/* Dashboard Cards Section */}
      <section className="mb-16">
        <DashboardCards />
      </section>

      {/* Products Overview Section */}
      <section className="mt-16">
        <Products />
      </section>
    </main>
  );
}

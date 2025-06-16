// this is dashboard page for admin
// it contains welcome header, dashboard cards, and products overview
// it is the main page of the admin dashboard


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

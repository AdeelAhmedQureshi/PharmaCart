import { FaBox, FaUsers, FaDollarSign, FaShoppingCart } from "react-icons/fa";

const cardData = [
  {
    title: "Total Products",
    count: 120,
    icon: <FaBox className="text-white text-3xl" />,
    bgColor: "bg-blue-600",
  },
  {
    title: "Total Customers",
    count: 340,
    icon: <FaUsers className="text-white text-3xl" />,
    bgColor: "bg-green-600",
  },
  {
    title: "Total Orders",
    count: 96,
    icon: <FaShoppingCart className="text-white text-3xl" />,
    bgColor: "bg-orange-500",
  },
  {
    title: "Total Earnings",
    count: "$45,000",
    icon: <FaDollarSign className="text-white text-3xl" />,
    bgColor: "bg-yellow-500",
  },
];

const DashboardCards = () => {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center bg-white hover:bg-[rgb(74,200,235)] border border-gray-200 rounded-2xl shadow-md hover:shadow-lg p-6 transition-transform duration-300 hover:scale-105 h-48"
            aria-label={card.title}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${card.bgColor}`}
            >
              {card.icon}
            </div>
            <div className="mt-4">
              <h3 className="text-gray-700 text-base font-semibold">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;

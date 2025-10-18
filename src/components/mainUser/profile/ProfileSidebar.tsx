interface SidebarProps {
  activeTab: "bookings" | "edit" | "feedback";
  setActiveTab: (tab: "bookings" | "edit" | "feedback") => void;
}

const ProfileSidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-white shadow rounded-lg p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-400"></div>
        <p className="mt-2 text-sm">sinhngo2003@gmail.com</p>
      </div>

      <ul className="space-y-2">
        <li
          className={`cursor-pointer px-4 py-2 rounded-md ${
            activeTab === "bookings" ? "bg-green-500 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          All Bookings
        </li>
        <li
          className={`cursor-pointer px-4 py-2 rounded-md ${
            activeTab === "edit" ? "bg-green-500 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Profile
        </li>
        <li
          className={`cursor-pointer px-4 py-2 rounded-md ${
            activeTab === "feedback" ? "bg-green-500 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;

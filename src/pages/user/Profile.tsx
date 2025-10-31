import { useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import ProfileSidebar from "../../components/mainUser/profile/ProfileSidebar";
import BookingsTabs from "../../components/mainUser/profile/BookingsTabs";
import EditProfileForm from "../../components/mainUser/profile/EditProfileForm";
import FeedbackForm from "../../components/mainUser/profile/FeedbackForm";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"bookings" | "edit" | "feedback">("bookings");

  return (
    <>
      <UserLayout>
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1">
            {activeTab === "bookings" && <BookingsTabs />}
            {activeTab === "edit" && <EditProfileForm />}
            {activeTab === "feedback" && <FeedbackForm />}
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default Profile;

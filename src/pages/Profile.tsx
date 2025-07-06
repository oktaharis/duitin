
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { AccountSettings } from "@/components/Profile/AccountSettings";
import { UsageStatistics } from "@/components/Profile/UsageStatistics";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profil & Pengaturan</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProfileInfo />
          <AccountSettings />
        </div>
        <UsageStatistics />
      </div>
    </div>
  );
};

export default Profile;

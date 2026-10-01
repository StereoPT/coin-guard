import { PageHeader } from "@/components/PageHeader";
import { UserSettings } from "@/components/settings/UserSettings";

const SettingsPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader description="Edit Coin-Guard Settings" title="Settings" />
      <div className="h-full py-6">
        <UserSettings />
      </div>
    </div>
  );
};

export default SettingsPage;

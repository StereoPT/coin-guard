import { PageHeader } from "@/components/PageHeader";

const SettingsPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader description="Edit Coin-Guard Settings" title="Settings" />
      </div>
      <div className="h-full py-6">Settings Here</div>
    </div>
  );
};

export default SettingsPage;

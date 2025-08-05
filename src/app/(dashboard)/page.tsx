import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { PageHeader } from '@/components/PageHeader';

const HomePage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader
        title="Welcome, Guido"
        description="This is your finance report"
      />
      <div className="h-full py-6">
        <UserDashboard />
      </div>
    </div>
  );
};

export default HomePage;

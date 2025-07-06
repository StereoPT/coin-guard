import { PageHeader } from '@/components/PageHeader';
import { StatCards } from '@/components/StatCards';

const HomePage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader title="Dashboard" description="Account overview" />
      <div className="h-full py-6">
        <StatCards />
      </div>
    </div>
  );
};

export default HomePage;

import { PageHeader } from '@/components/PageHeader';

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader title="Dashboard" description="Account overview" />
    </div>
  );
};

export default HomePage;

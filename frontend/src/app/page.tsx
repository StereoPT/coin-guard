import TransactionsTable from '@/components/transactions/TransactionsTable';

const Home = () => {
  return (
    <div className="grid h-screen justify-center items-center">
      <main className="min-w-[1140px]">
        <TransactionsTable />
      </main>
    </div>
  );
};

export default Home;

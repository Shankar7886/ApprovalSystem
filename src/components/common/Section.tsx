const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 w-full">
      {children}
    </div>
  );
};

export default Section;

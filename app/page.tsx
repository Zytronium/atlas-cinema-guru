export default async function Page() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-center h-full">
        Hello Cinema Guru
      </div>
      <div className="pb-2 flex flex-col gap-2">
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="text-sm text-offwhite">
            This is dummy content line {i + 1}. Scroll down to test scroll overflow
            behavior.
          </p>
        ))}
      </div>
    </div>
  );
}

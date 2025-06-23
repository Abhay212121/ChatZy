export function BottomSection() {
  return (
    <div className="bg-gradient-to-r to-sky-900  via-purple-800 from-purple-800 h-20 flex items-center px-12 gap-20 rounded-b-xl">
      <input
        type="text"
        placeholder="Enter your message"
        className="bg-white w-full font-body px-4 py-[0.7%] rounded-sm shadow cursor-pointer hover:shadow-md  focus:cursor-default focus:outline-0 h-10"
      />
      <button className="font-head1  h-10 w-20 rounded-sm cursor-pointer p-2 text-black bg-indigo-300">
        Send
      </button>
    </div>
  );
}

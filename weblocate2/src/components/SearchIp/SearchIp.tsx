interface SearchIpProps {
  onSearch: (ip: string) => void;
  onChange: (value: string) => void;
  value?: string;
  invalidIp?: boolean;
}

const SearchIp = ({ ...props }: SearchIpProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-white pl-2 pb-1"> Ip address:</p>
      <div className="flex flex-row">
        <input
          type="text"
          className={`bg-white text-black w-2/3  ${
            props.invalidIp
              ? "border-red-600 rounded border-3"
              : "border-gray-700 rounded border-2"
          } p-1`}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && props.onSearch(props.value ?? "")
          }
          placeholder="IP Search..."
        />
        <button
          className={
            "bg-white border-2 rounded border-gray-700 ml-2 w-1/3 p-1 hover:cursor-pointer"
          }
          onClick={() => props.onSearch(props.value ?? "")}
        >
          Search
        </button>
      </div>
      {props.invalidIp && (
        <p className="text-red-300 ml-2 mt-1">* Invalid Ip</p>
      )}
    </div>
  );
};

export default SearchIp;

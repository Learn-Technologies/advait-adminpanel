import React, { useRef } from "react";
type IProps = {
  options: Array<any>;
  type: string;
  className?: string;
  getValue?: Function;
};
export default function VAutocomplete(props: IProps) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = React.useState<any>();
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);

  function handleInputChange(e: any) {
    setInputValue(e.target.value);
    props?.getValue && props?.getValue(e.target.value);
    setShowSuggestions(true);
  }

  function handleSuggestionClick(opt: any) {
    setInputValue(opt);
    props?.getValue && props?.getValue(opt);
    setShowSuggestions(false);
  }
  function handleBlur() {
    return setTimeout(() => {
      return setShowSuggestions(false);
    }, 100);
  }
  return (
    <div className={`relative`}>
      <input
        type={props.type}
        className={`border p-2 rounded-md border-secondary focus:border-secondary ${props.className}`}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => handleBlur()}
        ref={inputRef}
      />
      {showSuggestions && (
        <ul className={`absolute z-50 bg-white shadow-md ${props.className}`}>
          {props.options.map((opt: any, index: number) => (
            <React.Fragment key={index}>
              <li
                className="cursor-pointer hover:bg-gray-100 p-2"
                onClick={() => handleSuggestionClick(opt)}
              >
                {opt}
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

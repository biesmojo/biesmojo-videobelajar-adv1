function InputClass({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-[#3a3451]/12 w-full p-3 rounded"
      required
    />
  );
}
export default InputClass;

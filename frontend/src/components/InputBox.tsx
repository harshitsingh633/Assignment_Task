export function InputBox({label,placeholder,onChange,type,onClick,value,onKeyDown} : any){
    return  <div>
      {label && (
        <div>
          {label && (
            <div className="text-sm font-medium text-left py-2">{label}</div>
          )}
        </div>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-400"
      />
    </div>
}
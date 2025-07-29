import { useState } from "react";
import { Switch } from "../shadcn-ui/switch";

interface ToggleProps {
  id?: string;
  onChange?: (e: boolean) => void;
  checked?: boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
}
const Toggle = (props: ToggleProps) => {
  const {
    id = "",
    onChange = () => {},
    checked = false,
    label = " ",
    name = "",
    disabled = false,
    className = "",
  } = props;
  const [randomID] = useState(Math.random().toString(36).substr(2, 9));
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch
        id={id ? id : name + randomID}
        onCheckedChange={onChange}
        checked={checked}
        name={name}
        className="pointer"
        disabled={disabled}
      />
      <label htmlFor={id ? id : name + randomID}>{label}</label>
    </div>
  );
};

export default Toggle;

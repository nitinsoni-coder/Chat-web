import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import CommonErrorText from "./CommonErrorText";
import { ReactNode } from "react";

interface IProps {
  label?: string;
  labelClass?: string;
  type: string;
  mainClassName?: string;
  className?: string;
  placeholder?: string;
  name: string;
  control: Control;
  error?: FieldErrors<FieldValues> ;
  disabled?: boolean;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  bottomLabel?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
  required?: boolean;
  children?: ReactNode;
  errorClassName?: string;
}

const CommonInput: React.FC<IProps> = (props) => {
  const {
    label,
    labelClass,
    type,
    mainClassName = "",
    className = "",
    placeholder,
    name,
    control,
    error,
    disabled = false,
    readOnly = false,
    minLength,
    maxLength,
    bottomLabel,
    defaultValue,
    min,
    max,
    required,
    children,
    errorClassName,
  } = props;

  return (
    <div className={`${mainClassName} loginInputBox `}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
          {required ? <sup className="star">*</sup> : null}
        </label>
      )}

      <Controller
        render={({ field }) => (
          <input
            {...field}
            type={type}
            disabled={disabled}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            id={name}
            min={min}
            max={max}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
      />

      {children}
      {bottomLabel && <span className="label-bottom">{bottomLabel}</span>}

      {/* Common Error message component  */}
      <CommonErrorText
        errors={error}
        errorClassName={errorClassName}
      />
    </div>
  );
};

export default CommonInput;

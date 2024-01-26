import { MouseEvent, ReactNode } from "react";

interface buttonProps {
  className?: string;
  children?: ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  title?: string;
  id?: string;
}

const CommonButton: React.FC<buttonProps> = ({
  className,
  children,
  type = "button",
  disabled,
  onClick,
  loading,
  title,
  id,
}) => {
  return (
    <button
      className={`${className} ${loading || disabled ? "disabled-btn" : ""}`}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      id={id}
    >
      {children}
    </button>
  );
};

export default CommonButton;

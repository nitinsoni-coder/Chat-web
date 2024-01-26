import { DeepMap, FieldError, FieldValues } from "react-hook-form";

type props = {
  errors?: DeepMap<FieldValues, FieldError>;
  errorClassName?: string;
};

const CommonErrorText: React.FC<props> = ({ errors, errorClassName }) => {
  return (
    <div className={`error ${errorClassName ?? ""}`}>
      {errors ? (
        <>
          <span>
            <i className="bi bi-exclamation-circle-fill"></i>
          </span>
          <span>{errors?.message}</span>
        </>
      ) : null}
    </div>
  );
};

export default CommonErrorText;

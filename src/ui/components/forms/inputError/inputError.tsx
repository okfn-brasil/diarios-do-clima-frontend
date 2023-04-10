import './InputError.scss';

interface PropsInputError {
  children?: JSX.Element | string | boolean;
  classes?: string;
}

const InputError = ({ children, classes }: PropsInputError) => {
  return (
    <div className={`input-error-warn ${classes}`}>
      { children }
    </div>
  );
};

export default InputError;
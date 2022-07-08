import './InputError.scss';

interface PropsInputError {
  children?: JSX.Element | string | boolean;
  classess?: string;
}

const InputError = ({ children, classess }: PropsInputError) => {
  return (
    <div className={`input-error-warn ${classess}`}>
      { children }
    </div>
  );
}

export default InputError;
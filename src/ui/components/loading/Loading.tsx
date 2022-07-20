import './Loading.scss';

interface PropsLoading {
  isLoading: boolean;
  isRelative?: boolean;
}

const Loading = ({isLoading, isRelative}: PropsLoading) => {
  return (
    <>
      {isLoading ?
        <div className={`loading-area shadow-modal ${isRelative ? 'relative-loading' : ''}`}>
          <div className='loading-box'>
            <div className='lds'><div></div><div></div><div></div></div>
          </div>
        </div> 
        : <></> 
      }
    </>
  );
};

export default Loading;
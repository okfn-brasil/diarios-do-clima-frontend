import './Loading.scss';

interface PropsLoading {
  isLoading: boolean;
  isRelative?: boolean;
  height?: string;
}

const Loading = ({isLoading, isRelative, height}: PropsLoading) => {
  return (
    <>
      {isLoading ?
        <div style={{height: height}} className={`loading-area shadow-modal ${isRelative ? 'relative-loading' : ''}`}>
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
import './Loading.scss';

interface PropsLoading {
  isLoading: boolean;
}

const Loading = ({isLoading}: PropsLoading) => {
  return (
    <>
      {isLoading ?
        <div className='loading-area shadow-modal'>
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
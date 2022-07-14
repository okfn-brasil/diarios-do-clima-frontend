import './ProFlag.scss';

interface ProFlagProps {
  spaceBottom?: number;
  margin?: number;
  show: boolean;
}

const ProFlag = ({spaceBottom, show, margin = 8}: ProFlagProps) => {
  return (
    <>
      {show ? <div className='pro-flag' style={{marginLeft: margin, transform: `translateY(-${spaceBottom}px)`}}>Pro</div> : <></>}
    </>
  );
}

export default ProFlag;
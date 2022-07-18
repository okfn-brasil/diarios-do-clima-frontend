import downloadIcon from '@app/assets/images/icons/download.svg';
import { ReportModel } from '@app/models/reports.model';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';

import './ReportItem.scss';

interface ReportProps {
  report: ReportModel;
}

const ReportItem = ({report}: ReportProps) => {
  return (
    <div className='report-item'>
      <h3 className='h3-class-sx-margin'>{report.title}</h3>
      <p className='paragraph-class'>{report.description}</p>
      <a target='_blank' href={report.file}>
        <ButtonGreen fullWidth>
          <div>
            <img src={downloadIcon} alt='download'/>
            Baixar relatório
          </div>
        </ButtonGreen>
      </a>
    </div>
  );
};

export default ReportItem;
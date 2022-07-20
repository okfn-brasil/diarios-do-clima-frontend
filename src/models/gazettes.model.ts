import { removeSpecialChars } from '@app/ui/utils/functions.utils';
import { urls } from '@app/ui/utils/urls';
import { AxiosResponse } from 'axios';

export interface GazetteResponse extends AxiosResponse{
  gazettes: GazetteModel[];
  total_gazettes: number;

}

export interface GazetteModel {
  date: string;
  edition: string;
  file_raw_txt: string;
  is_extra_edition: boolean;
  state_code: string;
  subthemes: string[];
  territory_id: string;
  territory_name: string;
  text: string;
  theme: string;
  url: string;
}

export const parseGazettes = (gazettes: GazetteModel[]) => {
  return gazettes.map(item => {
    const replaceCnpj = item.text.split('<entity_cnpj>');
    let newText = '';
    replaceCnpj.forEach(textFragment => { 
      const cnpjIndex = textFragment.indexOf('</entity_cnpj>');
      if (cnpjIndex > 0) {
        const cnpj = textFragment.slice(0, cnpjIndex).trim();
        newText += `<a href='${urls.cnpjs.urlWithoutParam}${removeSpecialChars(cnpj)}'>${textFragment}`;
      } else {
        newText += textFragment;
      }
    });
    const date = new Date(item.date);
    return {
      ...item,
      date: `${formatMonth(date.getDate())}/${formatMonth(date.getMonth() + 1)}/${date.getFullYear()}`,
      text: newText.replace(/entity_cnpj/g, 'a').replace(/entity_ambiental/g, 'b')
    }
  });
}

const formatMonth = (number: number) => {
  return number < 10 ? `0${number}` : number;
}
import { CalendarPickerView } from "@mui/x-date-pickers";

export const datePickerTranslation: DateTranslate = {
  previousMonth: 'Mês seguinte',
  nextMonth: 'Próximo mês',
  openPreviousView: 'Abrir última visualização',
  openNextView: 'Abrir próxima visualização',
  calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) => view === 'year' ? 
    'A visualização de anos está aberta, mude para a visualização do calendário' : 
    'A visualização do calendário está aberta, mude para a visualização de anos',
  start: 'Inicio',
  end: 'Fim',
  cancelButtonLabel: 'Cancelar',
  clearButtonLabel: 'Limpar',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Hoje',
  openDatePickerDialogue: (rawValue: string, utils: translateUtils) => rawValue && utils.isValid(utils.date(rawValue)) ? 
  `Escolha a data, a data selecionada é: ${utils.format(utils.date(rawValue)!, 'fullDate')}` : 'Escolha a data',
  dateTableLabel: 'Selecione uma data',
}

interface translateUtils {
  isValid: (e: Date) => boolean;
  date: (e: string) => Date;
  format: (e: Date, a: string) => string;
}

interface DateTranslate {
  previousMonth: string;
  nextMonth: string;
  openPreviousView: string;
  openNextView: string;
  calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) => string;
  start: string;
  end: string;
  cancelButtonLabel: string;
  clearButtonLabel: string;
  okButtonLabel: string;
  todayButtonLabel: string;
  openDatePickerDialogue: (rawValue: string, utils: translateUtils) => string;
  dateTableLabel: string;
}
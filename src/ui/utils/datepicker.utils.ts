import { CalendarPickerView } from "@mui/x-date-pickers";

export const datePickerTranslation: any = {
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
  openDatePickerDialogue: (rawValue: any, utils: any) => rawValue && utils.isValid(utils.date(rawValue)) ? 
  `Escolha a data, a data selecionada é: ${utils.format(utils.date(rawValue)!, 'fullDate')}` : 'Escolha a data',
  dateTableLabel: 'Selecione uma data',
}
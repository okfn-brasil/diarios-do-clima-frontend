import { CalendarPickerView } from "@mui/x-date-pickers";

export  const datePickerTranslation: any = {
  previousMonth: 'Mês seguinte',
  nextMonth: 'Próximo mês',
  openPreviousView: 'Letzte Ansicht öffnen',
  openNextView: 'Nächste Ansicht öffnen',
  calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) => view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view',
  start: 'Beginn',
  end: 'Ende',
  cancelButtonLabel: 'Abbrechen',
  clearButtonLabel: 'Löschen',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Heute',
  openDatePickerDialogue: (rawValue: any, utils: any) => rawValue && utils.isValid(utils.date(rawValue)) ? `Choose date, selected date is ${utils.format(utils.date(rawValue)!, 'fullDate')}` : 'Choose date',
  openTimePickerDialogue: (rawValue: any, utils: any) => rawValue && utils.isValid(utils.date(rawValue)) ? `Choose time, selected time is ${utils.format(utils.date(rawValue)!, 'fullTime')}` : 'Choose time',
  timeTableLabel: 'pick time',
  dateTableLabel: 'pick date',
}
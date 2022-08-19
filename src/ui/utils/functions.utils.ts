export const removeSpecialChars = (value: string) => {
  return value.replace(/[&\/\\#,+()$~%!.„'":*‚^_¤?<>|@ª{«»§}©®™]/g, '').replace('-', '');
}

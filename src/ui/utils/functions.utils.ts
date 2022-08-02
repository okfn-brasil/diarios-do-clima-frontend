export const removeSpecialChars = (value: string) => {
  return value.replace(/[&\/\\#,+()$~%!.„'":*‚^_¤?<>|@ª{«»§}©®™]/g, '').replace('-', '');
}

export const testEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}
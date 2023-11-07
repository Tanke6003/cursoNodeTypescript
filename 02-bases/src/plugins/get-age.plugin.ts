export const getAge = (birthdate:string):number => new Date().getFullYear() - new Date(birthdate).getFullYear();
  // return getAgePlugin(birthdate);
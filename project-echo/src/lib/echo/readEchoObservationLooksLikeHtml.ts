export const readEchoObservationLooksLikeHtml = (value: string): boolean =>
  /<[a-z][\s0-9="'/.:[\]#-]*/i.test(value.trim());

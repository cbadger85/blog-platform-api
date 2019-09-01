import { Options, text } from 'figlet';

export const asyncFiglet = (
  txt: string,
  options?: Options | undefined
): Promise<string> => {
  return new Promise((resolve, reject): void => {
    text(txt, options, function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};

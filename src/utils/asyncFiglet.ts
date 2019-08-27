import { text, Options } from 'figlet';

export const asyncFiglet = (txt: string, options?: Options | undefined) => {
  return new Promise((resolve, reject) => {
    text(txt, options, function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};

import { createContext } from 'react';

export const Context = createContext(null);


/*получается мы создали коробку Context в отдельном файле(context.js), 
саму коробку заполнили экземплярами глобальных стейтами через Context.Provider value=, и экспортировали эту уже заполненную коробку Context в другие файлы*/
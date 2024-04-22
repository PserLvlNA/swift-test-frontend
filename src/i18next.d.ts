import { ReactElement } from 'react';

declare module 'i18next' {
  interface CustomTypeOptions {
  }
}

declare module 'react-i18next' {
  interface I18nStatic {
    useTranslation: (
      ns?: string | string[]
    ) => { t: TFunction; i18n: I18n; ready: boolean };
  }

  interface TFunction {
    (key: string, options?: TFunctionOptions): ReactElement<any> | string;
  }
}

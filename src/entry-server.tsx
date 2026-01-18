import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';

export function render(url: string) {
  return renderToString(
    <I18nextProvider i18n={i18n}>
      <App ssrPath={url} />
    </I18nextProvider>
  );
}

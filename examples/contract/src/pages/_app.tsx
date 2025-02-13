import type { AppProps } from 'next/app';
import '../styles/globals.less';
import '../styles/common.less';
import '../styles/antd.less';
import Header from 'components/Header';
import dynamic from 'next/dynamic';
import PageHead from 'components/PageHead';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../redux/store';
import Footer from '../components/Footer';
import initAxios from '../utils/axios';
const Provider = dynamic(import('hooks/Providers/ProviderBasic'), { ssr: false });
import { AElfReactProvider } from '@aelf-react/core';
initAxios();
export default function APP({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageHead title={'Contract Demo'} />
      <ReduxProvider store={store}>
        <Provider>
          <Header />
          <div className="page-component">
            <div className="bg-body">
              <AElfReactProvider
                appName="example"
                nodes={{
                  AELF: { rpcUrl: 'https://aelf-test-node.aelf.io', chainId: 'AELF' },
                }}>
                <Component {...pageProps} />
              </AElfReactProvider>
            </div>
          </div>
        </Provider>
      </ReduxProvider>
      <Footer />
    </>
  );
}

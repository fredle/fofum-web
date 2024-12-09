import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import customDataProvider from './customDataProvider';
import { createBrowserHistory } from 'history';
import { BlockchainList, BlockchainEdit, BlockchainCreate, BlockchainShow } from './views/blockchain';
import { OpportunityShow, OpportunityCreate, OpportunityEdit, OpportunityList } from './views/opportunity';
import { ExternalApiShow, ExternalApiCreate, ExternalApiEdit, ExternalApiList } from './views/externalapi';
import { ProtocolShow, ProtocolCreate, ProtocolEdit, ProtocolList } from './views/protocol';

const history = createBrowserHistory({
  v7_startTransition: true,
  v7_skipActionErrorRevalidation: true,
  v7_relativeSplatPath: true
});

const App = () => (
  <HistoryRouter history={history}>
    <Admin dataProvider={customDataProvider}>
      <Resource name="blockchain" list={BlockchainList} edit={BlockchainEdit} create={BlockchainCreate} show={BlockchainShow} />
      <Resource name="opportunity" list={OpportunityList} edit={OpportunityEdit} create={OpportunityCreate} show={OpportunityShow} />
      <Resource name="externalapi" list={ExternalApiList} edit={ExternalApiEdit} create={ExternalApiCreate} show={ExternalApiShow} />
      <Resource name="protocol" list={ProtocolList} edit={ProtocolEdit} create={ProtocolCreate} show={ProtocolShow} />
    </Admin>
  </HistoryRouter>
);

export default App;
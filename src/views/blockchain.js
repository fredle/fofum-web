import React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, Filter, TextInput, 
    Create, EditButton, SimpleShowLayout, Show } from 'react-admin';

export const BlockchainList = props => (
    <List {...props} filters={<BlockchainFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="symbol" />
            <TextField source="rpc_url" />
            <EditButton />
        </Datagrid>
    </List>
);

const BlockchainFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by name" source="name" alwaysOn />
        <TextInput label="Search by symbol" source="symbol" />
    </Filter>
);


export const BlockchainShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="symbol" />
            <TextField source="rpc_url" />
        </SimpleShowLayout>
    </Show>
);
export const BlockchainEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="symbol" />
      <TextInput source="rpc_url" />
    </SimpleForm>
  </Edit>
);

export const BlockchainCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="symbol" />
      <TextInput source="rpc_url" />
    </SimpleForm>
  </Create>
); 
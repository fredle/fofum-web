import React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, EditButton, SimpleShowLayout, Show } from 'react-admin';

export const ProtocolList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="website" />
      <TextField source="blockchain" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProtocolShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="website" />
            <TextField source="blockchain" />
        </SimpleShowLayout>
    </Show>
);

export const ProtocolEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="website" />
      <TextInput source="blockchain" />
    </SimpleForm>
  </Edit>
);

export const ProtocolCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="website" />
      <TextInput source="blockchain" />
    </SimpleForm>
  </Create>
);
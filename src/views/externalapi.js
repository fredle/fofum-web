import React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, EditButton, SimpleShowLayout, Show } from 'react-admin';

export const ExternalApiList = props => (
  <List {...props} filters={<ExternalApiFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="base_url" />
      <TextField source="api_key" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);

const ExternalApiFilter = (props) => (
  <SimpleForm {...props}>
    <TextInput label="Search by name" source="name" alwaysOn />
    <TextInput label="Search by base URL" source="base_url" />
  </SimpleForm>
);

export const ExternalApiShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="base_url" />
      <TextField source="api_key" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
);

export const ExternalApiEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="base_url" />
      <TextInput source="api_key" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

export const ExternalApiCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="base_url" />
      <TextInput source="api_key" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
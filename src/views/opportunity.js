import React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, 
    Filter, Create, EditButton, SimpleShowLayout, Show } from 'react-admin';


const OpportunityFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by name" source="name__icontains" alwaysOn />
        <TextInput label="Search by type" source="opportunity_type" />
        <TextInput label="Risk Score Greater Than" source="risk_score__gte" />
        <TextInput label="Risk Score Less Than" source="risk_score__lte" />
        <TextInput label="Risk Score Between" source="risk_score__between" />
    </Filter>
);


export const OpportunityShow = (props) => (
    <Show {...props} >
        <SimpleShowLayout>
            <TextField source="protocol" />
            <TextField source="name" />
            <TextField source="opportunity_type" />
            <TextField source="apy" />
            <TextField source="risk_score" />
            <TextField source="liquidity" />
            <TextField source="token" />
        </SimpleShowLayout>
    </Show>
);

export const OpportunityList = (props) => (
    <List {...props} filters={<OpportunityFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="protocol" />
            <TextField source="name" />
            <TextField source="opportunity_type" />
            <TextField source="apy" />
            <TextField source="risk_score" />
            <TextField source="liquidity" />
            <TextField source="token" />
            <EditButton />
        </Datagrid>
    </List>
);

export const OpportunityEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="protocol" />
            <TextInput source="name" />
            <TextInput source="opportunity_type" />
            <TextInput source="apy" />
            <TextInput source="risk_score" />
            <TextInput source="liquidity" />
            <TextInput source="token" />
        </SimpleForm>
    </Edit>
);

export const OpportunityCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="protocol" />
            <TextInput source="name" />
            <TextInput source="opportunity_type" />
            <TextInput source="apy" />
            <TextInput source="risk_score" />
            <TextInput source="liquidity" />
            <TextInput source="token" />
        </SimpleForm>
    </Create>
);
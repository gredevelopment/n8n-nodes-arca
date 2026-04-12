import { INodeProperties } from 'n8n-workflow';

export const labelsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['label'],
			},
		},
		options: [
			{
				name: 'Create Label',
				value: 'createLabel',
				action: 'Create a new workspace label',
				description: 'Create a new workspace label',
			},
			{
				name: 'Delete Label',
				value: 'deleteLabel',
				action: 'Delete a label',
				description: 'Delete a label',
			},
			{
				name: 'List Labels',
				value: 'listLabels',
				action: 'Return all labels in a workspace',
				description: 'Return all labels in a workspace',
			},
			{
				name: 'Update Label',
				value: 'updateLabel',
				action: 'Update an existing label',
				description: 'Update an existing label',
			},
		],
		default: 'listLabels',
	},
];

export const labelsFields: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['listLabels', 'createLabel'],
			},
		},
		description: 'Workspace ID for label actions',
	},
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['updateLabel', 'deleteLabel'],
			},
		},
		description: 'ID of the label to modify or delete',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['createLabel', 'updateLabel'],
			},
		},
		description: 'Label name',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['createLabel', 'updateLabel'],
			},
		},
		description: 'Label color',
	},
];

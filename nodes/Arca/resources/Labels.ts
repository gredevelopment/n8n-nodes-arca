import { INodeProperties } from 'n8n-workflow';
import { colorOptions } from './colors';

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
				action: 'Create a label',
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
				action: 'List labels in a workspace',
				description: 'List all labels in a workspace',
			},
			{
				name: 'Update Label',
				value: 'updateLabel',
				action: 'Update an existing label',
				description: 'Update an existing label by ID',
			},
		],
		default: 'listLabels',
	},
];

export const labelsFields: INodeProperties[] = [
	{
		displayName: 'Workspace Name or ID',
		name: 'workspaceId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getWorkspaces',
		},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['listLabels', 'createLabel', 'updateLabel', 'deleteLabel'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Label Name or ID',
		name: 'labelId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getLabels',
			loadOptionsDependsOn: ['workspaceId'],
		},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['updateLabel', 'deleteLabel'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['createLabel', 'updateLabel'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				options: colorOptions,
				default: '',
				description: 'Label color',
			},
		],
	},
];

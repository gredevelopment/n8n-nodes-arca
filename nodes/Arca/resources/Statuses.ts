import { INodeProperties } from 'n8n-workflow';
import { colorOptions } from './colors';

export const statusesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['status'],
			},
		},
		options: [
			{
				name: 'Create Status',
				value: 'createStatus',
				action: 'Create a new status',
				description: 'Create a new status in a workspace',
			},
			{
				name: 'Delete Status',
				value: 'deleteStatus',
				action: 'Delete a status',
				description: 'Delete a status from a workspace',
			},
			{
				name: 'List Statuses',
				value: 'listStatuses',
				action: 'List statuses',
				description: 'List all statuses in a workspace',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				action: 'Update an existing status',
				description: 'Update an existing status in a workspace',
			},
		],
		default: 'listStatuses',
	},
];

export const statusesFields: INodeProperties[] = [
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
				resource: ['status'],
				operation: ['listStatuses', 'createStatus', 'updateStatus', 'deleteStatus'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Status Name or ID',
		name: 'statusId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
			loadOptionsDependsOn: ['workspaceId'],
		},
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['updateStatus', 'deleteStatus'],
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
				resource: ['status'],
				operation: ['createStatus', 'updateStatus'],
			},
		},
		description: 'Status label',
	},
	{
		displayName: 'Category',
		name: 'category',
		type: 'options',
		options: [
			{ name: 'Pending', value: 'pending' },
			{ name: 'In Progress', value: 'in_progress' },
			{ name: 'Completed', value: 'completed' },
			{ name: 'Cancelled', value: 'cancelled' },
		],
		default: 'pending',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['createStatus', 'updateStatus'],
			},
		},
		description: 'Status category. Must be one of pending, in_progress, completed, or cancelled.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['createStatus', 'updateStatus'],
			},
		},
		options: [
			{
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Status icon slug',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				options: colorOptions,
				default: '',
				description: 'Status color',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: undefined,
				description: 'Status position for ordering',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['deleteStatus'],
			},
		},
		options: [
			{
				displayName: 'Reassign To Status Name or ID',
				name: 'reassignTo',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getStatuses',
					loadOptionsDependsOn: ['workspaceId'],
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
		],
	},
];

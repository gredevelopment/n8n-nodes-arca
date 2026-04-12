import { INodeProperties } from 'n8n-workflow';

export const statusesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create Status',
				value: 'createStatus',
				action: 'Create a new workspace status',
				description: 'Create a new workspace status',
			},
			{
				name: 'Delete Status',
				value: 'deleteStatus',
				action: 'Delete a status',
				description: 'Delete a status',
			},
			{
				name: 'List Statuses',
				value: 'listStatuses',
				action: 'Return all statuses in a workspace',
				description: 'Return all statuses in a workspace',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				action: 'Update an existing status',
				description: 'Update an existing status',
			},
		],
		default: 'listStatuses',
	},
];

export const statusesFields: INodeProperties[] = [
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
				resource: ['status'],
				operation: ['listStatuses', 'createStatus'],
			},
		},
		description: 'Workspace ID for status actions',
	},
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['updateStatus', 'deleteStatus'],
			},
		},
		description: 'The ID of the status to modify or delete',
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
			{ name: 'Active', value: 'active' },
			{ name: 'Cancelled', value: 'cancelled' },
			{ name: 'Completed', value: 'completed' },
			{ name: 'Done', value: 'done' },
			{ name: 'Pending', value: 'pending' },
		],
		default: 'pending',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['createStatus', 'updateStatus'],
			},
		},
		description: 'Status category',
	},
	{
		displayName: 'Icon',
		name: 'icon',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['createStatus', 'updateStatus'],
			},
		},
		description: 'Optional status icon slug',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['createStatus', 'updateStatus'],
			},
		},
		description: 'Optional status color',
	},
	{
		displayName: 'Position',
		name: 'position',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['updateStatus'],
			},
		},
		description: 'Status position for ordering',
	},
	{
		displayName: 'Reassign To Status ID',
		name: 'reassignTo',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['deleteStatus'],
			},
		},
		description: 'Status ID to reassign tasks to before deletion',
	},
];

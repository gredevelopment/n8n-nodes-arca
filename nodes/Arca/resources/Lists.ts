import { INodeProperties } from 'n8n-workflow';

export const listsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['list'],
			},
		},
		options: [
			{
				name: 'Create List',
				value: 'createList',
				action: 'Create a new list inside a folder',
				description: 'Create a new list inside a folder',
			},
			{
				name: 'Delete List',
				value: 'deleteList',
				action: 'Delete a list and its tasks',
				description: 'Delete a list and its tasks',
			},
			{
				name: 'List Lists',
				value: 'listLists',
				action: 'Return all lists in a workspace',
				description: 'Return all lists in a workspace',
			},
			{
				name: 'Update List',
				value: 'updateList',
				action: 'Update an existing list',
				description: 'Update an existing list',
			},
		],
		default: 'listLists',
	},
];

export const listsFields: INodeProperties[] = [
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
				resource: ['list'],
				operation: ['listLists', 'createList'],
			},
		},
		description: 'Workspace ID for list actions',
	},
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['createList', 'updateList'],
			},
		},
		description: 'Folder ID the list belongs to',
	},
	{
		displayName: 'List ID',
		name: 'listIdToModify',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['updateList', 'deleteList'],
			},
		},
		description: 'The ID of the list to modify or delete',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['createList', 'updateList'],
			},
		},
		description: 'List name',
	},
	{
		displayName: 'Icon',
		name: 'icon',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['createList', 'updateList'],
			},
		},
		description: 'Optional icon slug for the list',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '',
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['createList', 'updateList'],
			},
		},
		description: 'Optional list color',
	},
];

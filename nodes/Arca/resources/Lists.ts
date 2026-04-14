import { INodeProperties } from 'n8n-workflow';
import { colorOptions } from './colors';

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
				action: 'Create a new list',
				description: 'Create a new list inside a folder',
			},
			{
				name: 'Delete List',
				value: 'deleteList',
				action: 'Delete a list',
				description: 'Delete a list and its tasks',
			},
			{
				name: 'List Lists',
				value: 'listLists',
				action: 'List all lists in a workspace',
				description: 'List all lists in a workspace',
			},
			{
				name: 'Update List',
				value: 'updateList',
				action: 'Update an existing list',
				description: 'Update an existing list by ID',
			},
		],
		default: 'listLists',
	},
];

export const listsFields: INodeProperties[] = [
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
				resource: ['list'],
				operation: ['listLists', 'createList', 'updateList', 'deleteList'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'List Name or ID',
		name: 'listIdToModify',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getLists',
			loadOptionsDependsOn: ['workspaceId'],
		},
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['updateList', 'deleteList'],
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
		required: true,
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['createList'],
			},
		},
		description: 'List name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['createList'],
			},
		},
		options: [
			{
				displayName: 'Folder Name or ID',
				name: 'folderId',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getFolders',
					loadOptionsDependsOn: ['workspaceId'],
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Icon slug for the list',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				options: colorOptions,
				default: '',
				description: 'List color',
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
				resource: ['list'],
				operation: ['updateList'],
			},
		},
		options: [
			{
				displayName: 'Folder Name or ID',
				name: 'folderId',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getFolders',
					loadOptionsDependsOn: ['workspaceId'],
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Icon slug for the list',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				options: colorOptions,
				default: '',
				description: 'List color',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'List name',
			},
		],
	},
];

import { INodeProperties } from 'n8n-workflow';
import { colorOptions } from './colors';

export const foldersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['folder'],
			},
		},
		options: [
			{
				name: 'Create Folder',
				value: 'createFolder',
				action: 'Create a new folder',
				description: 'Create a new folder in a workspace',
			},
			{
				name: 'Delete Folder',
				value: 'deleteFolder',
				action: 'Delete a folder',
				description: 'Delete a folder and its contents',
			},
			{
				name: 'List Folders',
				value: 'listFolders',
				action: 'List folders',
				description: 'List all folders in a workspace',
			},
			{
				name: 'Update Folder',
				value: 'updateFolder',
				action: 'Update an existing folder',
				description: 'Update an existing folder by ID',
			},
		],
		default: 'listFolders',
	},
];

export const foldersFields: INodeProperties[] = [
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
				resource: ['folder'],
				operation: ['listFolders', 'createFolder', 'updateFolder', 'deleteFolder'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Folder Name or ID',
		name: 'folderIdToModify',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getFolders',
			loadOptionsDependsOn: ['workspaceId'],
		},
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['updateFolder', 'deleteFolder'],
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
				resource: ['folder'],
				operation: ['createFolder'],
			},
		},
		description: 'Folder name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['createFolder'],
			},
		},
		options: [
			{
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Folder icon slug',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				options: colorOptions,
				default: '',
				description: 'Folder color',
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
				resource: ['folder'],
				operation: ['updateFolder'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Folder name',
			},
			{
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Folder icon slug',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				options: colorOptions,
				default: '',
				description: 'Folder color',
			},
		],
	},
];

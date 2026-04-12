import { INodeProperties } from 'n8n-workflow';

export const foldersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create Folder',
				value: 'createFolder',
				action: 'Create a new folder in a workspace',
				description: 'Create a new folder in a workspace',
			},
			{
				name: 'Delete Folder',
				value: 'deleteFolder',
				action: 'Delete a folder and its contents',
				description: 'Delete a folder and its contents',
			},
			{
				name: 'List Folders',
				value: 'listFolders',
				action: 'Return all folders in a workspace',
				description: 'Return all folders in a workspace',
			},
			{
				name: 'Update Folder',
				value: 'updateFolder',
				action: 'Update an existing folder',
				description: 'Update an existing folder',
			},
		],
		default: 'listFolders',
	},
];

export const foldersFields: INodeProperties[] = [
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
				resource: ['folder'],
				operation: ['listFolders', 'createFolder'],
			},
		},
		description: 'The workspace ID for the folder action',
	},
	{
		displayName: 'Folder ID',
		name: 'folderIdToModify',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['updateFolder', 'deleteFolder'],
			},
		},
		description: 'The ID of the folder to update or delete',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['createFolder', 'updateFolder'],
			},
		},
		description: 'Folder name',
	},
	{
		displayName: 'Icon',
		name: 'icon',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['createFolder', 'updateFolder'],
			},
		},
		description: 'Optional folder icon slug',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['createFolder', 'updateFolder'],
			},
		},
		description: 'Optional folder color',
	},
];

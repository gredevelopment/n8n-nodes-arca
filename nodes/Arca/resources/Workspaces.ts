import { INodeProperties } from 'n8n-workflow';

export const workspacesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['workspace'],
			},
		},
		options: [
			{
				name: 'Get Workspace',
				value: 'getWorkspace',
				action: 'Get details of a workspace',
				description: 'Get details of a specific workspace',
			},
			{
				name: 'List Workspace Members',
				value: 'listWorkspaceMembers',
				action: 'List members of a workspace',
				description: 'List members of a workspace',
			},
			{
				name: 'List Workspaces',
				value: 'listWorkspaces',
				action: 'List workspaces',
				description: 'List workspaces the user has access to',
			},
		],
		default: 'listWorkspaces',
	},
];

export const workspacesFields: INodeProperties[] = [
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
				resource: ['workspace'],
				operation: ['getWorkspace', 'listWorkspaceMembers'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
];

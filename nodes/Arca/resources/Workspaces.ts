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
				resource: ['workspace'],
				operation: ['getWorkspace', 'listWorkspaceMembers'],
			},
		},
		description: 'The numeric workspace ID',
	},
];

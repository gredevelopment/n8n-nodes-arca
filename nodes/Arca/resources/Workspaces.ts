import { INodeProperties } from 'n8n-workflow';

export const workspacesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Get Workspace',
				value: 'getWorkspace',
				action: 'Return details for a specific workspace',
				description: 'Return details for a specific workspace',
			},
			{
				name: 'List Workspace Members',
				value: 'listWorkspaceMembers',
				action: 'Return all members of a workspace',
				description: 'Return all members of a workspace',
			},
			{
				name: 'List Workspaces',
				value: 'listWorkspaces',
				action: 'Return all workspaces for the api key owner',
				description: 'Return all workspaces for the API key owner',
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

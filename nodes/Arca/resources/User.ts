import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get Current User',
				value: 'getCurrentUser',
				action: 'Get the authenticated user profile',
				description: 'Get the authenticated user profile',
			},
		],
		default: 'getCurrentUser',
	},
];

export const userFields: INodeProperties[] = [];

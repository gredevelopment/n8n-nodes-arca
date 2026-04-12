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
				action: 'Return the authenticated user profile',
				description: 'Return the authenticated user profile',
			},
		],
		default: 'getCurrentUser',
	},
];

export const userFields: INodeProperties[] = [];

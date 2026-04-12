import { INodeProperties } from 'n8n-workflow';

export const commentsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['comment'],
			},
		},
		options: [
			{
				name: 'Create Comment',
				value: 'createComment',
				action: 'Create a new comment on a task',
				description: 'Create a new comment on a task',
			},
			{
				name: 'List Comments',
				value: 'listComments',
				action: 'Return all comments on a task',
				description: 'Return all comments on a task',
			},
		],
		default: 'listComments',
	},
];

export const commentsFields: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['listComments', 'createComment'],
			},
		},
		description: 'The task ID for comment actions',
	},
	{
		displayName: 'Comment Content',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['createComment'],
			},
		},
		description: 'Comment text as HTML',
	},
];

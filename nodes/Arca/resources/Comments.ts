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
				action: 'Create a new comment',
				description: 'Create a new comment on a task',
			},
			{
				name: 'List Comments',
				value: 'listComments',
				action: 'List comments',
				description: 'List all comments on a task',
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
		default: undefined,
		required: true,
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

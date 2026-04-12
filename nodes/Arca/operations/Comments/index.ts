import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';

const baseUrl = 'https://api.getarca.app/api/v1';

export async function listComments(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const taskId = this.getNodeParameter('taskId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/tasks/${taskId}/comments`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createComment(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const taskId = this.getNodeParameter('taskId', index) as number;
	const content = this.getNodeParameter('content', index) as string;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/tasks/${taskId}/comments`,
		json: true,
		body: {
			content,
		},
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

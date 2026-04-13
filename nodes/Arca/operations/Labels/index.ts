import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';
import { baseUrl } from '../../baseUrl';

export async function listLabels(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/labels`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createLabel(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		color?: string;
	};

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/labels`,
		json: true,
		body: {
			workspace_id: workspaceId,
			name,
		},
	};

	if (additionalFields.color) {
		options.body.color = additionalFields.color;
	}

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function updateLabel(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const labelId = this.getNodeParameter('labelId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		color?: string;
	};

	const body: { [key: string]: any } = {};

	if (name) {
		body.name = name;
	}
	if (additionalFields.color) {
		body.color = additionalFields.color;
	}

	const options: IHttpRequestOptions = {
		method: 'PATCH',
		url: `${baseUrl}/labels/${labelId}`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function deleteLabel(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const labelId = this.getNodeParameter('labelId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'DELETE',
		url: `${baseUrl}/labels/${labelId}`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response === '' || response === undefined ? { success: true } : response,
		pairedItem: { item: index },
	};
}

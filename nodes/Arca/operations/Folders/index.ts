import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';

const baseUrl = 'https://api.getarca.app/api/v1';

export async function listFolders(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/folders`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createFolder(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const icon = this.getNodeParameter('icon', index) as string;
	const color = this.getNodeParameter('color', index) as string;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/folders`,
		json: true,
		body: {
			workspace_id: workspaceId,
			name,
		},
	};

	if (icon) {
		options.body.icon = icon;
	}
	if (color) {
		options.body.color = color;
	}

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function updateFolder(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const folderId = this.getNodeParameter('folderIdToModify', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const icon = this.getNodeParameter('icon', index) as string;
	const color = this.getNodeParameter('color', index) as string;

	const body: { [key: string]: any } = {};

	if (name) {
		body.name = name;
	}
	if (icon) {
		body.icon = icon;
	}
	if (color) {
		body.color = color;
	}

	const options: IHttpRequestOptions = {
		method: 'PATCH',
		url: `${baseUrl}/folders/${folderId}`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function deleteFolder(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const folderId = this.getNodeParameter('folderIdToModify', index) as number;

	const options: IHttpRequestOptions = {
		method: 'DELETE',
		url: `${baseUrl}/folders/${folderId}`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response === '' || response === undefined ? { success: true } : response,
		pairedItem: { item: index },
	};
}

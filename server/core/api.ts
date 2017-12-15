import { Response } from 'express';

export const handleError = (response: Response, message: any) => {
	return response.json({
		error: {
			message: message,
			code: 500
		}
	});
};

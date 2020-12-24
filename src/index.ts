import { ServerResponse } from 'http';
import { serialize } from 'cookie';


export interface CookieOptions {
	maxAge?: number;
	signed?: boolean;
	expires?: Date;
	httpOnly?: boolean;
	path?: string;
	domain?: string;
	secure?: boolean;
	encode?: (val: string) => string;
	sameSite?: boolean | 'lax' | 'strict' | 'none';
}

export default function cookie(res: ServerResponse, name: string, value: string, options?: CookieOptions) {
	const opts = {
		...options
	};

	const val = typeof value === 'object'
		? `j:${JSON.stringify(value)}`
		: String(value);

	if ('maxAge' in opts) {
		opts.expires = new Date(Date.now() + opts.maxAge!);
		opts.maxAge! /= 1000;
	}

	if (opts.path == null) {
		opts.path = '/';
	}

	res.setHeader('Set-Cookie', serialize(name, String(val), opts));
}

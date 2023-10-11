import type { Reference } from "isolated-vm";
import env from "../../env.js";
import type { ExecContext } from "./add-exec-options.js";
import { handleIsolateError } from "./handle-isolate-error.js";

const scriptTimeoutMs = Number(env['EXTENSIONS_SECURE_TIMEOUT']);

export async function resumeIsolate(context: ExecContext, reference: Reference, args: any[]) {
	try {
		return await reference.apply(null, args, {
			timeout: scriptTimeoutMs,
			arguments: {
				copy: true,
			},
			result: {
				copy: true,
				promise: true
			}
		})
	} catch (error: any) {
		handleIsolateError(context, error);
		return error
	}
}
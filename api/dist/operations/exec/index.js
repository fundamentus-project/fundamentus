import { defineOperationApi, toArray } from '@directus/utils';
import { isBuiltin } from 'node:module';
import { NodeVM, VMScript } from 'vm2';
export default defineOperationApi({
    id: 'exec',
    handler: async ({ code }, { data, env }) => {
        const allowedModules = env['FLOWS_EXEC_ALLOWED_MODULES'] ? toArray(env['FLOWS_EXEC_ALLOWED_MODULES']) : [];
        const allowedModulesBuiltIn = [];
        const allowedModulesExternal = [];
        const allowedEnv = data['$env'] ?? {};
        const opts = {
            eval: false,
            wasm: false,
            env: allowedEnv,
        };
        for (const module of allowedModules) {
            if (isBuiltin(module)) {
                allowedModulesBuiltIn.push(module);
            }
            else {
                allowedModulesExternal.push(module);
            }
        }
        if (allowedModules.length > 0) {
            opts.require = {
                builtin: allowedModulesBuiltIn,
                external: {
                    modules: allowedModulesExternal,
                    transitive: false,
                },
            };
        }
        const vm = new NodeVM(opts);
        const script = new VMScript(code).compile();
        const fn = await vm.run(script);
        return await fn(data);
    },
});
